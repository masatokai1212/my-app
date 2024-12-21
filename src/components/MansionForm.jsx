import React, { useState, useEffect } from 'react';
import liff from '@line/liff';

function MansionForm() {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    floor: '3階',
    direction: '東向き',
  });
  const [error, setError] = useState('');
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);

  useEffect(() => {
    liff.init({ liffId: process.env.VITE_LIFF_ID })
      .then(() => {
        console.log('LIFF initialized successfully');
        setIsLiffInitialized(true);
      })
      .catch((e) => {
        console.error('LIFF init failed:', e);
        setError(`LIFF init failed: ${e}`);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLiffInitialized) {
      setError('LIFFの初期化が完了していません。');
      return;
    }

    const message = `
      マンション名: ${formData.name}
      広さ: ${formData.size}㎡
      階数: ${formData.floor}
      方位: ${formData.direction}
    `.trim();

    try {
      console.log('Sending message:', message);

      await liff.sendMessages([
        {
          type: 'text',
          text: message,
        },
      ]);

      liff.closeWindow();
    } catch (err) {
      console.error('Error sending message', err);
      setError(`送信に失敗しました: ${err.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">マンションフォーム</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">マンション名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="※3文字以上入力でサジェスト"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">広さ (㎡)</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">階数</label>
          <select
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option>3階</option>
            {/* 他のオプションを追加 */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">方位</label>
          <select
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
          >
            <option>東向き</option>
            {/* 他のオプションを追加 */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
        >
          査定する
        </button>
      </form>
    </div>
  );
}

export default MansionForm;
