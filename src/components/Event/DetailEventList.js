import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import convertirAMoneda from "./../../funciones/convertirAMoneda";
import { ReactComponent as IconoBorrar } from "./../../imagenes/borrar.svg";
import { BotonAccion } from "./../../elements/ElementosDeLista";
import formatearFecha from "./../../funciones/formatearFecha"

const Cabecera = styled.th`
  text-align: center;
`;

const Fila = styled.td`
  text-align: center;
`;

const DetailEventList = ({
  payments,
  setPayments
}) => {
  const onRemoveItem = (e, index) => {
    e.preventDefault();
    
    const newPayments = payments.filter(
      (item, j) => index !== j
    );
    setPayments(newPayments);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <Cabecera>X</Cabecera>
          <Cabecera>Fecha Pago</Cabecera>
          <Cabecera>Monto Pago</Cabecera>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment, index) => (
          <tr key={index}>
            <Fila>
              <BotonAccion onClick={(e) => onRemoveItem(e, index)}>
                <IconoBorrar />
              </BotonAccion>
            </Fila>
            <Fila>{formatearFecha(payment.datePay, "dd/MM/yyyy")}</Fila>
            <Fila>{convertirAMoneda(payment.amountPay)}</Fila>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DetailEventList;
