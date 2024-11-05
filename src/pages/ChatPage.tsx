import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMessageStore } from "../stores/messageStore";
import Message from "../types/message";
import { useEffect, useState } from "react";

export default function ChatPage() {

  type FormInputs = {
    message: string;
  }

  const { receiverId } = useParams();
  const { messages, addMessage } = useMessageStore();

  const [loadedMessages, setLoadedMessages] = useState<Message[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    addMessage(data.message);
    await sendMessage(data.message);
    reset();
  }

  const sendMessage = async (content: string): Promise<void> => {
    const messageId = crypto.randomUUID();
    await fetch(`${process.env.REACT_APP_API_BASE_URL}chat/${messageId}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        receiverId,
        content,
      }),
    })
  }

  const loadMessages = async(): Promise<void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}messages/${receiverId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data = await response.json();
    setLoadedMessages(data);
  }

  useEffect(() => {
    loadMessages();
  }, [receiverId]);

  return (
    <div>
      <h1>Chat Page: {receiverId}</h1>

      <div>
        {loadedMessages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>

      <p>--------------------------</p>

      <div>{messages.map((message, index) =>
        <div key={index}>{message}</div>
      )}</div>


      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" maxLength={255}
               placeholder="Tapez votre message ici" {...register('message', { required: true })} />
        <input type="submit"/>
      </form>

    </div>

  );
}