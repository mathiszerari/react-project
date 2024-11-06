import {useNavigate, useParams} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

import { useMessageStore } from "../stores/message.store";
import Message from "../types/message";
import { sendMessage, fetchMessages, eventFetchMessages } from "../services/message.service";
import MessagesLoader from "../components/loaders/messages.loader";
import { MessageDTO } from "../dtos/message.dto";

export default function ChatPage() {

  type FormInputs = {
    content: string;
  }

  const navigate = useNavigate();

  const { receiverId } = useParams();

  const { messages, setMessages, addMessage } = useMessageStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      content: ""
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    if (!receiverId) return;
    const message: MessageDTO = { id: crypto.randomUUID(), content: input.content, receiverId: receiverId };
    addMessage(message);
    await sendMessage(message);
    reset();
  }

  useEffect(() => {
    if (!receiverId) return;
    const loadMessages = async (): Promise<void> => {
      try {
        const messages = await fetchMessages(receiverId);
        setMessages(messages);
      } catch (error) {
        navigate('/chats');
      }
    };
    loadMessages();

    const handleNewMessage = (message: Message) => {
      addMessage(message);
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
          {messages.map((message, index) => (
            <div key={index}>{message.content}</div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" maxLength={255}
                 placeholder="Tapez votre message ici" {...register('content', { required: true })} />
          <input type="submit"/>
        </form>

      </div>
    </MessagesLoader>
  );
}