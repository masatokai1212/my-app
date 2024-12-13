import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);

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
    const selectedTypes = formData.getAll('consultation_type');
    const date = formData.get('date');
    const time = formData.get('time');
    const message = formData.get('message');

    // メッセージの作成
    const messageText = `
お問い合わせありがとうございます！

【お問い合わせ内容】
${selectedTypes.join('、')}

【希望日時】
${date} ${time}

【その他ご要望】
${message || 'なし'}
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

  return (
    <div className="container">
      <h1 className="title">
        イズホーム不動産<br />お問い合わせフォーム
      </h1>
      {message && <p>{message}</p>}
      {error && <p className="error"><code>{error}</code></p>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <h2 className="section-title">
            お問い合わせ内容 <span className="required">*</span>
          </h2>
          <div className="checkbox-grid">
            {['土地購入', '中古住宅購入', '中古マンション購入', '売却・住みかえ相談','リフォーム相談','新築相談','周辺環境相談','無料相談会に参加希望','リモートで見学希望','その他'].map((type) => (
              <div key={type} className="checkbox-item">
                <input
                  type="checkbox"
                  id={type}
                  name="consultation_type"
                  value={type}
                  className="checkbox"
                />
                <label htmlFor={type} className="checkbox-label">{type}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">希望日時</h2>
          <div className="input-group">
            <label htmlFor="date" className="input-label">日付を選択</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="input"
            />
            <p className="note">※水曜日は定休日です</p>
          </div>
          <div className="input-group">
            <label htmlFor="time" className="input-label">時間を選択</label>
            <select
              id="time"
              name="time"
              required
              className="input"
            >
              <option value="">選択してください</option>
              {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">その他ご要望</h2>
          <textarea
            name="message"
            className="textarea"
            rows="4"
          ></textarea>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">送信する</button>
        </div>
      </form>
    </div>
  );
}

export default App;

