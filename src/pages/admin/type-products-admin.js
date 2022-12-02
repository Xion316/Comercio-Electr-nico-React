import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const EditTypeProduct = () => {
  const [typeProducts, setTypeProducts] = useState({});

  const [loading, setLoading] = useState(true);
  const { tipoProductoId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/TipoProducto/${tipoProductoId}`).then((response) => {
      setTypeProducts(response.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setTypeProducts((clientCurrent) => ({ ...clientCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp
        .put(`/TipoProducto/?id=${tipoProductoId}`, typeProducts)
        .then((response) => {
          navegacion(`/admin/type-products`);
        });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp
        .delete(`/TipoProducto/?id=${tipoProductoId}`, typeProducts)
        .then((response) => {
          navegacion(`/admin/type-products`);
        });
    }
  };

  const { id, nombre, descuento } = typeProducts;

  const saveNotify = () => toast("Datos Guardados.");
  const deleteNotify = () => toast("Tipo Producto Eliminado.");
  return (
    <>
      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        {console.log(handleSubmit)}
        <div className="col-6">
          <label htmlFor="identificacion" className="form-label">
            Id
          </label>
          <div className="input-group has-validation">
            <span>{id}</span>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <div className="input-group has-validation">
            <input
              type="disabled"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Nombre es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="descuento" className="form-label">
            Descuento
          </label>
          <div className="input-group has-validation">
            <input
              pattern="^\d*(\.\d{2}$)?"
              size="4"
              type="currency"
              currency="USD"
              className="form-control"
              id="descuento"
              value={descuento == null ? "" : descuento}
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Descuento es obligatorio</div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => navegacion(`/admin/type-products`)}
          >
            Atras
          </Button>{" "}
          <Button
            className="btn btn-primary ms-3"
            variant="success"
            type="submit"
            onClick={saveNotify}
          >
            Guardar
          </Button>{" "}
        </div>
      </form>
      <div align="right" className="col-12 mt-3">
        <form className="col-12 mt-3" onSubmit={(e) => handleDelete(e)}>
          <Button
            type="submit"
            className="btn btn-primary ms-3"
            variant="danger"
            onClick={deleteNotify}
          >
            Eliminar Usuario
          </Button>
        </form>
      </div>
    </>
  );
};
export const TypeProductList = () => {
  const [typeProducts, setTypeProducts] = useState([]);

  const navegacion = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7127/TipoProducto").then((response) => {
      setTypeProducts(response.data);
    });
  }, []);

  const handlerEditar = (client) => {
    navegacion(`/admin/typeProducts/${client.id}`);
  };
  const handlerCrear = () => {
    navegacion(`/admin/typeProducts/Nuevo-Tipo-Producto`);
  };

  return (
    <>
      <div className="col-6">
        <Button variant="success" onClick={(e) => handlerCrear(e)}>
          Crear Tipo Producto
        </Button>{" "}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {typeProducts.map((cli) => (
            <tr key={cli.id}>
              <td>{cli.id}</td>
              <td>{cli.nombre} </td>
              <td>{cli.descuento}$USD</td>
              <td>
                <Button onClick={(e) => handlerEditar(cli)}>Editar</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <div>
          <ToastContainer />
        </div>
      </table>
    </>
  );
};

export default function TypeProductAdmin() {
  return <TypeProductList />;
}
