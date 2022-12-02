//import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../componentes/layout";
import ClientsAdmin, {
  ClientCreate,
  ClientEdit,
} from "../pages/admin/clients-admin";
import TypeProductAdmin, {
  CreateTypeProduct,
  EditTypeProduct,
} from "../pages/admin/type-products-admin";
import ProductAdmin, {
  ProductEdit,
  ProductCreate,
} from "../pages/admin/products-admin";

export default [
  {
    name: "Administración Productos ",
    key: "products-admin",
    route: "/admin/products",
    component: <ProductAdmin />,
    showLink: true,
  },
  {
    name: "Editar Producto",
    key: "products-edit-admin",
    route: "/admin/products/:productId",
    component: <ProductEdit />,
    showLink: false,
  },
  {
    name: "Tipos de Productos",
    key: "type-products-admin",
    route: "/admin/type-products",
    component: <TypeProductAdmin />,
    showLink: true,
  },
  {
    name: "Crear Tipo Products ",
    key: "tipo-producto-create-admin",
    route: "/admin/type-products/Nuevo-Tipo-Producto",
    component: <CreateTypeProduct />,
    showLink: false,
  },
  {
    name: "Editar Tipo Producto",
    key: "tipo-producto-edit-admin",
    route: "/admin/type-products/:tipoProductoId",
    component: <EditTypeProduct />,
    showLink: false,
  },
  {
    name: "Clientes",
    key: "clients-admin",
    route: "/admin/clients",
    component: <ClientsAdmin />,
    showLink: true,
  },
  {
    name: "Editar Clientes ",
    key: "clients-edit-admin",
    route: "/admin/clients/:clientId",
    component: <ClientEdit />,
    showLink: false,
  },
  {
    name: "Crear Clientes",
    key: "clients-create-admin",
    route: "/admin/clients/Nuevo-Cliente",
    component: <ClientCreate />,
    showLink: false,
  },
  {
    name: "Crear Producto",
    key: "products-create-admin",
    route: "/admin/products/Nuevo-Producto",
    component: <ProductCreate />,
    showLink: false,
  },
];
