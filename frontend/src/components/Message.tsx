import { css, StyleSheet } from "aphrodite";
import { DateTime } from "luxon";

import { Message } from "../utils/api/types/responses";

type Props = Message;

export default function MessageComponent({ content, sentAt }: Props) {
  return (
    <div className={css(styles.container)}>
      <p className={css(styles.timestamp)}>
        {DateTime.fromISO(sentAt).toLocaleString(DateTime.DATETIME_FULL)}
      </p>
      <p className={css(styles.text)}>{content}</p>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "15px 20px",
    boxSizing: "border-box",
  },
  timestamp: {
    color: "var(--almost-white)",
    fontSize: "14px",
    paddingBottom: "10px",
  },
  text: {
    color: "var(--white)",
    width: "100%",
    wordBreak: "break-all",
  },
});
