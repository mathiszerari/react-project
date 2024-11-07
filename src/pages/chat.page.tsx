import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

import Message from "../types/message";
import { dateFormater } from "../utils/dateFormater";

import { useMessageStore } from "../stores/message.store";
import { useUserStore } from "../stores/user.store";

import { MessageService } from "../services/message.service";
import { MessageAdapter } from "../adapters/message.adapter";
import { BadRequestError } from "../errors/bad-request.error";
import Notifications from "../components/notifications/notifications.component";
import { useNotificationStore } from "../stores/notification.store";
import { EventName } from "../services/notification.service";

export default function ChatPage() {

  type FormInputs = {
    content: string;
  }

  const initialMessages = useLoaderData() as Message[];

  const navigate = useNavigate();

  const { receiverId } = useParams();

  const { messages, setMessages, addMessage, updateErrorLastMessage } = useMessageStore();
  const { id } = useUserStore();


  const { service } = useNotificationStore();


  // const messageService : MessageAdapter = new FalseMessageService(notificationService);
  const messageService: MessageAdapter = new MessageService();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      content: ""
    }
  })

  const sendMessage = async (message: Message) => {
    try {
      await messageService.sendMessage(message);
    } catch (error) {
      if (error instanceof BadRequestError) {
        navigate('/');
      }
      else {
        updateErrorLastMessage(true);
      }
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    const messageId = crypto.randomUUID()
    if (!receiverId) return;
    const message: Message = {
      id: messageId,
      content: input.content,
      receiverId: receiverId,
      emitterId: id,
      sendAt: (new Date()).toISOString()
    };
    addMessage(message);
    await sendMessage(message);
    reset();
  }

  const retryMessage = async (message: Message) => {
    updateErrorLastMessage(false);
    await sendMessage(message);
  }

  useEffect(() => {
    setMessages(initialMessages);

    const handleNewMessage = (message: Message) => {
      addMessage(message);
    };

    const eventSource = service.eventListener(handleNewMessage, EventName.MESSAGE_RECEIVED);

    return () => {
      eventSource.close();
    };
  }, [receiverId]);

  return (
    <div>
      <div>
        {messages.map((message, index) => {
          const splitMessage = message.content.split(" ");

          const htmlMessage = splitMessage.map((word, i) => {
            if (word.startsWith("http://") || word.startsWith("https://")) {
              return (
                <a key={i} href={word} target="_blank">
                  {word}
                </a>
              );
            }
            else {
              return <span key={i}>{word} </span>;
            }
          });

          return message.error ? (
            <div key={index} style={{ color: "green" }}>
              {htmlMessage} : {dateFormater(message.sendAt)}
              <button onClick={() => retryMessage(message)}>Retry</button>
            </div>
          ) : message.receiverId === receiverId ? (
            <div key={index} style={{ color: "blue" }}>
              {htmlMessage} : {dateFormater(message.sendAt)}
            </div>
          ) : (
            <div key={index} style={{ color: "red" }}>
              {htmlMessage} : {dateFormater(message.sendAt)}
            </div>
          );
        })}
      </div>


      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" maxLength={255}
               placeholder="Tapez votre message ici" {...register('content', { required: true })} />
        <input type="submit"/>
      </form>

      <Notifications/>

    </div>
  );
}