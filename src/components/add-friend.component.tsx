import { useEffect } from "react";
import { useUserStore } from "../stores/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendFriendRequest } from "../services/friend-request.service";

type FormInputs = {
  content: string;
}

export default function AddFriend() {

  const idTemp = "7f1c5ce0-a094-4ae3-b03a-669db1770eed"

  const { username, userId, clearUser, updateUser } = useUserStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      content: ""
    }
  })
  
  useEffect(() => {
    console.log(username)
    console.log(userId)
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (input) => {
    console.log("me", idTemp);
    console.log("to", input.content);
    
    await sendFriendRequest(input.content);
    
    reset();
  }

  return (
    <div>
      <span className="mx-16 my-6 text-2xl font-bold">Add a friend</span>
      
      <div>
        <span>Your ID: </span>
        <span> {idTemp} </span>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(idTemp)}>
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