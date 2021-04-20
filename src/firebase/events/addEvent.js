import { db } from "./../firebaseConfig";

const addEvent = ({
  dateEvent,
  nameEvent,
  timeEvent,
  placeEvent,
  detailsAboutEvent,
  payments,
  total,
  balanceToPay,
  status
}) => {
  return db.collection("events").add({
    dateEvent: dateEvent,
    nameEvent: nameEvent,
    timeEvent: timeEvent,
    placeEvent: placeEvent,
    detailsAboutEvent: detailsAboutEvent,
    payments: payments,
    total: total,
    balanceToPay: balanceToPay,
    status: status,
  });
};

export default addEvent;
