import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const liffId = import.meta.env.VITE_LIFF_ID;
    console.log("LIFF ID:", liffId); // デバッグ用に追加
    liff
      .init({
        liffId: liffId
      })
      .then(() => {
        console.log("LIFF initialized successfully");
        setIsLiffInitialized(true);
      })
      .catch((e) => {
        console.error("LIFF init failed:", e);
        setError(`LIFF init failed: ${e}`);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLiffInitialized) {
      setError("LIFFの初期化が完了していません。");
      return;
    }

    const formData = new FormData(e.target);
    const mansionName = formData.get('mansion_name');
    const area = formData.get('area');
    const floor = formData.get('floor');
    const orientation = formData.get('orientation');

    // メッセージの作成
    const messageText = `
査定依頼ありがとうございます！

【マンション名】
${mansionName}

【広さ】
${area} m²

【階数】
${floor}

【方位】
${orientation}
    `.trim();

    try {
      console.log("Sending message:", messageText);
      
      await liff.sendMessages([
        {
          type: "text",
          text: messageText
        }
      ]);

      liff.closeWindow();
    } catch (err) {
      console.error("Error details:", err);
      setError(`送信に失敗しました: ${err.message}`);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <h1 className="title">
        マンション査定フォーム
      </h1>
      {message && <p>{message}</p>}
      {error && <p className="error"><code>{error}</code></p>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <label htmlFor="mansion_name" className="input-label">マンション名</label>
          <input
            type="text"
            id="mansion_name"
            name="mansion_name"
            required
            className="input"
            placeholder="※3文字以上入力でサジェスト"
          />
        </div>

        <div className="form-section">
          <label htmlFor="area" className="input-label">広さ (m²)</label>
          <input
            type="number"
            id="area"
            name="area"
            required
            className="input"
          />
        </div>

        <div className="form-section">
          <label htmlFor="floor" className="input-label">階数</label>
          <select
            id="floor"
            name="floor"
            required
            className="input"
          >
            <option value="1階">1階</option>
            <option value="2階">2階</option>
            <option value="3階">3階</option>
            {/* 他の階数も追加可能 */}
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="orientation" className="input-label">方位</label>
          <select
            id="orientation"
            name="orientation"
            required
            className="input"
          >
            <option value="東向き">東向き</option>
            <option value="西向き">西向き</option>
            <option value="南向き">南向き</option>
            <option value="北向き">北向き</option>
          </select>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">査定する</button>
        </div>
      </form>
    </div>
  );
}

export default App;