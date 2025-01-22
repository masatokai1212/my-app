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
<div className="w-full max-w-md mx-auto p-4 space-y-6">
{error && <p className="text-red-500">{error}</p>}
<form onSubmit={handleSubmit}>
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
      マンション名
    </label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="※3文字以上入力でサジェスト"
      className="w-full mt-1 p-2 border rounded"
    />
  </div>
  <div className="grid grid-cols-3 gap-4">
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
        </svg>
        広さ (㎡)
      </label>
      <input
        type="number"
        name="size"
        value={formData.size}
        onChange={handleChange}
        className="w-full mt-1 p-2 border rounded"
      />
    </div>
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        階数
      </label>
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
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4-4-4 4M12 16V8"/>
        </svg>
        方位
      </label>
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
  </div>
  <button
    type="submit"
    className="w-full bg-[#5BA7B3] hover:bg-[#4A96A2] text-white py-6"
  >
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4-4-4 4M12 16V8"/>
    </svg>
    査定する
  </button>
</form>
    </div>
  );
}

export default MansionForm;
