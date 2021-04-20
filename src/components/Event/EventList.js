import React from "react";
import { Header, Titulo, ContenedorHeader } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import useGetEvents from "./../../hooks/events/useGetEvents";
import deleteEvent from "./../../firebase/events/deleteEvent";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import ContenedorTabla from "./../../elements/ContenedorTabla";
import Menu from "./../Menu";
import { ReactComponent as IconoEditar } from "./../../imagenes/editar.svg";
import { ReactComponent as IconoBorrar } from "./../../imagenes/borrar.svg";
import Boton from "./../../elements/Boton";
import { Link } from "react-router-dom";
import formatearFecha from "./../../funciones/formatearFecha";
import { Card } from "react-bootstrap";

const EventList = () => {
  const [events] = useGetEvents();

  return (
    <>
      <Helmet>
        <title>Lista de eventos</title>
      </Helmet>
      <Menu />
      <Header>
        <ContenedorHeader>
          <Titulo>Lista de eventos</Titulo>
        </ContenedorHeader>
      </Header>

      <ContenedorTabla>
        {events.length !== 0 ? (
          events.map(
            (event) =>
              event.status !== "Cancelado" && (
                <Card
                  className="text-center"
                  style={{ width: "18rem", margin: "10px" }}
                >
                  <Card.Body>
                    <Card.Title>
                      {formatearFecha(event.dateEvent, "dd/MM/yyyy")}
                    </Card.Title>
                    <Card.Text>{event.nameEvent}</Card.Text>
                    <Boton
                      to={`/events/edit/${event.id}`}
                      small="true"
                      as={Link}
                    >
                      <IconoEditar />
                    </Boton>
                    <Boton small="true" onClick={() => deleteEvent(event.id)}>
                      <IconoBorrar />
                    </Boton>
                  </Card.Body>
                </Card>
              )
          )
        ) : (
          <h3>No hay eventos para mostrar</h3>
        )}
      </ContenedorTabla>
    </>
  );
};

export default EventList;
