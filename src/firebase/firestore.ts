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

export const firestoreReg = async (
  email: string,
  pass: string,
  userName: string
) => {
  const user = auth.currentUser;
  await auth.createUserWithEmailAndPassword(email, pass);
  if (user) {
    const { uid } = user;
    const userDoc = usersDB.doc(uid);
    await userDoc.set({
      userID: uid,
      userName: userName,
      firstVisit: timeStamp,
      lastVisit: timeStamp,
    });
  }
};

export const firestoreLogin = async (
  email: string,
  pass: string,
  userName: string
) => {
  await auth.signInWithEmailAndPassword(email, pass);

  const user = auth.currentUser;

  if (user) {
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
        userID: uid,
        userName: userName,
        firstVisit: timeStamp,
        lastVisit: timeStamp,
      });
    }
  }
};
