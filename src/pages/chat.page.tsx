import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

import { useMessageStore } from "../stores/message.store";
import Message from "../types/message";
import { FalseMessageService, MessageService } from "../services/message.service";
import { dateFormater } from "../utils/dateFormater";
import { MessageAdapter } from "../adapters/message.adapter";
import { BadRequestError } from "../errors/bad-request.error";
import { useUserStore } from "../stores/user.store";

// const messageService : MessageAdapter = new FalseMessageService();
const messageService: MessageAdapter = new MessageService();

export default function ChatPage() {

  type FormInputs = {
    content: string;
  }

  const initialMessages = useLoaderData() as Message[];

  const navigate = useNavigate();

  const { receiverId } = useParams();

  const { messages, setMessages, addMessage, setErrorLastMessage } = useMessageStore();
  const { id } = useUserStore();

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
        setErrorLastMessage();
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
    console.log(message);
  }

  useEffect(() => {
    setMessages(initialMessages);

    const handleNewMessage = (message: Message) => {
      addMessage(message);
    };

    const eventSource = messageService.eventFetchMessages(handleNewMessage);

    return () => {
      eventSource.close();
    };
  }, [receiverId]);

  return (
      <div>
        <div>
          {messages.map((message, index) => (
            message.error ? (
                <div key={index} style={{ color: "green" }}>
                  {`${message.content} : ${dateFormater(message.sendAt)}`}
                  <button onClick={() => retryMessage(message)}>Retry</button>
                </div>
              ) :
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
  );
}