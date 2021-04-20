import React, { useState, useEffect } from "react";
import Boton from "../../elements/Boton";
import { ContenedorBoton } from "../../elements/ElementosDeFormulario";
import Alerta from "../../elements/Alerta";
import editEvent from "../../firebase/events/editEvent";
import addEvent from "./../../firebase/events/addEvent";
import { useHistory } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import DatePicker from "./../DatePicker";
import { getUnixTime, fromUnixTime } from "date-fns";
import FormularioDetailEvent from "./FormularioDetailEvent";
import DetailEventList from "./DetailEventList";
import convertirAMoneda from "./../../funciones/convertirAMoneda";
import Select from "./../Select"

const statusSelect = [
  { id: "Pendiente", texto: "Pendiente" },
  { id: "Cancelado", texto: "Cancelado" },
];

const FormularioEvent = ({ event }) => {
  const [dateEvent, setDateEvent] = useState(new Date());
  const [inputNameEvent, setInputNameEvent] = useState("");
  const [inputTimeEvent, setInputTimeEvent] = useState("");
  const [inputPlaceEvent, setInputPlaceEvent] = useState("");
  const [inputDetailsAboutEvent, setInputDetailsAboutEvent] = useState(
    "Sin detalles"
  );
  const [payments, setPayments] = useState([]);
  const [inputTotal, setInputTotal] = useState(0);
  const [balanceToPay, setBalanceToPay] = useState(0);
  const [status, setStatus] = useState("Pendiente")

  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (event) {
      setDateEvent(fromUnixTime(event.data().dateEvent));
      setInputNameEvent(event.data().nameEvent);
      setInputTimeEvent(event.data().timeEvent);
      setInputPlaceEvent(event.data().placeEvent);
      setInputDetailsAboutEvent(event.data().detailsAboutEvent);
      setPayments(event.data().payments);
      setInputTotal(event.data().total);
      setBalanceToPay(event.data().balanceToPay);
      setStatus(event.data().status)
    }
  }, [event]);

  useEffect(() => {
    let subtotal = 0;
    payments.forEach((payment) => {
      subtotal += payment.amountPay;
    });
    setBalanceToPay(inputTotal - subtotal);
  }, [inputTotal, payments]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "nameEvent":
        setInputNameEvent(e.target.value);
        break;
      case "timeEvent":
        setInputTimeEvent(e.target.value);
        break;
      case "placeEvent":
        setInputPlaceEvent(e.target.value);
        break;
      case "detailsAboutEvent":
        setInputDetailsAboutEvent(e.target.value);
        break;
      case "total":
        setInputTotal(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    if (
      inputNameEvent !== "" &&
      inputTimeEvent !== "" &&
      inputPlaceEvent !== "" &&
      inputDetailsAboutEvent !== "" &&
      inputTotal !== "" &&
      payments.length !== 0
    ) {
      if (event) {
        editEvent({
          id: event.id,
          dateEvent: getUnixTime(dateEvent),
          nameEvent: inputNameEvent,
          timeEvent: inputTimeEvent,
          placeEvent: inputPlaceEvent,
          detailsAboutEvent: inputDetailsAboutEvent,
          payments: payments,
          total: inputTotal,
          balanceToPay: balanceToPay,
          status: status
        })
          .then(() => {
            history.push("/events");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        addEvent({
          dateEvent: getUnixTime(dateEvent),
          nameEvent: inputNameEvent,
          timeEvent: inputTimeEvent,
          placeEvent: inputPlaceEvent,
          detailsAboutEvent: inputDetailsAboutEvent,
          payments: payments,
          total: inputTotal,
          balanceToPay: balanceToPay,
          status: status,
        })
          .then(() => {
            setDateEvent(new Date());
            setInputNameEvent("");
            setInputTimeEvent("");
            setInputPlaceEvent("");
            setInputDetailsAboutEvent("Sin detalles");
            setPayments([]);
            setInputTotal(0);
            setBalanceToPay(0);
            setStatus("Pendiente");

            setEstadoAlerta(true);
            setAlerta({
              tipo: "exito",
              mensaje: "El evento fue agregado correctamente",
            });
          })
          .catch((error) => {
            setEstadoAlerta(true);
            setAlerta({
              tipo: "error",
              mensaje: "El valor ingresado no es el correcto",
            });
          });
      }
    } else {
      setEstadoAlerta(true);
      setAlerta({
        tipo: "error",
        mensaje: "Por favor rellena todos los campos",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDateEvent">
            <Form.Label>Fecha del evento</Form.Label>
            <DatePicker fecha={dateEvent} setFecha={setDateEvent} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridNameEvent">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nameEvent"
              value={inputNameEvent}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTimeEvent">
            <Form.Label>Hora del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Hora del evento"
              name="timeEvent"
              value={inputTimeEvent}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPlaceEvent">
            <Form.Label>Lugar del evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lugar del evento"
              name="placeEvent"
              value={inputPlaceEvent}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDetails">
            <Form.Label>Detalles del evento</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Detalles del evento"
              name="detailsAboutEvent"
              value={inputDetailsAboutEvent}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTotal">
            <Form.Label>Total a cobrar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Total a cobrar"
              name="total"
              value={inputTotal}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPlaceEvent">
            <Form.Label>Saldo</Form.Label>
            <Form.Control
              type="text"
              name="balanceToPay"
              value={convertirAMoneda(balanceToPay)}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPlaceEvent">
            <Form.Label>Estado</Form.Label>
            <Select
              seleccionado={status}
              setSeleccionado={setStatus}
              info={statusSelect}
            />
          </Form.Group>
        </Form.Row>
        <FormularioDetailEvent payments={payments} setPayments={setPayments} />
        <DetailEventList payments={payments} setPayments={setPayments} />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            {event ? "Editar Evento" : "Agregar Evento"}
          </Boton>
        </ContenedorBoton>
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          estadoAlerta={estadoAlerta}
          setEstadoAlerta={setEstadoAlerta}
        />
      </Form>
    </>
  );
};

export default FormularioEvent;
