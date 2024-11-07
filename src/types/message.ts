export default interface Message {
  id: string;
  emitterId: string;
  receiverId: string;
  content: string;
  sendAt: string;
}