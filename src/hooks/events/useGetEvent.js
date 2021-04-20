import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

const useGetEvent = (id) => {
  const history = useHistory();
  const [event, setEvent] = useState("");

  useEffect(() => {
    db.collection("events")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setEvent(doc);
        } else {
          history.push("/events");
        }
      });
  }, [id, history]);

  return [event];
};

export default useGetEvent;
