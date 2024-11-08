export default interface Notification {
  id: string;
  type: string;
  emitterId?: string;
  emitterUsername?: string;
  receivedAt: string;
  didIAccept?: boolean;
  status?: string;
  isSeen: boolean;
}