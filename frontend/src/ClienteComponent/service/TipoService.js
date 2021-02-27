import axios from "axios";

const TIPO_API_BASE_URL = "http://localhost:8092/tipo"

class TipoService {

    mostrarTipos() {
        return axios.get( TIPO_API_BASE_URL + "/listar" );
    }
}

export default new TipoService()