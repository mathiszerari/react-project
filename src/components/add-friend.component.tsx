import { useUserStore } from "../stores/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendFriendRequest } from "../services/friend-request.service";
import ShareButton from "./send-invite-link.component";
import { useState } from "react";

type FormInputs = {
  content: string;
}

export default function AddFriend() {
  const user = useUserStore();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: ""
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    try {
      await sendFriendRequest(input.content);
      reset();
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  }

  const sendFriendRequest = async (receiverId: string) => {
    try {
      const randomuuid = crypto.randomUUID(); 
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/social/friend-request/${randomuuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ receiverId: receiverId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  }

  return (
    <div>
      <span className="mx-16 my-6 text-2xl font-bold">Add a friend</span>
      
      <div>
        <span>Your ID: </span>
        <span> {user.id} </span>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(user.id)}>
          copy id
        </button>
      </div>

      <ShareButton />

      <div>
        <span>Enter a friend ID:</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text"
                 placeholder="Enter a friend ID" {...register('content', { required: true })} />
          <button type="submit">Send friend request</button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}