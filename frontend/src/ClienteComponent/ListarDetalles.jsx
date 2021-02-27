import "./style/ListarDetalle.scss"
import "./style/ListarTipo.scss"
import React, { Component }      from "react";
import ClienteService            from "./service/ClienteService";
import TipoService               from "./service/TipoService";
import { FontAwesomeIcon }       from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserTie }             from "@fortawesome/free-solid-svg-icons";
import moment                    from "moment";

class ListarDetalles extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            clientes : [],
            tipos : [],

            IDtipoSelect : 1,
            lblTipo : ''
        }

        this.filtrarDatos = this.filtrarDatos.bind( this );
        this.optionSelected = this.optionSelected.bind( this );
    }

    componentDidMount() {
        TipoService.mostrarTipos()
                   .then( listaT => {
                       this.setState( { tipos : listaT.data } )
                   } )
        this.filtrarDatos();
    }

    filtrarDatos() {
        this.setLblTipo( this.state.IDtipoSelect )
        ClienteService.listarPorTipo( this.state.IDtipoSelect )
                      .then( listaC => {
                          this.setState( { clientes : listaC.data } )
                      } )
    }

    setLblTipo( idT ) {
        this.state.lblTipo = idT - 1 === 1 ? 'RUC: ' : 'DNI: '
    }

    optionSelected = ( event ) => {
        this.setState( { IDtipoSelect : event.target.value } )
    }

    render() {
        return (
            <div>
                <br/>
                <div className="title-details">
                    <h2 className="title-main">Detalles de los clientes</h2>
                </div>
                <div className="container-main-viewC">
                    <div className="search-list">
                        <div className="dropdown-viewC">
                            <select className="dropdown-list-viewC" value={ this.state.IDtipoSelect }
                                    onChange={ this.optionSelected } onClick={ this.filtrarDatos }>
                                { this.state.tipos.map(
                                    TIPO =>
                                        <option key={ TIPO.id } value={ TIPO.id }>
                                            { TIPO.tipo }
                                        </option>
                                ) }
                            </select>
                            <span className="custom-arrow-viewC">
                                    <FontAwesomeIcon icon={ faCaretDown }/>
                            </span>
                        </div>
                        <div className="search-viewC">
                            <input className="search-txt_viewC" type="text" placeholder="Buscar por nombre"/>
                            <a className="search-btn_viewC">
                                <i><FontAwesomeIcon icon={ faSearch }/></i>
                            </a>
                        </div>
                    </div>
                    <br/>
                    <div>{
                        this.state.clientes.map(
                            CLIENTE =>
                                <did key={ CLIENTE.id }>
                                    <div className="card-box">
                                        <div className="card-client">
                                            <i className="card-client-icon"><FontAwesomeIcon icon={ faUserTie }/></i>
                                            <h2 className="card-client-title">Cliente</h2>
                                            { CLIENTE.descripcion }
                                        </div>
                                        <div className="card-info">
                                            <div className="content-body1">
                                                <div>
                                                    <label className="lbl-viewC">
                                                        Tipo:
                                                    </label>
                                                    <div className="result-tipo">{ CLIENTE.tipo.tipo }</div>
                                                </div>
                                                <div>
                                                    <label className="lbl-viewC">
                                                        { this.state.lblTipo }
                                                    </label>
                                                    <div className="result-code">{ CLIENTE.codigo }</div>
                                                </div>
                                            </div>
                                            <div className="content-body2">
                                                <div className="cdate">
                                                    <label className="lbl-viewC2 dateR">
                                                        Fecha de Registro:
                                                    </label>
                                                    <div className="result-date">{ moment( CLIENTE.fecha_registro )
                                                        .format( "DD/MM/YYYY" ) }</div>
                                                </div>
                                                <div>
                                                    <label className="lbl-viewC2">
                                                        Estado:
                                                    </label>
                                                    <div className="result-state">{ CLIENTE.estado }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-sales">
                                            <div>
                                                <h3 className="card-sales-title">Detalles generales de sus compras</h3>
                                            </div>
                                            <table className="table-details">
                                                <thead>
                                                <tr className="table-cabecera table-details">
                                                    <th className="title-table">Fecha de compra</th>
                                                    <th className="title-table">Monto total</th>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </did>
                        )
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default ListarDetalles