import Notification from "../types/notification";

export function countUnseenNotifications() {
  console.log("count");
  
  const storedNotifications = localStorage.getItem('notifications');
  const parsedNotifications = storedNotifications ? JSON.parse(storedNotifications) : [];
  
  let count = 0;
  parsedNotifications.map((notification: Notification) => {
    if (notification.isSeen == false || notification.didIAccept == false) {
      count = count + 1;
    }
  });
  console.log(count);
  
  localStorage.setItem('unseenNotif', JSON.stringify(count));
  return count.toString();
}