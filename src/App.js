import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = "17798954-7d0e9e7acd00c74208c4650a0";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${page}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);

      // Calcular total de páginas
      const calcularPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setTotalPaginas(calcularPaginas);

      // Mover pantalla hasta arriba
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [busqueda, page]);

  // Página Anteriro
  const paginaAnterior = () => {
    const nuevaPagina = page - 1;
    if (nuevaPagina === 0) return;
    setPage(nuevaPagina);
  };

  const paginaSiguiente = () => {
    const nuevaPagina = page + 1;
    if (page >= totalPaginas) return;
    setPage(nuevaPagina);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario setBusqueda={setBusqueda} setPage={setPage} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {page === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            Anterior
          </button>
        )}
        {page === totalPaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
