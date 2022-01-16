import express from "express";
import { config } from "dotenv";
import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import cors from "cors";
import bodyParser from "body-parser";

import { tables } from "./constants/tables";

config();

const IS_PROD = process.env.NODE_ENV === "production";

const app = express();

const db = new DynamoDBClient({
  region: process.env.AWS_REGION,
  ...(!IS_PROD && {
    endpoint: process.env.DYNAMO_DB_URL,
  }),
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.get("/", (req, res) => {
  return res.status(200).send({
    content: "ok",
  });
});

app.get("/messages", async (req, res) => {
  const result: Message[] = [];

  try {
    const scanItemsCommand = new ScanCommand({
      TableName: "messages",
    });
    const results = await db.send(scanItemsCommand);

    let messages: Message[] = [];

    if (results.Items) {
      messages = results.Items.map((item) => ({
        userId: item.userId["S"]!,
        messageId: item.messageId["S"]!,
        sentAt: item.sentAt["S"]!,
        content: item.content["S"]!,
      }));
    }

    return res.status(200).send({
      messages,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send("internal_server_error");
  }
});

app.post("/messages/send", async (req, res) => {
  const { message } = req.body;

  if (
    message &&
    message.content &&
    message.content.length > 0 &&
    message.content.length <= 512
  ) {
    const messageId = new Date().getTime().toString();

    const data: Message = {
      messageId,
      userId: "1",
      content: message.content,
      sentAt: new Date().toISOString(),
    };

    const putItemCommand = new PutItemCommand({
      TableName: "messages",
      Item: {
        /**
         * Having the same user ID for every message
         * will cause a hot partition, however, it's fine
         * for now until there is an actual user system
         * in place (setting username)
         */
        userId: {
          S: "1",
        },
        messageId: {
          S: messageId,
        },
        content: {
          S: message.content,
        },
        sentAt: {
          S: new Date().toISOString(),
        },
      },
    });

    try {
      await db.send(putItemCommand);
    } catch (error) {
      console.log(error);

      return res.status(500).send("internal_server_error");
    }

    return res.status(201).send(data);
  } else {
    return res.status(400).send({
      error: "invalid_content",
    });
  }
});

function start() {
  // Generate tables
  const generateTables = new Promise<void>(async (resolve, reject) => {
    console.log("Creating DynamoDB tables...");
    for (const table of tables) {
      const command = new CreateTableCommand(table);

      try {
        await db.send(command);

        console.log("Created table", table.TableName);
      } catch (error) {
        const errorAsError = error as Error;

        if (errorAsError.name === "ResourceInUseException") {
          console.log(`Table ${table.TableName} already exists. Skipping...`);
        } else {
          reject(error);
        }
      }
    }

    resolve();
  });

  // Start the server after the tables are created
  generateTables
    .then(() => {
      // Start server
      app.listen(process.env.PORT, () => {
        console.log("Server started on port", process.env.PORT);
      });
    })
    .catch((error) => {
      console.log("Failed to generate tables", error);

      process.exit(1);
    });
}

// Start the application
start();
