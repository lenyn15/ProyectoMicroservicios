import "./style/componentClient.scss"
import React, { Component } from "react";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faInfoCircle }     from "@fortawesome/free-solid-svg-icons"
import { faFolder }         from "@fortawesome/free-solid-svg-icons"

class ComponenteCliente extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="container-titulo">
                    <h2>MENÚ</h2>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="box registro">
                            <div className="content">
                                <h2>01</h2>
                                <h3>Registro</h3>
                                <br/>
                                <p>
                                    Acceso al registro de los clientes, además de poder agregar nuevos
                                </p>
                                <br/>
                                <div className="nav_btn">
                                    <i className="icon_options"><FontAwesomeIcon icon={ faFolder }/></i>
                                    <a href={ "/view-clientes" } className="btn_acceso btn_R">
                                        <span/>
                                        <span/>
                                        <span/>
                                        <span/>
                                        Acceder
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="box detalle">
                            <div className="content">
                                <h2>02</h2>
                                <h3>Detalles</h3>
                                <br/>
                                <p>
                                    Visualización detallada de los clientes registrados
                                </p>
                                <br/>
                                <div className="nav_btn">
                                    <i className="icon_options"><FontAwesomeIcon icon={ faInfoCircle }/></i>
                                    <a href={ "/view-detalles" } className="btn_acceso btn_D">
                                        <span/>
                                        <span/>
                                        <span/>
                                        <span/>
                                        Acceder
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComponenteCliente;