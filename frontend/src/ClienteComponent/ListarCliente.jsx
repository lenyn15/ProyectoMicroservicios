import "./style/ListarCliente.scss"
import "./style/ListarTipo.scss"
import React, { Component }         from "react";
import ClienteService               from "./service/ClienteService";
import TipoService                  from "./service/TipoService";
import { FontAwesomeIcon }          from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faUserPlus, faInfo }       from "@fortawesome/free-solid-svg-icons"
import { faCaretDown }              from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalFooter }       from "reactstrap";
import { ModalBody }                from "reactstrap";
import moment                       from 'moment';

class ListarClientes extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            clientes : [],
            tipos : [],
            nombre : '',
            codigo : '',
            estado : '',
            fechaR : '',
            tipoC : '',

            idCLIENTE : '',
            IDtipoSelect : '1',
            lblTipo : '',
            modalAbierto : false,
            modalInfo : false,
            isEditar : false
        }

        this.abrirModal = this["abrirModal"].bind( this );
        this.abrirVInfo = this["abrirVInfo"].bind( this );
        this.actionsUpdate = this["actionsUpdate"].bind( this );
        this.actionVerInfo = this["actionVerInfo"].bind( this );
        this.actionsNew = this["actionsNew"].bind( this );
        this.chooseMethod = this["chooseMethod"].bind( this );

        this.optionSelected = this["optionSelected"].bind( this );
        this.changeNombre = this["changeNombre"].bind( this );
        this.changeCodigo = this.changeCodigo.bind( this );
        this.changeEstado = this.changeEstado.bind( this );
        this.changeFechaR = this.changeFechaR.bind( this );
        this.eliminarCliente = this.eliminarCliente.bind( this );
    }

    componentDidMount() {
        ClienteService.mostrarCliente()
                      .then( listaC => {
                          this.setState( { clientes : listaC.data } )
                      } )
        TipoService.mostrarTipos()
                   .then( listaT => {
                       this.setState( { tipos : listaT.data } )
                   } )
    }

    chooseMethod( e ) {
        e.preventDefault()
        let Cliente = {
            id : null,
            descripcion : this.state.nombre,
            codigo : this.state.codigo,
            estado : this.state.estado,
            fecha_registro : this.state.fechaR,
            tipo : {
                id : this.state.IDtipoSelect
            }
        }
        if ( this.state.isEditar ) {
            Cliente.id = this.state.idCLIENTE
            ClienteService.actualizarCliente( Cliente )
                          .then( () => {
                              window.location.reload()
                          } )
        } else {
            ClienteService.crearCliente( Cliente )
                          .then( () => {
                              window.location.reload()
                          } )
        }
    }

    abrirModal() {
        this.setState( { modalAbierto : !this.state.modalAbierto } )
    }

    abrirVInfo() {
        this.setState( { modalInfo : !this.state.modalInfo } )
    }

    actionsNew() {
        this.abrirModal();
        this.setState( {
            nombre : '',
            codigo : '',
            estado : '',
            fechaR : '',
            IDtipoSelect : '1'
        } )
        this.state.isEditar = false
    }

    actionsUpdate( id_CLIENTE ) {
        this.setState( {
            isEditar : true
        } )
        this.abrirModal();
        this.state.idCLIENTE = id_CLIENTE;
        ClienteService.buscarClienteporID( id_CLIENTE )
                      .then( ( resultado ) => {
                          let clienteSelect = resultado.data;
                          this.setState( {
                              nombre : clienteSelect.descripcion,
                              codigo : clienteSelect.codigo,
                              estado : clienteSelect.estado,
                              fechaR : clienteSelect.fecha_registro,
                              IDtipoSelect : clienteSelect.tipo.id
                          } )
                      } )

    }

    actionVerInfo( ID_Cliente ) {
        this.abrirVInfo();
        ClienteService.buscarClienteporID( ID_Cliente )
                      .then( ( resultado ) => {
                          let clienteSelect = resultado.data;
                          this.setLblTipo( clienteSelect.tipo.id )
                          this.setState( {
                              nombre : clienteSelect.descripcion,
                              codigo : clienteSelect.codigo,
                              estado : clienteSelect.estado,
                              fechaR : clienteSelect.fecha_registro,
                              tipoC : clienteSelect.tipo.tipo
                          } )
                      } )
    }

    setLblTipo( idT ) {
        this.state.lblTipo = idT === 1 ? 'DNI: ' : 'RUC: '
    }

    optionSelected = ( event ) => {
        this.setState( { IDtipoSelect : event.target.value } )
    }

    changeNombre = ( event ) => {
        this.setState( { nombre : event.target.value } )
    }

    changeCodigo = ( event ) => {
        this.setState( { codigo : event.target.value } )
    }

    changeEstado = ( event ) => {
        this.setState( { estado : event.target.value } )
    }

    changeFechaR = ( event ) => {
        this.setState( { fechaR : event.target.value } )
    }

    getTitulo() {
        if ( this.state.isEditar ) {
            return <h2>Modificar Cliente</h2>
        } else {
            return <h2>Nuevo Cliente</h2>
        }
    }

    eliminarCliente( id ) {
        ClienteService.eliminarCliente( id )
                      .then( () => {
                          this.setState( {
                              clientes : this.state.clientes.filter(
                                  cliente => cliente.id !== id )
                          } )
                      } )
    }

    render() {
        return (
            <div>

                {/*========================= Ventana Modal para registrar o modificar datos ================================*/ }
                { this.state.modalAbierto ? <div onClick={ this.abrirModal } className="back-drop"/> : null }
                { this.state.modalInfo ? <div onClick={ this.abrirVInfo } className="back-drop"/> : null }
                <Modal modalClassName="modal-wrapper" isOpen={ this.state.modalAbierto }
                       style={ {
                           opacity : this.state.modalAbierto ? '1' : '0',
                       } }>
                    <ModalBody className="modal-body">
                        <div className="modal-header">
                            { this.getTitulo() }
                            <div className="dropdown">
                                <select className="dropdown-list" value={ this.state.IDtipoSelect }
                                        onChange={ this.optionSelected }>
                                    { this.state.tipos.map(
                                        TIPO =>
                                            <option key={ TIPO.id } value={ TIPO.id }
                                                    className="dropdown-list__item">
                                                { TIPO.tipo }
                                            </option>
                                    ) }
                                </select>
                                <span className="custom-arrow">
                                    <FontAwesomeIcon icon={ faCaretDown }/>
                                </span>
                            </div>
                        </div>
                        <form className="form">
                            <input type="text" name="nombre" value={ this.state.nombre }
                                   onChange={ this.changeNombre }
                                   required/>
                            <label className="lbl">
                                            <span className="txt">
                                                Nombre
                                            </span>
                            </label>
                        </form>
                        <form className="form">
                            <input type="text" name="codigo" value={ this.state.codigo }
                                   onChange={ this.changeCodigo }
                                   required/>
                            <label className="lbl">
                                            <span className="txt">
                                                DNI/RUC
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
                            <input className="input-dater" type="date" name="fechaR" value={ this.state.fechaR }
                                   onChange={ this.changeFechaR }/>
                            <label className="lbl dateR">
                                            <span className="txt">
                                                Fecha de registro
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
                {/*========================================================================================================*/ }

                <br/>
                <div className="listClient_Title">
                    <h2 className="title_listC">Registro de Clientes</h2>
                </div>
                <div className="container_listaC">

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
                                Nuevo Cliente
                            </a>
                        </div>
                    </div>
                    <br/>
                    {/*============================================================================================*/ }

                    {/*============================= Tabla con datos de los clientes =============================*/ }
                    <div className="box-tabla">
                        <table className="table-clientes">
                            <thead>
                            <tr className="table-cabecera">
                                <th>Nombre</th>
                                <th>DNI/RUC</th>
                                <th>Estado</th>
                                <th>Fecha de Registro</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>{
                                this.state.clientes.map(
                                    cliente =>
                                        <tr key={ cliente.id }>
                                            <td>{ cliente.descripcion }</td>
                                            <td>{ cliente.codigo }</td>
                                            <td>{ cliente.estado }</td>
                                            <td>{ moment( cliente.fecha_registro )
                                                .format( "DD/MM/YYYY" ) }</td>
                                            <td className="btn-actions">
                                                <div className="wrapper">
                                                    <a className="btnEditar"
                                                       onClick={ () => this.actionsUpdate( cliente.id ) }>
                                                        <i><FontAwesomeIcon icon={ faPen } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a href={ "/view-clientes" } className="btnEliminar"
                                                       onClick={ () => this.eliminarCliente( cliente.id ) }>
                                                        <i><FontAwesomeIcon icon={ faTrash } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a className="btnVer"
                                                       onClick={ () => this.actionVerInfo( cliente.id ) }>
                                                        <i><FontAwesomeIcon icon={ faInfo } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                )
                            }</tbody>
                        </table>
                        <br/>
                    </div>
                    {/*=====================================================================================================*/ }

                    {/*========================= Ventan Modal para ver informacion del cliente ==============================*/ }
                    <Modal modalClassName="modal-wrapper2" isOpen={ this.state.modalInfo }
                           style={ {
                               opacity : this.state.modalInfo ? '1' : '0',
                           } }>
                        <ModalBody>
                            <div className="container-view">
                                <div className="title-client">
                                    <h2 className="title">Cliente: { this.state.nombre }</h2>
                                </div>
                                <div className="content-body1">
                                    <div>
                                        <label className="lbl-viewC">
                                            Tipo:
                                        </label>
                                        <div className="result-tipo">{ this.state.tipoC }</div>
                                    </div>
                                    <div>
                                        <label className="lbl-viewC">
                                            { this.state.lblTipo }
                                        </label>
                                        <div className="result-code">{ this.state.codigo }</div>
                                    </div>
                                </div>
                                <div className="content-body2">
                                    <div className="cdate">
                                        <label className="lbl-viewC2 dateR">
                                            Fecha de Registro:
                                        </label>
                                        <div className="result-date">{ moment( this.state.fechaR )
                                            .format( "DD/MM/YYYY" ) }</div>
                                    </div>
                                    <div>
                                        <label className="lbl-viewC2">
                                            Estado:
                                        </label>
                                        <div className="result-state">{ this.state.estado }</div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ListarClientes