import React, { useState } from 'react';
import './App.css';
import MansionForm from './MansionForm';
import HouseForm from './HouseForm';
import LandForm from './LandForm';

function App() {
    const [selectedForm, setSelectedForm] = useState(null);

    const renderForm = () => {
        switch (selectedForm) {
            case 'mansion':
                return <MansionForm />;
            case 'house':
                return <HouseForm />;
            case 'land':
                return <LandForm />;
            default:
                return null;
        }
    };

    return (
        <div className="App">
            <h1>不動産情報入力</h1>
            <div>
                <button onClick={() => setSelectedForm('mansion')}>マンション</button>
                <button onClick={() => setSelectedForm('house')}>戸建て</button>
                <button onClick={() => setSelectedForm('land')}>土地</button>
            </div>
            <div>
                {renderForm()}
            </div>
        </div>
    );
}

export default App;
