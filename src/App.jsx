import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

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

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
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
        <label>
          物件タイプ:
          <select value={propertyType} onChange={handlePropertyTypeChange}>
            <option value="">選択してください</option>
            <option value="マンション">マンション</option>
            <option value="一戸建">一戸建</option>
            <option value="土地">土地</option>
          </select>
        </label>

        {propertyType === "マンション" && (
          <div>
            <label>
              マンション名:
              <input type="text" name="mansionName" required />
            </label>
            <label>
              広さ（ｍ²）:
              <input type="number" name="area" required />
            </label>
            <label>
              階数:
              <input type="number" name="floor" required />
            </label>
            <label>
              方位（バルコニーの向き）:
              <input type="text" name="direction" required />
            </label>
          </div>
        )}

        {propertyType === "一戸建" && (
          <div>
            <label>
              住所情報（都道府県、市区町村）:
              <input type="text" name="address" required />
            </label>
            <label>
              最寄り駅（徒歩距離（分））:
              <input type="text" name="nearestStation" required />
            </label>
            <label>
              建物情報（構造、建築年、建物面積、土地面積、階建）:
              <input type="text" name="buildingInfo" required />
            </label>
          </div>
        )}

        {propertyType === "土地" && (
          <div>
            <label>
              住所情報:
              <input type="text" name="landAddress" required />
            </label>
            <label>
              最寄り駅:
              <input type="text" name="landNearestStation" required />
            </label>
            <label>
              土地面積:
              <input type="number" name="landArea" required />
            </label>
          </div>
        )}

        <button type="submit">送信</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;