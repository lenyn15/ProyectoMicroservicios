import axios from "axios";

const EMPLEADO_API_BASE_URL = "http://localhost:8093/empleado"

class EmpleadoService {

    mostrarEmpleado() {
        return axios.get( EMPLEADO_API_BASE_URL + "/listar" )
    }

    buscarEmpleadoporID( empleadoID ) {
        return axios.get( EMPLEADO_API_BASE_URL + "/buscar/" + empleadoID )
    }

    filtrarEmpleadosporNombre( empleadoNombre ) {
        return axios.get( EMPLEADO_API_BASE_URL + "/listar/" + empleadoNombre )
    }

    crearEmpleado( empleado ) {
        return axios.post( EMPLEADO_API_BASE_URL + "/registrar", empleado )
    }

    actualizarEmpleado( empleado ) {
        return axios.put( EMPLEADO_API_BASE_URL + "/actualizar", empleado )
    }

    eliminarEmpleado( empleadoID ) {
        return axios.delete( EMPLEADO_API_BASE_URL + "/eliminar/" + empleadoID )
    }
}

export default new EmpleadoService()