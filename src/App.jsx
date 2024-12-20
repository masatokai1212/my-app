import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import MansionForm from "./components/MansionForm";
import HouseForm from "./components/HouseForm";
import LandForm from "./components/LandForm";

function App() {
  const [propertyType, setPropertyType] = useState("");
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const liffId = import.meta.env.VITE_LIFF_ID;
    liff
      .init({ liffId })
      .then(() => setIsLiffInitialized(true))
      .catch((e) => setError(`LIFF init failed: ${e}`));
  }, []);

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLiffInitialized) {
      setError("LIFFの初期化が完了していません。");
      return;
    }
    // フォームデータの処理
  };

  return (
    <div className="App">
      <h1>AI査定フォーム</h1>
      <form onSubmit={handleSubmit}>
        <div className="property-type-buttons">
          <button
            type="button"
            className={propertyType === "マンション" ? "active" : ""}
            onClick={() => handlePropertyTypeChange("マンション")}
          >
            マンション
          </button>
          <button
            type="button"
            className={propertyType === "一戸建" ? "active" : ""}
            onClick={() => handlePropertyTypeChange("一戸建")}
          >
            一戸建
          </button>
          <button
            type="button"
            className={propertyType === "土地" ? "active" : ""}
            onClick={() => handlePropertyTypeChange("土地")}
          >
            土地
          </button>
        </div>

        {propertyType === "マンション" && <MansionForm />}
        {propertyType === "一戸建" && <HouseForm />}
        {propertyType === "土地" && <LandForm />}

        <button type="submit" className="submit-button">送信</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;