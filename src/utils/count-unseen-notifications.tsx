import Notification from "../types/notification";

export function countUnseenNotifications(notifications: Notification[]) {
  // console.log("count");
  
  let count = 0;
  notifications.map((notification: Notification) => {
    if (notification.isSeen == false || notification.didIAccept == false) {
      count = count + 1;
    }
  });
  // console.log(count);
  
  return count.toString();
}