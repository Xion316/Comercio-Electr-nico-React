import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/ClientHttp";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ClientCreate = () => {
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
      clientHttp.post(`/Cliente`, client).then((response) => {
        navegacion(`/admin/clients`);
      });
    }
  };

  const saveNotify = () => toast("Usuario Creado.");
  return (
    <form className="row" onSubmit={(e) => handleSubmit(e)}>
      <div className="col-6">
        <label htmlFor="nombres" className="form-label">
          Nombres
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="nombres"
            placeholder="Ingrese Nombres"
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Nombres es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="apellidos" className="form-label">
          Apellidos
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="apellidos"
            placeholder="Ingrese Apellidos"
            onChange={(e) => handleChange(e)}
            required
            maxLength="80"
          />
          <div className="invalid-feedback">Apellidos es obligatorio</div>
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="telefonos" className="form-label">
          Teléfono{" "}
        </label>
        <div className="input-group has-validation">
          <input
            type="text"
            className="form-control"
            id="telefonos"
            placeholder="Ingrese Telf"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="col-6">
        <label htmlFor="clienteCategoriaId" className="form-label">
          Categoría
        </label>
        <select
          className="form-select"
          id="clienteCategoriaId"
          required
          onChange={(e) => handleChange(e)}
        >
          <option disabled value="">
            Seleccionar Categoría
          </option>
          <option value="01">Nuevo</option>
          <option value="02">Frecuente</option>
          <option value="03">Ordinario</option>
        </select>
        <div className="invalid-feedback">Categoría es requerido</div>
      </div>

      <div className="col-12 mt-3">
        <Button
          className="btn btn-secondary"
          type="button"
          onClick={(e) => navegacion(`/admin/clients`)}
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
  );
};

export const ClientEdit = () => {
  const [client, setClient] = useState({});
  const [clientCategory, setClientCategory] = useState([]);

  const [loading, setLoading] = useState(true);
  const { clientId } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Cliente/${clientId}`).then((response) => {
      setClient(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    clientHttp.get(`/ClienteCategoria`).then((response) => {
      setClientCategory(response.data);
    });
  }, []);

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
      clientHttp.put(`/Cliente/?id=${clientId}`, client).then((response) => {
        navegacion(`/admin/clients`);
      });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (event.target.checkValidity() === true) {
      //console.log("Enviar...");
      //console.log(client);
      clientHttp.delete(`/Cliente/?id=${clientId}`, client).then((response) => {
        navegacion(`/admin/clients`);
      });
    }
  };

  const { identificacion, nombres, apellidos, telefonos, clienteCategoriaId } =
    client;

  const saveNotify = () => toast("Datos Guardados.");
  const deleteNotify = () => toast("Usuario Eliminado.");

  return loading ? (
    <div>Loading data...</div>
  ) : (
    <>
      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        <div className="col-6">
          <label htmlFor="identificacion" className="form-label">
            Identificación
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="identificacion"
              value={identificacion}
              onChange={(e) => handleChange(e)}
              required
              maxLength="30"
            />
            <div className="invalid-feedback">
              Identificación es obligatoria
            </div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="nombres" className="form-label">
            Nombres
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="nombres"
              value={nombres}
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Nombres es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="apellidos" className="form-label">
            Apellidos
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="apellidos"
              value={apellidos == null ? "" : apellidos}
              onChange={(e) => handleChange(e)}
              required
              maxLength="80"
            />
            <div className="invalid-feedback">Apellidos es obligatorio</div>
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="telefonos" className="form-label">
            Teléfono{" "}
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="telefonos"
              value={telefonos == null ? "" : telefonos}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="col-6">
          <label htmlFor="clienteCategoriaId" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            id="clienteCategoriaId"
            value={clienteCategoriaId}
            required
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">
              Seleccionar Categoría
            </option>
            {clientCategory.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Categoría es requerido</div>
        </div>

        <div className="col-12 mt-3">
          <Button
            className="btn btn-secondary"
            type="button"
            onClick={(e) => navegacion(`/admin/clients`)}
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

const ClientList = (cliente) => {
  const [clients, setClients] = useState([]);

  const navegacion = useNavigate();

  useEffect(() => {
    clientHttp.get(`/Cliente?limit=10000&offset=0`).then((response) => {
      //console.log(response);
      setClients(response.data.lista);
    });
  }, []);

  const handlerEditar = (client) => {
    navegacion(`/admin/clients/${client.id}`);
  };
  const handlerCrear = () => {
    navegacion(`/admin/clients/Nuevo-Cliente`);
  };

  return (
    <>
      <div className="col-6">
        <Button variant="success" onClick={(e) => handlerCrear(e)}>
          Crear Usuario
        </Button>{" "}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((cli) => (
            <tr key={cli.id}>
              <td>{cli.identificacion}</td>
              <td>{cli.nombres}</td>
              <td>{cli.apellidos}</td>
              <td>{cli.telefonos}</td>
              <td>{cli.clienteCategoria}</td>
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

export default function ClientsAdmin() {
  return <ClientList />;
}
