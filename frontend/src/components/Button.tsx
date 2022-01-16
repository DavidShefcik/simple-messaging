import { css, StyleSheet } from "aphrodite";

interface Props {
  text: string;
  onClick?(): void;
  width?: string;
  type?: "submit" | "button" | "reset";
  borderRadius?: string;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  width = "100px",
  type = "button",
  borderRadius = "",
  disabled,
}: Props) {
  return (
    <button
      style={{ width, borderRadius }}
      className={css(styles.button)}
      type={type}
      disabled={disabled}
      title={text}
      onClick={() => onClick && onClick()}
    >
      {text}
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    cursor: "pointer",
    height: "40px",
    boxSizing: "border-box",
    color: "var(--gray)",
    backgroundColor: "var(--green)",
    border: "1px solid var(--green)",
    transition: "all 0.05s linear",
    ":hover": {
      backgroundColor: "var(--dark-green)",
      border: "1px solid var(--dark-green)",
    },
  },
});
