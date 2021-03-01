import "./menu.scss"
import Logo                            from "./Assets/logo.png"
import React, { Component }            from "react";
import { FontAwesomeIcon }             from "@fortawesome/react-fontawesome";
import { faBriefcase, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faStore, faUser }             from "@fortawesome/free-solid-svg-icons";

class Menu extends Component {
    constructor( props ) {
        super( props );
        this.state = {}
    }

    render() {
        return (
            <div className="l-navbar" id="navbar">
                <nav className="nav">
                    <div>
                        <div className="nav__logo">
                            <i className="icon"><img src={ Logo } alt="logo"/></i>
                            <span className="nav__logo-text">Libreria Sidecom</span>
                        </div>
                        <ul className="nav__list">
                            <a href={ "/service-ventas" } className="nav__link">
                                <i className="nav__icon"><FontAwesomeIcon icon={ faStore }/></i>
                                <span className="nav__text">Ventas</span>
                            </a>

                            <a href={ "/product-list" } className="nav__link">
                                <i className="nav__icon"><FontAwesomeIcon icon={ faShoppingCart }/></i>
                                <span className="nav__text">Productos</span>
                            </a>

                            <a href={ "/employees-list" } className="nav__link">
                                <i className="nav__icon"><FontAwesomeIcon icon={ faBriefcase }/></i>
                                <span className="nav__text">Empleados</span>
                            </a>

                            <a href={ "/component-clientes" } className="nav__link">
                                <i className="nav__icon"><FontAwesomeIcon icon={ faUser }/></i>
                                <span className="nav__text">Clientes</span>
                            </a>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Menu