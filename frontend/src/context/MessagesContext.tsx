import { createContext } from "react";

import { Message } from "../utils/api/types/responses";

export interface IMessageContext {
  messages: Message[];
  sendMessage(message: Omit<Message, "messageId">): void;
  fetchAllMessages(): Promise<void>;
  error: boolean;
  loading: boolean;
}

export default createContext<IMessageContext>({
  messages: [],
  sendMessage: () => {},
  fetchAllMessages: async () => {},
  error: false,
  loading: true,
});
