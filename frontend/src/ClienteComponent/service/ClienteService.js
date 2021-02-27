import axios from "axios";

const CLIENTE_API_BASE_URL = "http://localhost:8092/cliente"

class ClienteService {

    mostrarCliente() {
        return axios.get( CLIENTE_API_BASE_URL + "/listar" )
    }

    buscarClienteporID( clienteID ) {
        return axios.get( CLIENTE_API_BASE_URL + "/buscar/" + clienteID )
    }

    listarPorTipo( tipoId ) {
        return axios.get( CLIENTE_API_BASE_URL + "/listar/tipo/" + tipoId )
    }

    crearCliente( cliente ) {
        return axios.post( CLIENTE_API_BASE_URL + "/registrar", cliente )
    }

    actualizarCliente( cliente ) {
        return axios.put( CLIENTE_API_BASE_URL + "/actualizar", cliente )
    }

    eliminarCliente( clienteID ) {
        return axios.delete( CLIENTE_API_BASE_URL + "/eliminar/" + clienteID )
    }
}

export default new ClienteService()