import { FriendRequest } from "../types/friend-request";
import { dateFormater } from "../utils/dateFormater";

export default function FriendRequestCard(request: FriendRequest) {
  return (
    <div key={request.id} className="m-4 flex justify-center w-3/4 items-center mx-auto ">
      <div className="flex border justify-between w-full p-2 rounded-full">

        <div className="flex flex-col">
          <span> send by : {request.senderId}</span>
          <span>{dateFormater(request.requestedAt)}</span>
        </div>

        <button className="justify-end border px-6 rounded-full mx-24 bg-green-100">Accept</button>

      </div>
    </div>
  );
}