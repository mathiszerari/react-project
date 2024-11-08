import Message from "../../types/message";
import { dateFormater } from "../../utils/dateFormater";

interface MessageCardProps {
  message: Message;
  isSender?: boolean;
}

export default function MessageCard({
  message,
  isSender = true,
}: MessageCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 items-start space-y-1  md:max-w-[50%] max-w-[100%] break-words ${
        isSender ? "self-end" : "self-start"
      }`}
    >
      <div
        className={`${
          isSender ? "bg-cyan-200" : "bg-white"
        } p-3 rounded-lg w-full ring-1 outline outline-slate-300 shadow-[inset_0px_-4px_16px_rgba(0,0,0,0.2)]`}
      >
        <p>{message.content}</p>
      </div>
      <p
        className={`text-sm text-slate-400 ${
          isSender ? "self-end" : "self-start"
        }`}
      >
        {dateFormater(message.sendAt)}
      </p>
    </div>
  );
}
