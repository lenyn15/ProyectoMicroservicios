import axios from "axios";

const CATEGORIA_API_BASE_URL = "http://localhost:8091/categoria"

class CategoriaService {

    mostrarCategorias() {
        return axios.get( CATEGORIA_API_BASE_URL + "/listar" )
    }

    buscarCategoriaPorID( categoriaID ) {
        return axios.get( CATEGORIA_API_BASE_URL + "/listar/" + categoriaID )
    }

    crearCategoria( categoria ) {
        return axios.post( CATEGORIA_API_BASE_URL + "/registrar", categoria )
    }

    actualizarCategoria( categoria ) {
        return axios.put( CATEGORIA_API_BASE_URL + "/actualizar", categoria )
    }

    eliminarCategoria( categoriaID ) {
        return axios.delete( CATEGORIA_API_BASE_URL + "/eliminar/" + categoriaID )
    }
}

export default new CategoriaService()