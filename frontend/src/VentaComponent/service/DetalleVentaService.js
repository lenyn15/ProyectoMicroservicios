import axios from "axios";

const VDETALLE_API_BASE_URL = "http://localhost:8093/ventadetalle"

class DetalleVentaService {

    mostrarDetalles() {
        return axios.get( VDETALLE_API_BASE_URL + "/listar" )
    }

    mostrarProductos() {
        return axios.get( VDETALLE_API_BASE_URL + "/productos" )
    }

    filtrarProductos( filtro ) {
        return axios.get( VDETALLE_API_BASE_URL + "/productos/filtro/" + filtro )
    }

    buscarProducto( productoID ) {
        return axios.get( VDETALLE_API_BASE_URL + "/producto/buscar/" + productoID )
    }

    buscarDetalle( detalleID ) {
        return axios.get( VDETALLE_API_BASE_URL + "/buscar/" + detalleID )
    }

    crearDetalle( detalle ) {
        return axios.post( VDETALLE_API_BASE_URL + "/registrar", detalle )
    }

    actualizarDetalle( detalle ) {
        return axios.put( VDETALLE_API_BASE_URL + "/actualizar", detalle )
    }

    eliminarDetalle( detalleID ) {
        return axios.delete( VDETALLE_API_BASE_URL + "/eliminar/" + detalleID )
    }
}

export default new DetalleVentaService()