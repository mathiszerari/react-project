import Message from "../types/message";
import { StatusCodes } from "http-status-codes";

export const sendMessage = async (receiverId: string, content: string): Promise<void> => {
    const messageId = crypto.randomUUID();
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/${messageId}/send`, {
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
}

export const fetchMessages = async(receiverId: string): Promise<Message[]> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/messages/${receiverId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    if(!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
}