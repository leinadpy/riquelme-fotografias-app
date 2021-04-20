import { db } from "./../firebaseConfig";

const editEvent = ({
  id,
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
  return db.collection("events").doc(id).update({
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

export default editEvent;
