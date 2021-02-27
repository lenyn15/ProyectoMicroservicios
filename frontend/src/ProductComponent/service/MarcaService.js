import axios from "axios";

const MARCA_API_BASE_URL = "http://localhost:8091/marca"

class MarcaService {

    mostrarMarcas() {
        return axios.get( MARCA_API_BASE_URL + "/listar" )
    }

    buscarMarcaPorID( marcaID ) {
        return axios.get( MARCA_API_BASE_URL + "/listar/" + marcaID )
    }

    crearMarca( marca ) {
        return axios.post( MARCA_API_BASE_URL + "/registrar", marca )
    }

    actualizarMarca( marca ) {
        return axios.put( MARCA_API_BASE_URL + "/actualizar", marca )
    }

    eliminarMarca( marcaID ) {
        return axios.delete( MARCA_API_BASE_URL + "/eliminar/" + marcaID )
    }
}

export default new MarcaService()