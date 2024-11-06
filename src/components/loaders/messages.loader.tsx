import { redirect } from "react-router-dom";
import { MessageService } from "../../services/message.service";

export const MessagesLoader = async ({ params }: { params: Record<string, string | undefined> }) => {
  const messageService = new MessageService();
  try {
    const { receiverId } = params;
    if (!receiverId) throw new Error("Receiver ID missing");
    return await messageService.fetchMessages(receiverId);
  } catch (error) {
    return redirect('/');
  }
};
