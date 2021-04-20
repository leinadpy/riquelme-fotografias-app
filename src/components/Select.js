import React, { useState } from "react";
import styled from "styled-components";
import theme from "./../theme";
import { ReactComponent as IconoDown } from "./../imagenes/down.svg";

const ContenedorSelect = styled.div`
  background: ${theme.grisClaro};
  cursor: pointer;
  border-radius: 0.625rem; /* 10px */
  position: relative;
  height: 2.5rem; /* 80px */
  width: 100%;
  padding: 0px 1.25rem; /* 20px */
  font-size: 1.25rem; /* 24px */
  text-align: center;
  display: flex;
  align-items: center;
  transition: 0.5s ease all;
  margin-top: 0px;
  margin-bottom: 10px;
  &:hover {
    background: ${theme.grisClaro2};
  }
`;

const OpcionSeleccionada = styled.div`
  width: 100%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 1.25rem; /* 20px */
    height: auto;
    margin-left: 1.25rem; /* 20px */
  }
`;

const Opciones = styled.div`
  background: ${theme.grisClaro};
  position: absolute;
  top: 3.5rem; /* 90px */
  left: 0;
  width: 100%;
  border-radius: 0.625rem; /* 10px */
  max-height: 18.75rem; /* 300px */
  overflow-y: auto;
  z-index: 200;
`;

const Opcion = styled.div`
  padding: 1rem; /* 20px */
  display: flex;
  svg {
    width: 28px;
    height: auto;
    margin-right: 1.25rem; /* 20px */
  }
  &:hover {
    background: ${theme.grisClaro2};
  }
`;

const Select = ({ seleccionado, setSeleccionado, info }) => {
  const [mostrarSelect, setMostrarSelect] = useState(false);

  const handleClick = (e) => {
    setSeleccionado(e.currentTarget.dataset.valor);
  };

  return (
    <ContenedorSelect onClick={() => setMostrarSelect(!mostrarSelect)}>
      <OpcionSeleccionada>
        {seleccionado} <IconoDown />
      </OpcionSeleccionada>

      {mostrarSelect && (
        <Opciones>
          {info.map((data) => {
            return (
              <Opcion key={data.id} data-valor={data.id} onClick={handleClick}>
                {data.texto}
              </Opcion>
            );
          })}
        </Opciones>
      )}
    </ContenedorSelect>
  );
};

export default Select;
