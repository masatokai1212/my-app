import React from "react";

const LandForm = () => (
  <div className="form-section">
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
);

export default LandForm;