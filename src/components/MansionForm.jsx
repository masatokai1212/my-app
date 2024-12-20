import React from "react";

const MansionForm = () => (
  <div className="form-section">
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
);

export default MansionForm;