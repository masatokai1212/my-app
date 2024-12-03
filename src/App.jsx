import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  useEffect(() => {
    // 水曜日を除外する処理
    const dateInput = document.getElementById('date');
    if (dateInput) {
      dateInput.addEventListener('input', function(e) {
        const selected = new Date(this.value);
        if (selected.getDay() === 3) { // 水曜日は3
          alert('水曜日は予約できません。他の日を選択してください。');
          this.value = '';
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>不動産相談予約フォーム</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <form action="/submit" method="post">
        <h2>ご相談内容（複数選択可）</h2>
        <div className="checkbox-group">
          <div>
            <input type="checkbox" id="land" name="consultation_type" value="土地購入" />
            <label htmlFor="land">土地購入</label>
          </div>
          <div>
            <input type="checkbox" id="used-house" name="consultation_type" value="中古住宅購入" />
            <label htmlFor="used-house">中古住宅購入</label>
          </div>
          <div>
            <input type="checkbox" id="used-mansion" name="consultation_type" value="中古マンション購入" />
            <label htmlFor="used-mansion">中古マンション購入</label>
          </div>
          <div>
            <input type="checkbox" id="reform" name="consultation_type" value="リフォーム相談" />
            <label htmlFor="reform">リフォーム相談</label>
          </div>
        </div>

        <h2>予約希望日時</h2>
        <div>
          <label htmlFor="date">日付：</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div>
          <label htmlFor="time">時間：</label>
          <select id="time" name="time" required>
            <option value="">選択してください</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
          </select>
        </div>

        <h2>お客様情報</h2>
        <div>
          <label htmlFor="name">お名前：</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">メールアドレス：</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="phone">電話番号：</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div>
          <label htmlFor="message">ご要望・ご質問など：</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>

        <div>
          <button type="submit">予約する</button>
        </div>
      </form>
    </div>
  );
}

export default App;


