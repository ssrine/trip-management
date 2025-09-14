import { useState, useEffect } from "react";

export const useMessages = () => {
  const [messages, setMessages] = useState({ error: "", success: "" });

  useEffect(() => {
    if (messages.error || messages.success) {
      const timer = setTimeout(() => {
        setMessages({ error: "", success: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return { messages, setMessages };
};