import axios from "axios";

const PRODUCTO_API_BASE_URL = "http://localhost:8091/producto"

class ProductoService {

    mostrarProductos() {
        return axios.get( PRODUCTO_API_BASE_URL + "/listar" )
    }

    buscarProductoPorID( productoID ) {
        return axios.get( PRODUCTO_API_BASE_URL + "/buscar/" + productoID )
    }

    crearProducto( producto ) {
        return axios.post( PRODUCTO_API_BASE_URL + "/registrar", producto )
    }

    actualizaProducto( producto ) {
        return axios.put( PRODUCTO_API_BASE_URL + "/actualizar", producto )
    }

    eliminarProducto( productoID ) {
        return axios.delete( PRODUCTO_API_BASE_URL + "/eliminar/" + productoID )
    }
}

export default new ProductoService()