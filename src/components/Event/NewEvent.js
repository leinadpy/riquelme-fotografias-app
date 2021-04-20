import React from "react";
import { Header, Titulo } from "../../elements/Header";
import { Helmet } from "react-helmet";
import FormularioEvent from "./FormularioEvent";
import Menu from "./../Menu";

const NewEvent = () => {
  return (
    <>
      <Menu />
      <Helmet>
        <title>Nuevo Evento</title>
      </Helmet>
      <Header>
        <Titulo>Nuevo Evento</Titulo>
      </Header>
      <FormularioEvent />
    </>
  );
};

export default NewEvent;
