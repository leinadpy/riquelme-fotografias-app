import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { BotonAccionSmall } from "./../../elements/ElementosDeLista";
import DatePicker from "./../DatePicker";
import { getUnixTime } from "date-fns";

const FormularioDetailEvent = ({
  payments,
  setPayments
}) => {
  const [datePay, setDatePay] = useState(new Date());
  const [inputAmountPay, setInputAmountPay] = useState(0);

  const handleChange = (e) => {
    if(e.target.name==="amountPay") setInputAmountPay(e.target.value)
  };

  const addPay = (e) => {
    e.preventDefault();
    setPayments([
      ...payments,
      {
        id: payments.length,
        datePay: getUnixTime(datePay),
        amountPay: inputAmountPay
      },
    ]);
    setDatePay(new Date());
    setInputAmountPay(0);
  };

  return (
    <>
      <h3>Agregar pagos</h3>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridDatePay">
          <Form.Label>Fecha Pago</Form.Label>
          <DatePicker fecha={datePay} setFecha={setDatePay} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAmountPay">
          <Form.Label>Monto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Monto"
            name="amountPay"
            value={inputAmountPay}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridAddPay">
          <BotonAccionSmall onClick={(e) => addPay(e)}>
            Agregar pago
          </BotonAccionSmall>
        </Form.Group>
      </Form.Row>
    </>
  );
};

export default FormularioDetailEvent;
