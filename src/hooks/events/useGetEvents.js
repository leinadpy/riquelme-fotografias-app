import { useState, useEffect } from "react";
import { db } from "./../../firebase/firebaseConfig";

const useGetEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsuscribe = db
      .collection("events")
      .orderBy("dateEvent", "asc")
      .onSnapshot((snapshot) => {
        setEvents(
          snapshot.docs.map((event) => {
            return { ...event.data(), id: event.id };
          })
        );
      });
    return unsuscribe;
  }, []);

  return [events];
};

export default useGetEvents;
