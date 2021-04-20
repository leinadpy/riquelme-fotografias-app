import { db } from "./../firebaseConfig";

const deleteEvent = (id) => {
  db.collection("events").doc(id).delete();
};

export default deleteEvent;
