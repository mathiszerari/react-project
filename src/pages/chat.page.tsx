import {useNavigate, useParams} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useMessageStore } from "../stores/message.store";
import Message from "../types/message";
import { sendMessage, fetchMessages, eventFetchMessages } from "../services/message.service";
import MessagesLoader from "../components/loaders/messages.loader";

export default function ChatPage() {

  type FormInputs = {
    message: string;
  }

  const navigate = useNavigate();

  const { receiverId } = useParams();

  const { messages, addMessage } = useMessageStore();

  const [loadedMessages, setLoadedMessages] = useState<Message[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!receiverId) return;
    addMessage(data.message);
    await sendMessage(receiverId, data.message);
    reset();
  }

  useEffect(() => {
    if (!receiverId) return;
    const loadMessages = async (): Promise<void> => {
      try {
        const messages = await fetchMessages(receiverId);
        setLoadedMessages(messages);
      } catch (error) {
        navigate('/chats');
      }
    };
    loadMessages();

    const handleNewMessage = (data: Message) => {
      console.log("Nouveau message reçu :", data);
      setLoadedMessages((prevMessages) => [...prevMessages, data]);
    };

    const eventSource = eventFetchMessages(handleNewMessage);

    return () => {
      eventSource.close();
    };
  }, [receiverId]);

  return (
    <MessagesLoader receiverId={receiverId}>

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
    </MessagesLoader>
  );
}