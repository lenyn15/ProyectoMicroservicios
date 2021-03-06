import "./styles/RegistrarVentas.scss"
import React, { Component } from "react";
import EmpleadoService      from "../EmpleadoComponent/service/EmpleadoService";

class RegistrarVentas extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            id : this.props.match.params.id
        }
    }

    componentDidMount() {
        EmpleadoService.buscarEmpleadoporID( this.state.id )
                       .then( result => {
                           console.log( result.data )
                           this.setState( { empleado : result.data } )
                       } )
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }

}

export default RegistrarVentas