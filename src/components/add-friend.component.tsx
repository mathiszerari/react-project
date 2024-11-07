import { useEffect } from "react";
import { useUserStore } from "../stores/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendFriendRequest } from "../services/friend-request.service";

type FormInputs = {
  content: string;
}

export default function AddFriend() {

  const user = useUserStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      content: ""
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    await sendFriendRequest(input.content);
    reset();
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

      <div>
        <span>Enter a friend ID:</span>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text"
                 placeholder="Enter a friend ID" {...register('content', { required: true })} />
          <button type="submit">Send friend request</button>
        </form>
      </div>

    </div>
  );
}