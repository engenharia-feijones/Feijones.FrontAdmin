import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cadastro from '../views/Cadastro.vue'
import ListarClientes from '../views/ListarClientes.vue'
import ListarEnderecosCliente from '../views/ListarEnderecosCliente.vue'
import EditarCliente from '../views/EditarCliente.vue'
import Geolocalizacao from '../views/Localizacao.vue'
import Produtos from '../views/Produtos.vue'
import Inventario from '../views/Inventario'
import Venda from '../views/Venda.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastrar',
    name: "Cadastro Cliente",
    component: Cadastro
  },

  {
    path: "/listar",
    name: "Listar Clientes",
    component: ListarClientes,
  },
  {
    path: "/editar/:id",
    name: "Editar Dados",
    component: EditarCliente
  },

  {
    path: "/listar/:id",
    name: "Enderecos Cliente",
    component: ListarEnderecosCliente
  },

  {
    path: '/geolocalizacao',
    name: "Localizacao",
    component: Geolocalizacao
  },
  {
    path: '/produtos',
    name: "Produtos",
    component: Produtos
  },
  {
    path: '/inventario',
    name: "Inventario",
    component: Inventario
  },
  {
    path: '/vendas',
    name: "Vendas",
    component: Venda
  },



]

const router = new VueRouter({
  routes
})

export default router
