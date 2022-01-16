export interface Message {
  messageId: string;
  content: string;
  sentAt: string;
}
export type SentMessage = Pick<Message, "content">;
export interface MessagesResponse {
  messages: Message[];
}
export type SendMessageResponse = Omit<Message, "sending" | "error">;
