import {useNavigate, useParams} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

import { useMessageStore } from "../stores/message.store";
import Message from "../types/message";
import { FalseMessageService, MessageService } from "../services/message.service";
import MessagesLoader from "../components/loaders/messages.loader";
import { dateFormater } from "../utils/dateFormater";
import { MessageAdapter } from "../adapters/message.adapter";

const messageService : MessageAdapter = new FalseMessageService();

export default function ChatPage() {

  type FormInputs = {
    content: string;
  }

  const navigate = useNavigate();

  const { receiverId } = useParams();

  const { messages, setMessages, addMessage, updateLastMessage } = useMessageStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      content: ""
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    if (!receiverId) return;
    const message: Message = {id: "", content: input.content, receiverId: receiverId, emitterId: "", sendAt: (new Date()).toISOString()};
    addMessage(message);

    try {
      await messageService.sendMessage(message);
    }
    catch (error) {
      navigate('/');
    }

    const messages = await messageService.fetchMessages(receiverId);
    setMessages(messages);
    reset();
  }

  useEffect(() => {
    if (!receiverId) return;
    const loadMessages = async (): Promise<void> => {
      try {
        const messages = await messageService.fetchMessages(receiverId);
        setMessages(messages);
      } catch (error) {
        navigate('/chats');
      }
    };
    loadMessages();

    const handleNewMessage = (message: Message) => {
      addMessage(message);
    };

    const eventSource = messageService.eventFetchMessages(handleNewMessage);

    return () => {
      eventSource.close();
    };
  }, [receiverId]);

  return (
    <MessagesLoader receiverId={receiverId}>

      <div>
        <div>
          {messages.map((message, index) => (
            message.receiverId === receiverId ? (
              <div key={index} style={{ color: "blue" }}>
                {`${message.content} : ${dateFormater(message.sendAt)}`}
              </div>
            ) : (
              <div key={index} style={{ color: "red" }}>
                {`${message.content} : ${dateFormater(message.sendAt)}`}
              </div>
            )
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