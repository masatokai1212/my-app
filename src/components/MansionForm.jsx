import React from 'react';

function MansionForm() {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">マンションフォーム</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">マンション名</label>
          <input
            type="text"
            placeholder="※3文字以上入力でサジェスト"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">広さ (㎡)</label>
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">階数</label>
          <select className="w-full mt-1 p-2 border rounded">
            <option>3階</option>
            {/* 他のオプションを追加 */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">方位</label>
          <select className="w-full mt-1 p-2 border rounded">
            <option>東向き</option>
            {/* 他のオプションを追加 */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
        >
          検索する
        </button>
      </form>
    </div>
  );
}

export default MansionForm;
