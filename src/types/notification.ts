export default interface Notification {
  id: string;
  type: string;
  emitterId?: string;
  content?: string;
  receivedAt: string;
  didIAccept?: boolean;
}