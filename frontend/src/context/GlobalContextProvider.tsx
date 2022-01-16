import { ReactChild, useState } from "react";

import MessagesContext from "./MessagesContext";
import { api } from "../utils/api/axios";
import {
  Message,
  SendMessageResponse,
  MessagesResponse,
} from "../utils/api/types/responses";

interface Props {
  children: ReactChild;
}

export default function GlobalContextProvider({ children }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sendMessage = async (message: Message) => {
    try {
      const { data } = await api.post<SendMessageResponse>("/messages/send", {
        message,
      });

      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);

      setError(true);
    }
  };

  const fetchAllMessages = async () => {
    setLoading(true);

    try {
      const { data } = await api.get<MessagesResponse>("/messages");

      setMessages(data.messages);
    } catch (error) {
      console.log(error);

      setError(true);
    }

    setLoading(false);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        sendMessage,
        fetchAllMessages,
        error,
        loading,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
