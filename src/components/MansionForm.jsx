import React, { useState } from 'react';
import liff from '@line/liff';

function MansionForm() {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    floor: '3階',
    direction: '東向き',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
      マンション名: ${formData.name}
      広さ: ${formData.size}㎡
      階数: ${formData.floor}
      方位: ${formData.direction}
    `;

    liff.sendMessages([
      {
        type: 'text',
        text: message,
      },
    ])
    .then(() => {
      console.log('Message sent');
      liff.closeWindow();
    })
    .catch((err) => {
      console.error('Error sending message', err);
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">マンションフォーム</h2>
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
