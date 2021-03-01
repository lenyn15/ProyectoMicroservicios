import "../ClienteComponent/style/ListarTipo.scss"
import "./style/ListarEmpleado.scss"
import React, { Component }                             from "react";
import EmpleadoService                                  from "./service/EmpleadoService";
import { FontAwesomeIcon }                              from "@fortawesome/react-fontawesome";
import { faInfo, faPen, faSearch, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalFooter }                           from "reactstrap";
import { ModalBody }                                    from "reactstrap";
import moment                                           from 'moment';

class ListarEmpleado extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            empleados : []
        }
    }

    componentDidMount() {
        EmpleadoService.mostrarEmpleado()
                       .then( listaE => {
                           this.setState( { empleados : listaE.data } )
                       } )
    }

    render() {
        return (
            <div>
                <br/>
                <div className="listEmployee_Title">
                    <h2 className="title_listE">Registro de Empleados</h2>
                </div>
                <div className="container_listaE">

                    {/*============================================================================================*/ }
                    <div className="busqueda_nuevo">
                        <div className="search-box">
                            <input className="search-txt" type="text" placeholder="Buscar por nombre"/>
                            <a className="search-btn">
                                <i><FontAwesomeIcon icon={ faSearch }/></i>
                            </a>
                        </div>
                        <div className="add-box">
                            <a className="add-btn btnNew">
                                <i className="icon-add-btn"><FontAwesomeIcon icon={ faUserPlus }/></i>
                                Nuevo Empleado
                            </a>
                        </div>
                    </div>
                    <br/>
                    {/*============================================================================================*/ }

                    {/*============================= Tabla con datos de los clientes =============================*/ }
                    <div className="box-tabla">
                        <table className="table-empleados">
                            <thead>
                            <tr className="table-cabecera">
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Telefono</th>
                                <th>Fecha de Contrato</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>{
                                this.state.empleados.map(
                                    empleado =>
                                        <tr key={ empleado.id }>
                                            <td>{ empleado.nombres }</td>
                                            <td>{ empleado.apellidos }</td>
                                            <td>{ empleado.telefono }</td>
                                            <td>{ moment( empleado.fecha_contrato )
                                                .format( "DD/MM/YYYY" ) }</td>
                                            <td>{ empleado.estado }</td>
                                            <td className="btn-actions">
                                                <div className="wrapper">
                                                    <a className="btnEditar"
                                                        /*onClick={ () => this.actionsUpdate( cliente.id ) }*/>
                                                        <i><FontAwesomeIcon icon={ faPen } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a href={ window.location.pathname } className="btnEliminar"
                                                        /*onClick={ () => this.eliminarCliente( cliente.id ) }*/>
                                                        <i><FontAwesomeIcon icon={ faTrash } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a className="btnVer"
                                                        /*onClick={ () => this.actionVerInfo( cliente.id ) }*/>
                                                        <i><FontAwesomeIcon icon={ faInfo } className="iconFont"/></i>
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

export default ListarEmpleado