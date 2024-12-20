import React from "react";

const HouseForm = () => (
  <div className="form-section">
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
);

export default HouseForm;