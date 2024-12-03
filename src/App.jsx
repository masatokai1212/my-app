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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!liff.isInClient()) {
      setError("LINEアプリ内でのみメッセージを送信できます。");
      return;
    }

    const formData = new FormData(e.target);
    const selectedTypes = formData.getAll('consultation_type');
    const date = formData.get('date');
    const time = formData.get('time');
    const message = formData.get('message');

    // メッセージの作成
    const messageText = `
【お問い合わせ内容】
${selectedTypes.join('、')}

【希望日時】
${date} ${time}

【その他ご要望】
${message || 'なし'}
    `.trim();

    try {
      await liff.sendMessages([
        {
          type: "text",
          text: messageText,
        },
      ]);
      console.log("message sent");
      
      // 送信成功後にLIFFブラウザを閉じる
      liff.closeWindow();
    } catch (err) {
      console.error("error", err);
      setError("メッセージの送信に失敗しました。");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        イズホーム不動産<br />お問い合わせフォーム
      </h1>
      {message && <p>{message}</p>}
      {error && <p className="text-red-500"><code>{error}</code></p>}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-left text-gray-700">
            お問い合わせ内容 <span className="text-red-500">*</span>
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              '土地購入', '中古住宅購入', '中古マンション購入', '売却・住みかえ相談',
              'リフォーム相談', '新築相談', '周辺環境相談', '無料相談会に参加希望',
              'リモートで見学希望', 'その他'
            ].map((label, index) => (
              <label key={index} className="flex items-center space-x-3 text-gray-700 text-lg">
                <input
                  type="checkbox"
                  name="consultation_type"
                  value={label}
                  className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="flex-1">{label}</span>
              </label>
            ))}
          </div>
          <p className="text-red-500 text-base">※お問い合わせ内容を1つ以上選択してください。</p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-left text-gray-700">希望日時</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="date" className="block text-lg text-gray-700">日付を選択</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 text-sm">※水曜日は定休日です</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="block text-lg text-gray-700">時間を選択</label>
              <select
                id="time"
                name="time"
                required
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
          <h2 className="text-xl font-semibold text-left text-gray-700">その他ご要望</h2>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="ご自由にお書きください"
            className="w-full p-4 text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <p className="text-base text-gray-500 mt-4">※*は必須項目です。</p>

        <div className="pt-6 flex justify-center">
          <button
            type="submit"
            className="w-full bg-black text-white text-xl py-4 px-6 rounded-md hover:bg-gray-800 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            送信する
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;


