import "./styles/ListarProducto.scss"
import React, { Component }    from "react";
import ProductoService         from "./service/ProductoService";
import { FontAwesomeIcon }     from "@fortawesome/react-fontawesome";
import { faBoxOpen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPen, faTrash }      from "@fortawesome/free-solid-svg-icons";

class ListarProductos extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            productos : [],

            valueSelected : 'porNombre',
            lblPH : 'Buscar por Nombre'
        }

        this.searchSelected = this.searchSelected.bind( this );

        this.agregarProducto = this.agregarProducto.bind( this );
        this.editarProducto = this.editarProducto.bind( this );
    }

    componentDidMount() {
        ProductoService.mostrarProductos()
                       .then( listaP => {
                           this.setState( { productos : listaP.data } )
                       } )
    }

    agregarProducto() {
        this.props.history.push( "/registro-producto/agregar" )
    }

    editarProducto( IDproducto ) {
        this.props.history.push( "/registro-producto/" + IDproducto )
    }

    eliminarProduct( id ) {
        ProductoService.eliminarProducto( id )
                       .then( () => {
                           this.setState( {
                               productos : this.state.productos.filter(
                                   producto => producto.id !== id )
                           } )
                       } )
    }

    searchSelected = ( event ) => {
        this.setState( { valueSelected : event.target.value } )
    }

    getInput() {
        switch (this.state.valueSelected) {
            case "porNombre":
                return <input className="input" type="text" placeholder="Buscar por Nombre"/>
            case "porCategoria":
                return <input className="input" type="text" placeholder="Buscar por Categoria"/>
            default:
                return <input className="input" type="text" placeholder="Buscar por Marca"/>
        }
    }

    render() {
        return (
            <div>
                {/*=========================================================*/ }
                <br/>
                <div className="listProduct_Title">
                    <h2 className="title_listP">Lista de Productos</h2>
                </div>
                {/*=========================================================*/ }

                {/*================== Lista de productos ===================*/ }
                <div className="container_listaP">
                    <div className="box-nuevo">
                        <div className="box-add">
                            <a className="btn-add btnNew" onClick={ this.agregarProducto }>
                                <i className="icon-addBtn"><FontAwesomeIcon icon={ faBoxOpen }/></i>
                                Nuevo Producto
                            </a>
                        </div>
                        <div className="wrapper-search">
                            <div className="box_search">
                                <div className="dropdown-busqueda">
                                    <select className="options-search" value={ this.state.valueSelected }
                                            onChange={ this.searchSelected }>
                                        <option className="option-S" value="porNombre">Nombre</option>
                                        <option className="option-S" value="porCategoria">Categoria</option>
                                        <option className="option-S" value="porMarca">Marca</option>
                                    </select>
                                </div>
                                <div className="search_field">
                                    { this.getInput() }
                                    <i className="icon-lupa"><FontAwesomeIcon icon={ faSearch }/></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box-tabla">
                        <table className="table-productos">
                            <thead>
                            <tr className="tabla-cabecera">
                                <th className="Ttabla">Categoria</th>
                                <th className="Ttabla">Marca</th>
                                <th className="Ttabla">Nombre</th>
                                <th className="Ttabla">Precio de Compra</th>
                                <th className="Ttabla">Precio de Venta</th>
                                <th className="Ttabla">Cantidad</th>
                                <th className="Ttabla">Estado</th>
                                <th className="Ttabla">Acciones</th>
                            </tr>
                            </thead>
                            <tbody>{
                                this.state.productos.map(
                                    producto =>
                                        <tr key={ producto.id }>
                                            <td>{ producto.categoria.nombre }</td>
                                            <td>{ producto.marca.nombre }</td>
                                            <td>{ producto.nombre }</td>
                                            <td>{ producto.precioCompra }</td>
                                            <td>{ producto.precioVenta }</td>
                                            <td>{ producto.cantidad }</td>
                                            <td>{ producto.estado }</td>
                                            <td>
                                                <div className="wrapper">
                                                    <a className="btnEditar"
                                                       onClick={ () => this.editarProducto( producto.id ) }>
                                                        <i><FontAwesomeIcon icon={ faPen } className="iconFont"/></i>
                                                    </a>
                                                </div>
                                                <div className="wrapper">
                                                    <a href={ "/product-list" } className="btnEliminar"
                                                       onClick={ () => this.eliminarProduct( producto.id ) }>
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

export default ListarProductos