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
        //setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        //setMessage("LIFF init failed.");
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
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">不動産相談予約フォーム</h1>
      {/*{message && <p>{message}</p>}
      {error && <p><code>{error}</code></p>}*/}
      
      <form action="/submit" method="post" className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-left text-gray-700">ご相談内容（複数選択可）</h2>
          <div className="grid grid-cols-1 gap-3 pl-2">
            {[
              { id: 'land', label: '土地購入' },
              { id: 'used-house', label: '中古住宅購入' },
              { id: 'used-mansion', label: '中古マンション購入' },
              { id: 'reform', label: 'リフォーム相談' }
            ].map((item) => (
              <label key={item.id} className="flex items-center space-x-3 text-gray-700">
                <input
                  type="checkbox"
                  id={item.id}
                  name="consultation_type"
                  value={item.label}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-left text-gray-700">予約希望日時</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="date" className="text-gray-700">日付：</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="time" className="text-gray-700">時間：</label>
              <select
                id="time"
                name="time"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選択してください</option>
                {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-gray-700">ご要望・ご質問など：</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            予約する
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;


