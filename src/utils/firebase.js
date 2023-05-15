import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, orderByChild, equalTo, get, onValue, limitToLast } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from './firebaseConfig.json';
import { async } from 'regenerator-runtime';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);

export function getNodeReference(nodePath) {
  return ref(db, nodePath);
}

// export async function getNotificationsOfUser(userId) {
//   const nodeUser = getNodeReference(`/notification/${userId}`);
//   const notificationQuery = query(nodeUser, orderByChild('read'), equalTo(false));
//   const snapshot = await get(notificationQuery);
//   console.log(snapshot.val());
// }

export async function getNotificationsOfUser(userId) {
    const nodeUser = getNodeReference(`/notification/${userId}`);
    const snapshot = await get(nodeUser);
  const unreadNotifications = [];
  snapshot.forEach((childSnapshot) => {
    const notification = childSnapshot.val();
    if (!notification.read) {
      unreadNotifications.push(notification);
    }
  });

  return unreadNotifications;
  }

export async function getAllNotificationsOfUser(userId) {
const nodeUser = getNodeReference(`/notification/${userId}`);
const notificationQuery = query(nodeUser, limitToLast(50));
const snapshot = await get(notificationQuery);

const notifications = [];
snapshot.forEach((childSnapshot) => {
  const notification = childSnapshot.val();
  notifications.push(notification);
});
  return notifications.reverse();

  }

export async function listenToNotificationsOfUser(userId, callback) {
    const nodeUser = getNodeReference(`/notification/${userId}`);
    const notificationQuery = query(nodeUser, orderByChild('postId'), limitToLast(50), equalTo(false, 'read'));
    onValue(notificationQuery, (snapshot) => {
      const notifications = [];
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        if(notification)
        notifications.push(notification);
      });
      callback(notifications);
    });
  }

export async function getTotalMsgNotification(userId,callback ){
  const chatRef = getNodeReference('/chat');
  const snapshot = await get(chatRef);
  let quantity =0;
  snapshot.forEach((childSnapshot) => {
  const msgId = childSnapshot.key;
  const chatRef = getNodeReference(`/chat/${msgId}`);
  const notificationQuery = query(chatRef, orderByChild('userId'), equalTo(userId));

  onValue(notificationQuery, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const notification = childSnapshot.val();
      quantity += notification.amount;
    });
  });
  })
  callback(quantity);

}

export async function getMsgNotificationDetail(userId, msgId){

  if(!userId || !msgId) return 0;
  const chatRef = getNodeReference(`/chat/${msgId}`);
  const notificationQuery = query(chatRef, orderByChild('userId'), equalTo(userId));
  let quantity =0;
  onValue(notificationQuery, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const notification = childSnapshot.val();
      quantity += notification.amount;
    });
  });
  return quantity;
}

export function  listenMsgItemNotificationOfAUser({msgId, userId}, callback){
  const chatRef = getNodeReference(`/chat/${msgId}`);
  const notificationQuery = query(chatRef, orderByChild('userId'), equalTo(userId));
  
  onValue(notificationQuery, (snapshot) => {
    let amount = 0;

    snapshot.forEach((childSnapshot) => {
      const entry = childSnapshot.val();
      amount += entry.amount;
    });
  });
  callback(amount);
}




