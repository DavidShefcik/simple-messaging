import { createRef, useContext, useEffect } from "react";
import { css, StyleSheet } from "aphrodite";

import Message from "./Message";
import MessagesContext from "../context/MessagesContext";

export default function MessageList() {
  const messageContainer = createRef<HTMLDivElement>();
  const { fetchAllMessages, messages, loading, error } =
    useContext(MessagesContext);

  useEffect(() => {
    fetchAllMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages, messageContainer]);

  let content = null;
  if (loading) {
    content = <p className={css(styles.text)}>Loading...</p>;
  } else if (error) {
    content = (
      <p className={css(styles.text)}>Something happened! Please try again.</p>
    );
  } else if (messages.length === 0) {
    content = (
      <p className={css(styles.text)}>No messages yet. Try sending one!</p>
    );
  } else {
    content = (
      <>
        {messages.map((message) => (
          <Message key={message.messageId} {...message} />
        ))}
      </>
    );
  }

  return (
    <div
      ref={messageContainer}
      className={css([
        styles.container,
        (loading || error || messages.length === 0) && styles.centered,
      ])}
    >
      {content}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    overflowX: "hidden",
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "var(--white)",
    fontSize: "18px",
  },
});
