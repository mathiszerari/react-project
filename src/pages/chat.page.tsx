import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { useMessageStore } from "../stores/message.store";
import Message from "../types/message";
import {
  sendMessage,
  fetchMessages,
  eventFetchMessages,
} from "../services/message.service";
import MessagesLoader from "../components/loaders/messages.loader";
import Button from "../components/buttons/button";
import MessageCard from "../components/cards/message.card";
import { useFriendStore } from "../stores/friend.store";
import { Friend } from "../types/friend";

const MAX_MESSAGE_LENGTH = 255;

export default function ChatPage() {
  type FormInputs = {
    content: string;
  };

  const navigate = useNavigate();

  const { receiverId } = useParams();

  const { messages, setMessages, addMessage, updateLastMessage } =
    useMessageStore();

  const { getFriendById } = useFriendStore();

  const [currentFriend, setCurrentFriend] = useState<Friend | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    if (!receiverId) return;
    const message: Message = {
      id: "",
      content: input.content,
      receiverId: receiverId,
      emitterId: "",
      sendAt: new Date().toISOString(),
    };
    addMessage(message);

    try {
      await sendMessage(message);
    } catch (error) {
      navigate("/");
    }

    const messages = await fetchMessages(receiverId);
    setMessages(messages);
    reset();
  };

  useEffect(() => {
    if (!receiverId) return;

    setCurrentFriend(getFriendById(receiverId));

    const loadMessages = async (): Promise<void> => {
      try {
        const messages = await fetchMessages(receiverId);
        setMessages(messages);
      } catch (error) {
        navigate("/chats");
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

  const messagesBox = useRef<HTMLDivElement>(null);
  function scrollToBottom() {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [charactersLeft, setCharactersLeft] = useState(MAX_MESSAGE_LENGTH);

  return (
    <MessagesLoader receiverId={receiverId}>
      <div
        ref={messagesBox}
        className="chat-wrapper max-w-[1440px] w-full m-auto flex flex-col justify-between mb-8 px-3 py-3 gap-4 max-h-screen overflow-y-auto"
      >
        {currentFriend && (
          <h1 className="text-2xl">{currentFriend.username} Chat</h1>
        )}
        <div className="flex flex-col-reverse gap-4 px-4 overflow-y-scroll w-full">
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              isSender={message.receiverId === receiverId}
            />
          ))}
        </div>

        <form
          className="flex flex-col sticky bottom-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row md:gap-8 gap-2">
            <label className="input-group grow">
              <input
                onInput={(e) =>
                  setCharactersLeft(
                    MAX_MESSAGE_LENGTH - e.currentTarget.value.length
                  )
                }
                type="text"
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Tapez votre message ici"
                {...register("content", { required: true })}
              />
            </label>
            <Button variant="primary" type="submit" label="Envoyer" />
          </div>
        </form>
        {charactersLeft !== MAX_MESSAGE_LENGTH && (
          <p className="text-sm text-slate-400">
            {charactersLeft} characters left
          </p>
        )}
      </div>
    </MessagesLoader>
  );
}
