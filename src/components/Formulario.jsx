import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ setBusqueda, setPage }) => {
  const [termino, setTermino] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (termino.trim() === "") {
      setError(true);
      return;
    }

    // Quitar mensaje de error
    setError(false);

    // Mandar la busqueda al componente principal
    setBusqueda(termino);

    // Reincio la página a 1
    setPage(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: fútbol"
            onChange={(e) => setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {error ? <Error mensaje="La búsqueda no puede estar vacía" /> : null}
    </form>
  );
};

Formulario.propTypes = {
  setBusqueda: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Formulario;
