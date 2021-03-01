import "../ClienteComponent/style/ListarTipo.scss"
import "./style/ListarEmpleado.scss"
import React, { Component }    from "react";
import EmpleadoService         from "./service/EmpleadoService";
import { FontAwesomeIcon }     from "@fortawesome/react-fontawesome";
import { faPen, faSearch }     from "@fortawesome/free-solid-svg-icons";
import { faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalFooter }  from "reactstrap";
import { ModalBody }           from "reactstrap";
import moment                  from 'moment';

class ListarEmpleado extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            empleados : [],
            nombres : '',
            apellidos : '',
            telefono : '',
            estado : '',
            fechaContrato : '',

            idEMPLEADO : '',
            modalAbierto : false,
            isEditar : false
        }

        this.abrirModal = this["abrirModal"].bind( this );
        this.actionsUpdate = this["actionsUpdate"].bind( this );
        this.actionsNew = this["actionsNew"].bind( this );
        this.chooseMethod = this["chooseMethod"].bind( this );

        this.changeNombre = this["changeNombre"].bind( this );
        this.changeApellido = this["changeApellido"].bind( this );
        this.changeTelefono = this["changeTelefono"].bind( this );
        this.changeEstado = this.changeEstado.bind( this );
        this.changeFechaContrato = this.changeFechaContrato.bind( this );
    }

    componentDidMount() {
        EmpleadoService.mostrarEmpleado()
                       .then( listaE => {
                           this.setState( { empleados : listaE.data } )
                       } )
    }

    chooseMethod( e ) {
        e.preventDefault()
        let Empleado = {
            id : null,
            nombres : this.state.nombres,
            apellidos : this.state.apellidos,
            telefono : this.state.telefono,
            estado : this.state.estado,
            fecha_contrato : this.state.fechaContrato
        }
        if ( this.state.isEditar ) {
            Empleado.id = this.state.idEMPLEADO
            EmpleadoService.actualizarEmpleado( Empleado )
                           .then( () => {
                               window.location.reload()
                           } )
        } else {
            EmpleadoService.crearEmpleado( Empleado )
                           .then( () => {
                               window.location.reload()
                           } )
        }
    }

    changeNombre = ( event ) => {
        this.setState( { nombres : event.target.value } )
    }

    changeApellido = ( event ) => {
        this.setState( { apellidos : event.target.value } )
    }

    changeTelefono = ( event ) => {
        this.setState( { telefono : event.target.value } )
    }

    changeEstado = ( event ) => {
        this.setState( { estado : event.target.value } )
    }

    changeFechaContrato = ( event ) => {
        this.setState( { fechaContrato : event.target.value } )
    }

    actionsNew() {
        this.abrirModal();
        this.setState( {
            nombres : '',
            apellidos : '',
            telefono : '',
            estado : '',
            fechaContrato : ''
        } )
        this.state.isEditar = false
    }

    actionsUpdate( id_EMPLEADO ) {
        this.setState( {
            isEditar : true
        } )
        this.abrirModal();
        this.state.idEMPLEADO = id_EMPLEADO;
        EmpleadoService.buscarEmpleadoporID( id_EMPLEADO )
                       .then( ( resultado ) => {
                           let empleadoSelect = resultado.data;
                           this.setState( {
                               nombres : empleadoSelect.nombres,
                               apellidos : empleadoSelect.apellidos,
                               telefono : empleadoSelect.telefono,
                               estado : empleadoSelect.estado,
                               fechaContrato : empleadoSelect.fecha_contrato
                           } )
                       } )
    }

    abrirModal() {
        this.setState( { modalAbierto : !this.state.modalAbierto } )
    }

    getTitulo() {
        if ( this.state.isEditar ) {
            return <h2>Modificar Empleado</h2>
        } else {
            return <h2>Nuevo Empleado</h2>
        }
    }

    eliminarEmpleado( id ) {
        EmpleadoService.eliminarEmpleado( id )
                       .then( () => {
                           this.setState( {
                               empleados : this.state.empleados.filter(
                                   empleado => empleado.id !== id )
                           } )
                       } )
    }

    render() {
        return (
            <div>

                {/*========================= Ventana Modal para registrar o modificar datos ================================*/ }
                { this.state.modalAbierto ? <div onClick={ this.abrirModal } className="back-drop"/> : null }
                <Modal modalClassName="modal-wrapperE" isOpen={ this.state.modalAbierto }
                       style={ {
                           opacity : this.state.modalAbierto ? '1' : '0',
                       } }>
                    <ModalBody className="modal-body">
                        <div className="modal-header">
                            { this.getTitulo() }
                        </div>
                        <form className="form">
                            <input type="text" name="nombres" value={ this.state.nombres }
                                   onChange={ this.changeNombre }
                                   required/>
                            <label className="lbl">
                                            <span className="txt">
                                                Nombres
                                            </span>
                            </label>
                        </form>
                        <form className="form">
                            <input type="text" name="apellidos" value={ this.state.apellidos }
                                   onChange={ this.changeApellido }
                                   required/>
                            <label className="lbl">
                                            <span className="txt">
                                                Apellidos
                                            </span>
                            </label>
                        </form>
                        <form className="form">
                            <input type="text" name="apellidos" value={ this.state.telefono }
                                   onChange={ this.changeTelefono }
                                   required/>
                            <label className="lbl">
                                            <span className="txt">
                                                Telefono
                                            </span>
                            </label>
                        </form>
                        <form className="form">
                            <input type="text" name="estado" value={ this.state.estado }
                                   onChange={ this.changeEstado }
                                   required/>
                            <label className="lbl">
                                            <span className="txt">
                                                Estado
                                            </span>
                            </label>
                        </form>
                        <form className="form">
                            <input className="input-dater" type="date" name="fechaR" value={ this.state.fechaContrato }
                                   onChange={ this.changeFechaContrato }/>
                            <label className="lbl dateR">
                                            <span className="txt">
                                                Fecha de contrato
                                            </span>
                            </label>
                        </form>
                    </ModalBody>
                    <ModalFooter className="modal-footer">
                        <a className="btn-guardar" onClick={ this.chooseMethod }>
                            Guardar
                        </a>
                        <a className="btn-cancelar" onClick={ this.abrirModal }>
                            Cancelar
                        </a>
                    </ModalFooter>
                </Modal>

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
                            <a className="add-btn btnNew" onClick={ this.actionsNew }>
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
                                                       onClick={ () => this.actionsUpdate( empleado.id ) }>
                                                        <i><FontAwesomeIcon icon={ faPen } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a href={ window.location.pathname } className="btnEliminar"
                                                       onClick={ () => this.eliminarEmpleado( empleado.id ) }>
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

export default ListarEmpleado