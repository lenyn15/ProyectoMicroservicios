import './App.css';
import Menu                               from "./menuOpciones/menu";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Menu/>
            </Router>
        </div>
    );
}

export default App;
