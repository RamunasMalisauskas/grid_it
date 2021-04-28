import { auth, usersDB, timeStamp } from ".";

export const setFirestoreUserData = async (userName: string) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const { uid } = user;
      const userDoc = usersDB.doc(uid);
      const userData = await userDoc.get();

      if (userData.exists) {
        await userDoc.update({
          userName: userName,
          lastVisit: timeStamp,
        });
      } else {
        await userDoc.set({
          userName: userName,
          firstVisit: timeStamp,
          lastVisit: timeStamp,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};
