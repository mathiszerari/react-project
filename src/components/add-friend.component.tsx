import { useUserStore } from "../stores/user.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendFriendRequest } from "../services/friend-request.service";
import ShareButton from "./send-invite-link.component";

type FormInputs = {
  content: string;
}

export default function AddFriend() {
  const user = useUserStore();
  const { register, handleSubmit, reset } = useForm({
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
      {/* <span className="mx-16 my-6 text-2xl font-bold">Add a friend</span>
      
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
      </div> */}


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
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(user.id)}>
                  copy
                </button>
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
            <button type="submit" className="border-top w-full">Send</button>
          </form>
        </div>
      </div>

    </div>
  );
}