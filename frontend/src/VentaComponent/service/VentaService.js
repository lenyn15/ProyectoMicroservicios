import axios from "axios";

const VENTA_API_BASE_URL = "http://localhost:8093/venta"

class VentaService {

    mostrarVentas() {
        return axios.get( VENTA_API_BASE_URL + "/listar" )
    }

    mostrarClientes() {
        return axios.get( VENTA_API_BASE_URL + "/clientes" )
    }

    filtrarClientes( filtro ) {
        return axios.get( VENTA_API_BASE_URL + "/clientes/filtro/" + filtro )
    }

    buscarCliente( clienteID ) {
        return axios.get( VENTA_API_BASE_URL + "/cliente/buscar/" + clienteID )
    }

    buscarVenta( ventaID ) {
        return axios.get( VENTA_API_BASE_URL + "/buscar/" + ventaID )
    }

    crearVenta( venta ) {
        return axios.post( VENTA_API_BASE_URL + "/registrar", venta )
    }

    actualizarVenta( venta ) {
        return axios.put( VENTA_API_BASE_URL + "/actualizar", venta )
    }

    eliminarVenta( ventaID ) {
        return axios.delete( VENTA_API_BASE_URL + "/eliminar/" + ventaID )
    }
}

export default new VentaService()