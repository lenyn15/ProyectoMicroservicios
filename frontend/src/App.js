import './App.css';
import Menu                               from "./menuOpciones/menu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ComponenteCliente                  from "./ClienteComponent/ComponenteCliente";
import ListarCliente                      from "./ClienteComponent/ListarCliente";
import ListarDetalles                     from "./ClienteComponent/ListarDetalles";

function App() {
    return (
        <div>
            <Router>
                <Menu/>
                <div className="components">
                    <Route path="/component-clientes" exact component={ ComponenteCliente }/>
                    <Route path="/view-clientes" exact component={ ListarCliente }/>
                    <Route path="/view-detalles" exact component={ ListarDetalles }/>
                </div>
            </Router>
        </div>
    );
}

export default App;
