export default interface Message {
  id: string,
  emitterId?: string,
  content: string,
  sentAt?: Date,
}