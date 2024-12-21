import React from 'react';
import './MansionForm.css';

function MansionForm() {
    return (
        <form className="mansion-form">
            <div className="form-group">
                <label>🏢 マンション名</label>
                <input type="text" placeholder="※ 3文字以上入力でサジェスト" />
            </div>
            <div className="form-group">
                <label>📏 広さ (㎡)</label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label>🏢 階数</label>
                <select>
                    <option>3階</option>
                    {/* 他のオプションを追加 */}
                </select>
            </div>
            <div className="form-group">
                <label>↗ 方位</label>
                <select>
                    <option>東向き</option>
                    {/* 他のオプションを追加 */}
                </select>
            </div>
            <button type="submit" className="search-button">🔍 検索する</button>
        </form>
    );
}

export default MansionForm;
