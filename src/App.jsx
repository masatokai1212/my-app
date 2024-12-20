import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mansion from "./components/Mansion";
import House from "./components/House";
import Land from "./components/Land";
import "./App.css";
import MansionForm from "./components/MansionForm";
import HouseForm from "./components/HouseForm";
import LandForm from "./components/LandForm";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>不動産情報</h1>
        <button onClick={() => window.location.href = "/mansion"}>マンション</button>
        <button onClick={() => window.location.href = "/house"}>一戸建</button>
        <button onClick={() => window.location.href = "/land"}>土地</button>

        <Switch>
          <Route path="/mansion" component={Mansion} />
          <Route path="/house" component={House} />
          <Route path="/land" component={Land} />
          <Route path="/" exact component={() => <div>ホームページ</div>} />
          <Route component={() => <div>Page Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;