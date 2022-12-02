import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductCreate = () => {
  const [client, setClient] = useState({});

  const navegacion = useNavigate();

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setClient((clientCurrent) => ({ ...clientCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp.post(`/Producto`, client).then((response) => {
        navegacion(`/admin/products`);
      });
    }
  };

  const saveNotify = () => toast("Producto Creado.");

  return (
    <>
      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-6">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <div className="input-group has-validation">
            <input
              type="disabled"
              className="form-control"
              id="nombre"
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Nombre es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <div className="input-group has-validation">
            <input
              pattern="^\d*(\.\d{2}$)?"
              size="4"
              type="currency"
              currency="USD"
              className="form-control"
              id="precio"
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Precio es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="observaciones" className="form-label">
            Observaciones{" "}
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="observaciones"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="tipoProducto" className="form-label">
            Tipo Producto
          </label>
          <select
            className="form-select"
            id="tipoProductoId"
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Tipo Producto
            </option>
            <option value="01">Perecibles</option>
            <option value="02">No Perecibles</option>
          </select>
          <div className="invalid-feedback">Tipo Producto es requerido</div>
        </div>

        <div className="col-6">
          <label htmlFor="marca" className="form-label">
            Tipo Producto
          </label>
          <select
            className="form-select"
            id="marcaId"
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Marca
            </option>
            <option value="string">string</option>
            <option value="string1">string 1</option>
            <option value="string2">string 2</option>
            <option value="string3">string 3</option>
            <option value="string4">string 4</option>
            <option value="string5">string 5</option>
          </select>
          <div className="invalid-feedback">Tipo Producto es requerido</div>
        </div>

        <div className="col-6">
          <label htmlFor="caducidad" className="form-label">
            Fecha de Caducidad{" "}
          </label>
          <div className="input-group has-validation">
            <input
              type="date"
              className="form-control"
              id="caducidad"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-12 mt-3">
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => navegacion(`/admin/products`)}
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
    </>
  );
};

export const ProductEdit = () => {
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto/${productId}`).then((response) => {
      setProduct(response.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;
    setProduct((clientCurrent) => ({ ...clientCurrent, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp.put(`/Producto/?id=${productId}`, product).then((response) => {
        navegacion(`/admin/products`);
      });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp
        .delete(`/Producto/?id=${productId}`, product)
        .then((response) => {
          navegacion(`/admin/products`);
        });
    }
  };

  const { id, nombre, precio, observaciones, caducidad, marca, tipoProducto } =
    product;

  const saveNotify = () => toast("Datos Guardados.");
  const deleteNotify = () => toast("Producto Eliminado.");

  return loading ? (
    <div>Loading data...</div>
  ) : (
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
          <label htmlFor="precio" className="form-label">
            Precio
          </label>
          <div className="input-group has-validation">
            <input
              pattern="^\d*(\.\d{2}$)?"
              size="4"
              type="currency"
              currency="USD"
              className="form-control"
              id="precio"
              value={precio == null ? "" : precio}
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Precio es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="observaciones" className="form-label">
            Observaciones{" "}
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="observaciones"
              value={observaciones == null ? "" : observaciones}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="tipoProducto" className="form-label">
            Tipo Producto
          </label>
          <select
            className="form-select"
            id="tipoProductoId"
            value={tipoProducto}
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Tipo Producto
            </option>
            <option value="01">Perecibles</option>
            <option value="02">No Perecibles</option>
          </select>
          <div className="invalid-feedback">Tipo Producto es requerido</div>
        </div>

        <div className="col-6">
          <label htmlFor="marca" className="form-label">
            Tipo Producto
          </label>
          <select
            className="form-select"
            id="marcaId"
            value={marca}
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Marca
            </option>
            <option value="string">string</option>
            <option value="string1">string 1</option>
            <option value="string2">string 2</option>
            <option value="string3">string 3</option>
            <option value="string4">string 4</option>
            <option value="string5">string 5</option>
          </select>
          <div className="invalid-feedback">Tipo Producto es requerido</div>
        </div>

        <div className="col-6">
          <label htmlFor="caducidad" className="form-label">
            Fecha de Caducidad{" "}
          </label>
          <div className="input-group has-validation">
            <input
              type="date"
              min={caducidad}
              className="form-control"
              id="caducidad"
              value={caducidad == null ? "" : caducidad}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-12 mt-3">
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => navegacion(`/admin/products`)}
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
const ProductList = (cliente) => {
  const [products, setProducts] = useState([]);

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Producto`).then((response) => {
      //console.log(response);
      setProducts(response.data.lista);
    });
  }, []);

  const handlerEditar = (client) => {
    navegacion(`/admin/products/${client.id}`);
  };
  const handlerCrear = () => {
    navegacion(`/admin/products/Nuevo-Producto`);
  };

  return (
    <>
      <div className="col-6">
        <Button variant="success" onClick={(e) => handlerCrear(e)}>
          Crear Producto
        </Button>{" "}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Observaciones</th>
            <th>Caducidad</th>
            <th>Marca</th>
            <th>Tipo Producto</th>
            <th>Acciones </th>
          </tr>
        </thead>
        <tbody>
          {products.map((cli) => (
            <tr key={cli.id}>
              <td>{cli.id}</td>
              <td>{cli.nombre}</td>
              <td>{cli.precio} $USD</td>
              <td>{cli.observaciones}</td>
              <td>{cli.caducidad}</td>
              <td>{cli.marca}</td>
              <td>{cli.tipoProducto}</td>
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
export default function ProductAdmin() {
  return <ProductList />;
}
