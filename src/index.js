import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contenedor from "./elements/Contenedor";
import InicioSesion from "./components/InicioSesion";
import { Helmet } from "react-helmet";
import favicon from "./imagenes/logo.png";
import Fondo from "./elements/Fondo";
import { AuthProvider } from "./contextos/AuthContext";
import RutaPrivada from "./components/RutaPrivada";

import NewEvent from "./components/Event/NewEvent";
import EventList from "./components/Event/EventList";
import EditEvent from "./components/Event/EditEvent";

import "bootstrap/dist/css/bootstrap.min.css";

WebFont.load({
  google: {
    // Work+Sans:wght@400;500
    families: ["Work Sans: 400,500, 700", "sans-serif"],
  },
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <Contenedor>
          <BrowserRouter>
            <Switch>
              <Route path="/iniciar-sesion" component={InicioSesion} />

              <RutaPrivada path="/events/new-event">
                <NewEvent />
              </RutaPrivada>
              <RutaPrivada path="/events/edit/:id">
                <EditEvent />
              </RutaPrivada>
              <RutaPrivada path="/events">
                <EventList />
              </RutaPrivada>

              <RutaPrivada path="/">
                <App />
              </RutaPrivada>
            </Switch>
          </BrowserRouter>
        </Contenedor>
      </AuthProvider>
      <Fondo />
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
