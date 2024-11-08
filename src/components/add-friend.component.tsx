import { useUserStore } from "../stores/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendFriendRequest } from "../services/friend-request.service";
import ShareButton from "./send-invite-link.component";
import { useState } from "react";
import Button from "./buttons/button";

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
      <div>
        <div className='adress-book-rim'>
          <div className='adress-book'>
            <h2 className='smiley'>&#9786;&#9787;</h2>
            <h1>Adress Book</h1>

            <div className='friend-code'>
              <p className='info-message'>This console's Wii number</p>
              <div className='flex items-center'>
                <p className=''>{user.id}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                className="relative right-2 z-10"
                variant="primary"
                label="Copy"
                onClick={() => navigator.clipboard.writeText(user.id)}
              />
              <ShareButton />
            </div>
          </div>
        </div>

        <div className='add-friend-form'>
          <div className='add-friend-form-header'>
            <p>Wii Number</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text"
              placeholder="Enter a Wii Number" {...register('content', { required: true })} />
            <Button
              className="relative right-2 z-10 mb-2"
              variant="primary"
              label="send"
              type="submit"
            />
          </form>
           
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>

    </div>
  );
}