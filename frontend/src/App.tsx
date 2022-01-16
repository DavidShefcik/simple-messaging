import { css, StyleSheet } from "aphrodite";

import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";

import "./assets/globals.css";

export default function App() {
  return (
    <div className={css(styles.container)}>
      <MessageList />
      <MessageInput />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
  },
});
