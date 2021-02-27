import "./styles/RegistrarProducto.scss"
import React, { Component }         from "react";
import ProductoService              from "./service/ProductoService";
import MarcaService                 from "./service/MarcaService";
import CategoriaService             from "./service/CategoriaService";
import { FontAwesomeIcon }          from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

class RegistrarProductos extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            categorias : [],
            marcas : [],

            id : this.props.match.params.id,
            nombre : '',
            precioC : '',
            precioV : '',
            cantidad : '',
            estado : '',

            categoriaId : '',
            marcaId : '',

            categoriaNombre : '',
            categoriaNombreE : '',
            marcaNombre : '',
            marcaNombreE : '',

            selectedOptionC : '',
            selectedOptionM : ''
        }

        this.chooseMethod = this["chooseMethod"].bind( this );
        this.changeNombreHandler = this["changeNombreHandler"].bind( this );
        this.changeCantidadHandler = this["changeCantidadHandler"].bind( this );
        this.changePrecioVHandler = this["changePrecioVHandler"].bind( this );
        this.changePrecioCHandler = this["changePrecioCHandler"].bind( this );
        this.changeEstadoHandler = this["changeEstadoHandler"].bind( this );

        this.onChangeValueC = this.onChangeValueC.bind( this );

        this.handleActionsC = this.handleActionsC.bind( this );
        this.chooseMethodC = this.chooseMethodC.bind( this );
        this.eliminarCategoria = this.eliminarCategoria.bind( this );
        this.changeNombreCHandler = this.changeNombreCHandler.bind( this );

        this.handleActionsM = this.handleActionsM.bind( this );
        this.chooseMethodM = this.chooseMethodM.bind( this );
        this.eliminarMarca = this.eliminarMarca.bind( this );
        this.changeNombreMHandler = this.changeNombreMHandler.bind( this );
    }

    componentDidMount() {
        CategoriaService.mostrarCategorias()
                        .then( listaCat => {
                            this.setState( { categorias : listaCat.data } )
                        } )
        MarcaService.mostrarMarcas()
                    .then( listaM => {
                        this.setState( { marcas : listaM.data } )
                    } )
        if ( !(this.state.id === "agregar") ) {
            ProductoService.buscarProductoPorID( this.state.id )
                           .then( ( result ) => {
                               let Producto = result.data;
                               this.setState( {
                                   nombre : Producto.nombre,
                                   cantidad : Producto.cantidad,
                                   precioV : Producto.precioVenta,
                                   precioC : Producto.precioCompra,
                                   categoriaNombre : Producto.categoria.nombre,
                                   selectedOptionC : Producto.categoria.id,
                                   marcaNombre : Producto.marca.nombre,
                                   selectedOptionM : Producto.marca.id,
                                   estado : Producto.estado
                               } )
                           } )
        }
    }

    chooseMethod = ( e ) => {
        e.preventDefault()
        let Producto = {
            id : null,
            nombre : this.state.nombre,
            precioCompra : this.state.precioC,
            precioVenta : this.state.precioV,
            cantidad : this.state.cantidad,
            estado : this.state.estado,
            categoria : {
                id : this.state.selectedOptionC
            },
            marca : {
                id : this.state.selectedOptionM
            }
        }
        if ( this.state.id === "agregar" ) {
            ProductoService.crearProducto( Producto )
                           .then( () => {
                               this.props.history.push( "/product-list" )
                           } )
        } else {
            Producto.id = this.state.id
            ProductoService.actualizaProducto( Producto )
                           .then( () => {
                               this.props.history.push( "/product-list" )
                           } )
        }
    }

    changeNombreHandler = ( event ) => {
        this.setState( { nombre : event.target.value } )
    }

    changeCantidadHandler = ( event ) => {
        this.setState( { cantidad : event.target.value } )
    }

    changePrecioVHandler = ( event ) => {
        this.setState( { precioV : event.target.value } )
    }

    changePrecioCHandler = ( event ) => {
        this.setState( { precioC : event.target.value } )
    }

    changeEstadoHandler = ( event ) => {
        this.setState( { estado : event.target.value } )
    }

    handleActionsC( IDC ) {
        this.state.categoriaId = IDC;
        CategoriaService.buscarCategoriaPorID( IDC )
                        .then( ( result ) => {
                            let categoriaSelected = result.data
                            this.setState( {
                                categoriaNombreE : categoriaSelected.nombre
                            } )
                        } )
        console.log( this.state.categoriaNombreE )
    }

    chooseMethodC = ( e ) => {
        e.preventDefault()
        let Categoria = {
            id : null,
            nombre : this.state.categoriaNombreE
        }
        if ( this.state.categoriaId === '' ) {
            CategoriaService.crearCategoria( Categoria )
                            .then( () => {
                                window.location.reload();
                            } )
        } else {
            Categoria.id = this.state.categoriaId
            CategoriaService.actualizarCategoria( Categoria )
                            .then( () => {
                                window.location.reload();
                            } )
        }
    }

    eliminarCategoria( id ) {
        CategoriaService.eliminarCategoria( id )
                        .then( () => {
                            this.setState( {
                                categorias : this.state.categorias.filter(
                                    categoria => categoria.id !== id )
                            } )
                        } )
    }

    changeNombreCHandler = ( event ) => {
        this.setState( { categoriaNombreE : event.target.value } )
    }

    handleActionsM( IDM ) {
        this.state.marcaId = IDM;
        MarcaService.buscarMarcaPorID( IDM )
                    .then( ( result ) => {
                        let marcaSelected = result.data
                        this.setState( {
                            marcaNombreE : marcaSelected.nombre
                        } )
                    } )
    }

    chooseMethodM = ( e ) => {
        e.preventDefault()
        let Marca = {
            id : null,
            nombre : this.state.marcaNombreE
        }
        if ( this.state.marcaId === '' ) {
            MarcaService.crearMarca( Marca )
                        .then( () => {
                            window.location.reload();
                        } )
        } else {
            Marca.id = this.state.marcaId
            MarcaService.actualizarMarca( Marca )
                        .then( () => {
                            window.location.reload();
                        } )
        }
    }

    eliminarMarca( id ) {
        MarcaService.eliminarMarca( id )
                    .then( () => {
                        this.setState( {
                            marcas : this.state.marcas.filter(
                                marca => marca.id !== id )
                        } )
                    } )
    }

    changeNombreMHandler = ( event ) => {
        this.setState( { marcaNombreE : event.target.value } )
    }

    getTitulo() {
        if ( !(this.state.id === "agregar") ) {
            return <h2 className="title_registerP">Modificar Producto</h2>
        } else {
            return <h2 className="title_registerP">Registrar Producto</h2>
        }
    }

    onChangeValueC = ( event ) => {
        this.state.selectedOptionC = event.target.value;
    }

    setCategoria( idCategoria ) {
        CategoriaService.buscarCategoriaPorID( idCategoria )
                        .then( ( result ) => {
                            let categoriaSelected = result.data
                            this.setState( {
                                categoriaNombre : categoriaSelected.nombre
                            } )
                        } )
    }

    onChangeValueM = ( event ) => {
        this.state.selectedOptionM = event.target.value;
    }

    setMarca( idMarca ) {
        MarcaService.buscarMarcaPorID( idMarca )
                    .then( ( result ) => {
                        let marcaSelected = result.data
                        this.setState( {
                            marcaNombre : marcaSelected.nombre
                        } )
                    } )
    }

    render() {
        return (
            <div>
                {/*=========================================================*/ }
                <br/>
                <div className="registerProduct_Title">
                    { this.getTitulo() }
                </div>
                {/*=========================================================*/ }
                <div className="container_registerP">
                    <div className="form_registerP">
                        <div className="container-form1">
                            <div className="form-part1">
                                <form className="form">
                                    <input type="text" name="nombre" value={ this.state.nombre }
                                           onChange={ this.changeNombreHandler }
                                           required/>
                                    <label className="lbl">
                                            <span className="txt">
                                                Nombre
                                            </span>
                                    </label>
                                </form>
                                <form className="form">
                                    <input type="number" name="cantidad" value={ this.state.cantidad }
                                           onChange={ this.changeCantidadHandler }
                                           required/>
                                    <label className="lbl">
                                            <span className="txt">
                                                Cantidad
                                            </span>
                                    </label>
                                </form>
                            </div>
                            <div className="form-part2">
                                <form className="form">
                                    <input type="text" name="nombre" value={ this.state.categoriaNombre }
                                           style={ { cursor : "default" } } required/>
                                    <label className="lbl">
                                            <span className="txt">
                                                Categoria
                                            </span>
                                    </label>
                                </form>
                                <form className="form">
                                    <input type="text" name="nombre" value={ this.state.marcaNombre }
                                           style={ { cursor : "default" } } required/>
                                    <label className="lbl">
                                            <span className="txt">
                                                Marca
                                            </span>
                                    </label>
                                </form>
                            </div>
                        </div>
                        <div>
                            <fieldset>
                                <legend className="legend-title">Precio</legend>
                                <div className="form-precio">
                                    <form className="form">
                                        <input type="number" name="cantidad" value={ this.state.precioV }
                                               onChange={ this.changePrecioVHandler }
                                               required/>
                                        <label className="lbl">
                                            <span className="txt">
                                                Venta
                                            </span>
                                        </label>
                                    </form>
                                    <form className="form compra">
                                        <input type="number" name="cantidad" value={ this.state.precioC }
                                               onChange={ this.changePrecioCHandler }
                                               required/>
                                        <label className="lbl">
                                            <span className="txt">
                                                Compra
                                            </span>
                                        </label>
                                    </form>
                                </div>
                            </fieldset>
                            <div className="container-estado">
                                <form className="form">
                                    <input type="text" name="nombre" value={ this.state.estado }
                                           onChange={ this.changeEstadoHandler }
                                           required/>
                                    <label className="lbl">
                                            <span className="txt">
                                                Estado
                                            </span>
                                    </label>
                                </form>
                            </div>
                        </div>
                        <div className="container-btns">
                            <a className="btn-guardar" onClick={ this.chooseMethod }>
                                Guardar
                            </a>
                            <a href={ "/product-list" } className="btn-cancelar">
                                Cancelar
                            </a>
                        </div>
                    </div>
                    <div className="container-listCM">
                        <div className="container-categoria">
                            <fieldset className="categoria-box">
                                <legend className="legend-title_C">Categoria</legend>
                                <div className="formulario-categoria">
                                    <form>
                                        <div className="field-categoria">
                                            <span/>
                                            <input type="text"
                                                   required
                                                   name="nombre"
                                                   placeholder="Nombre"
                                                   value={ this.state.categoriaNombreE }
                                                   onChange={ this.changeNombreCHandler }/>
                                        </div>
                                        <div className="field-catego space-categ">
                                            <a className="btn_guardar-categ" onClick={ this.chooseMethodC }>
                                                Guardar
                                            </a>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <div className="search-box"
                                         style={ {
                                             background : "white",
                                             marginBottom : "10px",
                                             marginTop : "-10px",
                                             width : "290px"
                                         } }>
                                        <input className="search-txt" type="text"
                                               style={ { color : "#12192c", fontWeight : "bolder" } }
                                               placeholder="Buscar Categoria"/>
                                        <a className="search-btn" style={ { width : "35px" } }>
                                            <i><FontAwesomeIcon icon={ faSearch }/></i>
                                        </a>
                                    </div>
                                    <div className="tabla-categorias">
                                        <thead>
                                        <tr>
                                            <th style={ { background : '#2361ab' } }/>
                                            <th className="title-P">Nombre</th>
                                            <th className="title-P">Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>{
                                            this.state.categorias.map(
                                                categoria =>
                                                    <tr key={ categoria.id } onChange={ this.onChangeValueC }>
                                                        <td><input className="checkbox" type="radio" name="categoria"
                                                                   defaultValue={ categoria.id }
                                                                   defaultChecked={ this.state.selectedOptionC === categoria.id }
                                                                   onClick={ () => this.setCategoria( categoria.id ) }
                                                        />
                                                        </td>
                                                        <td>{ categoria.nombre }</td>
                                                        <td>
                                                            <div className="wrapper">
                                                                <a className="btnEditar"
                                                                   onClick={ () => this.handleActionsC( categoria.id ) }>
                                                                    <i><FontAwesomeIcon icon={ faPen }
                                                                                        className="iconFont"/></i>
                                                                </a>
                                                            </div>
                                                            <div className="wrapper">
                                                                <a href={ window.location.pathname }
                                                                   className="btnEliminar"
                                                                   onClick={ () => this.eliminarCategoria( categoria.id ) }>
                                                                    <i><FontAwesomeIcon icon={ faTrash }
                                                                                        className="iconFont"/></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                            )
                                        }</tbody>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="container-marca">
                            <fieldset className="marca-box">
                                <legend className="legend-title_M">Marca</legend>
                                <div className="formulario-marca">
                                    <form>
                                        <div className="field-marca">
                                            <span/>
                                            <input type="text"
                                                   required
                                                   name="marcaNombreE"
                                                   placeholder="Nombre"
                                                   value={ this.state.marcaNombreE }
                                                   onChange={ this.changeNombreMHandler }/>
                                        </div>
                                        <div className="field-marc space-marca">
                                            <a className="btn_guardar-marca" onClick={ this.chooseMethodM }>
                                                Guardar
                                            </a>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <div className="search-box"
                                         style={ {
                                             background : "white",
                                             marginBottom : "10px",
                                             marginTop : "-10px",
                                             width : "290px"
                                         } }>
                                        <input className="search-txt" type="text"
                                               style={ { color : "#12192c", fontWeight : "bolder" } }
                                               placeholder="Buscar Marca"/>
                                        <a className="search-btn" style={ { width : "35px" } }>
                                            <i><FontAwesomeIcon icon={ faSearch }/></i>
                                        </a>
                                    </div>
                                    <div className="tabla-marcas">
                                        <thead>
                                        <tr>
                                            <th style={ { background : '#2361ab' } }/>
                                            <th className="title-P">Nombre</th>
                                            <th className="title-P">Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>{
                                            this.state.marcas.map(
                                                marca =>
                                                    <tr key={ marca.id } onChange={ this.onChangeValueM }>
                                                        <td><input className="checkbox" type="radio" name="marca"
                                                                   defaultValue={ marca.id }
                                                                   defaultChecked={ this.state.selectedOptionM === marca.id }
                                                                   onClick={ () => this.setMarca( marca.id ) }/>
                                                        </td>
                                                        <td>{ marca.nombre }</td>
                                                        <td>
                                                            <div className="wrapper">
                                                                <a className="btnEditar"
                                                                   onClick={ () => this.handleActionsM( marca.id ) }>
                                                                    <i><FontAwesomeIcon icon={ faPen }
                                                                                        className="iconFont"/></i>
                                                                </a>
                                                            </div>
                                                            <div className="wrapper">
                                                                <a href={ window.location.pathname }
                                                                   className="btnEliminar"
                                                                   onClick={ () => this.eliminarMarca( marca.id ) }>
                                                                    <i><FontAwesomeIcon icon={ faTrash }
                                                                                        className="iconFont"/></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                            )
                                        }</tbody>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrarProductos