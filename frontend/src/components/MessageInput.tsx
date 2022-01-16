import { useState, useContext, FormEvent } from "react";
import { css, StyleSheet } from "aphrodite";

import Button from "./Button";
import { isValidString } from "../utils/strings";
import MessagesContext from "../context/MessagesContext";

export default function MessageInput() {
  const [value, setValue] = useState("");

  const { fetchAllMessages, sendMessage } = useContext(MessagesContext);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidString(value)) {
      await sendMessage({
        content: value,
        sentAt: new Date().toISOString(),
      });

      setValue("");
    }
  };

  return (
    <form className={css(styles.container)} noValidate onSubmit={submit}>
      <Button
        text="Fetch"
        borderRadius="5px 0 0 5px"
        onClick={fetchAllMessages}
      />
      <input
        className={css(styles.input)}
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus
        maxLength={512}
      />
      <Button type="submit" text="Send" borderRadius="0 5px 5px 0" />
    </form>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "60px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  input: {
    width: "35%",
    height: "40px",
    boxSizing: "border-box",
    padding: "0 10px",
    backgroundColor: "var(--gray)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--dark-gray)",
    outline: 0,
    transition: "all 0.05s linear",
    color: "var(--white)",
    fontSize: "15px",
    ":hover": {
      borderColor: "var(--darker)",
    },
    ":focus": {
      borderColor: "var(--green)",
    },
  },
  button: {},
});
