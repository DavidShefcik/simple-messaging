import { CreateTableInput } from "@aws-sdk/client-dynamodb";

export const tables: CreateTableInput[] = [
  // =========================
  // Messages
  // =========================
  {
    TableName: "messages",
    BillingMode: "PROVISIONED",
    ProvisionedThroughput: {
      /**
       * In a production application these would have a value that would
       * have been calculated out. However, for development, 1 RCU and WCU
       * is fine
       */
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    AttributeDefinitions: [
      {
        AttributeName: "userId",
        AttributeType: "S",
      },
      {
        AttributeName: "messageId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "userId",
        KeyType: "HASH",
      },
      {
        AttributeName: "messageId",
        KeyType: "RANGE",
      },
    ],
  },
];
