import React from "react";
import { Header, Titulo } from "./../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioEvent from "./FormularioEvent";
import { useParams } from "react-router-dom";
import useGetEvent from "./../../hooks/events/useGetEvent";
import Menu from "./../Menu";

const EditEvent = () => {
  const { id } = useParams();
  const [event] = useGetEvent(id);

  return (
    <>
      <Helmet>
        <title>Editar Evento</title>
      </Helmet>
      <Menu />
      <Header>
        <Titulo>Editar Evento</Titulo>
      </Header>
      <FormularioEvent event={event} />
    </>
  );
};

export default EditEvent;
