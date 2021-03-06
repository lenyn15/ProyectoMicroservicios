import "./styles/RegistroVentas.scss"
import React, { Component }                          from "react";
import EmpleadoService                               from "../EmpleadoComponent/service/EmpleadoService";
import VentaService                                  from "./service/VentaService";
import { FontAwesomeIcon }                           from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

class RegistroVentas extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            ventas : [],
            empleados : [],

            IDempleadoSelect : '4',
        }

        this.optionSelected = this["optionSelected"].bind( this );
    }

    componentDidMount() {
        EmpleadoService.mostrarEmpleado()
                       .then( listaE => {
                           this.setState( { empleados : listaE.data } )
                       } )
        VentaService.mostrarVentas()
                    .then( listaV => {
                        this.setState( { ventas : listaV.data } )
                    } )
    }


    registrarVenta( idEmpleado ) {
        this.props.history.push( "/registro-venta/" + idEmpleado )
    }

    optionSelected = ( event ) => {
        this.setState( { IDempleadoSelect : event.target.value } )
    }

    render() {
        return (
            <div>
                <br/>
                <div className="listSales_Title">
                    <h2 className="title_listV">Registro de Ventas</h2>
                </div>
                <div className="container_listaV">
                    <div className="box-nuevo">
                        <div className="box-add">
                            <a className="btn-add btnNew"
                               onClick={ () => this.registrarVenta( this.state.IDempleadoSelect ) }>
                                <i className="icon-addBtn"><FontAwesomeIcon icon={ faCartArrowDown }/></i>
                                Nueva Venta
                            </a>
                        </div>
                        <div className="wrapper-search">
                            <div className="box_search">
                                <div className="dropdown-busqueda">
                                    <select className="options-search" value={ this.state.IDempleadoSelect }
                                            onChange={ this.optionSelected }>
                                        { this.state.empleados.map(
                                            EMPLEADO =>
                                                <option key={ EMPLEADO.id } value={ EMPLEADO.id }
                                                        className="option-E">
                                                    { EMPLEADO.nombres }
                                                </option>
                                        ) }
                                    </select>
                                </div>
                                <div className="search_field">
                                    <input className="input" type="text" placeholder="Buscar"/>
                                    <i className="icon-lupa"><FontAwesomeIcon icon={ faSearch }/></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-tabla">
                        <table className="table-ventas">
                            <thead>
                            <tr className="tabla-cabecera">
                                <th>Fecha de venta</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>{
                                this.state.ventas.map(
                                    venta =>
                                        <tr key={ venta.id }>
                                            <td>{ venta.fecha }</td>
                                            <td>{ venta.total }</td>
                                            <td>
                                                <div className="wrapper">
                                                    <a className="btnEditar"
                                                        /*onClick={ () => this.editarProducto( producto.id ) }*/>
                                                        <i><FontAwesomeIcon icon={ faPen } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a href={ window.location.pathname } className="btnEliminar"
                                                        /*onClick={ () => this.eliminarProduct( producto.id ) }*/>
                                                        <i><FontAwesomeIcon icon={ faTrash } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                )
                            }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistroVentas