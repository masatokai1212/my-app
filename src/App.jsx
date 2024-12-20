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

<<<<<<< HEAD
        <Switch>
          <Route path="/mansion" component={Mansion} />
          <Route path="/house" component={House} />
          <Route path="/land" component={Land} />
          <Route path="/" exact component={() => <div>ホームページ</div>} />
          <Route component={() => <div>Page Not Found</div>} />
        </Switch>
      </div>
    </Router>
=======
        <div className="form-section">
          <h2 className="section-title">その他ご要望</h2>
          <textarea
            name="message"
            className="textarea"
            rows="4"
          ></textarea>
        </div>

        <div className="button-group">
          <button
            type="button"
            className={`option-button ${selectedOption === 'LINE返信' ? 'selected' : ''}`}
            onClick={() => handleOptionChange('LINE返信')}
          >
            LINE返信
          </button>
          <button
            type="button"
            className={`option-button ${selectedOption === 'LINE通話' ? 'selected' : ''}`}
            onClick={() => handleOptionChange('LINE通話')}
          >
            LINE通話
          </button>
          <button
            type="button"
            className={`option-button ${selectedOption === 'ご来店' ? 'selected' : ''}`}
            onClick={() => handleOptionChange('ご来店')}
          >
            ご来店
          </button>
        </div>

        {propertyType === "マンション" && <MansionForm />}
        {propertyType === "一戸建" && <HouseForm />}
        {propertyType === "土地" && <LandForm />}

        <button type="submit" className="submit-button">送信</button>
      </form>
    </div>
>>>>>>> ffd2acfbb69484af9b8286eb1e30f4c915b0c009
  );
}

export default App;