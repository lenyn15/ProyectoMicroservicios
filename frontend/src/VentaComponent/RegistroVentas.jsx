import "./styles/RegistroVentas.scss"
import React, { Component }          from "react";
import EmpleadoService               from "../EmpleadoComponent/service/EmpleadoService";
import { FontAwesomeIcon }           from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faSearch } from "@fortawesome/free-solid-svg-icons";

class RegistroVentas extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            ventas : [],
            empleados : [],

            IDempleadoSelect : '1',
        }

        this.optionSelected = this["optionSelected"].bind( this );
    }

    componentDidMount() {
        EmpleadoService.mostrarEmpleado()
                       .then( listaE => {
                           this.setState( { empleados : listaE.data } )
                       } )
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
                            <a className="btn-add btnNew" /*onClick={ this.agregarProducto }*/>
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
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistroVentas