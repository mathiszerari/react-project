import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMessageStore } from "../stores/messageStore";

export default function ChatPage() {

  type FormInputs = {
    message: string;
  }

  const { receiverId } = useParams();

  const { messages } = useMessageStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data.message);
    await sendMessage(data.message);
    //Add to store
    reset();
  }

  const sendMessage = async (content: string): Promise<void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}chat/${receiverId}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        receiverId,
        content,
      }),
    })
    console.log(response)
  }

  return (
    <div>
      <h1>Chat Page: {receiverId}</h1>
      <div>{messages}</div>


      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Tapez votre message ici" {...register('message', { required: true })} />
        <input type="submit"/>
      </form>

    </div>

  );
}