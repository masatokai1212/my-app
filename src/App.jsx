import { useState } from "react";
import "./App.css";
import PropertyTypeButtons from "./components/PropertyTypeButtons";
import MansionForm from "./components/MansionForm";
import HouseForm from "./components/HouseForm";
import LandForm from "./components/LandForm";
function App() {
 const [selectedProperty, setSelectedProperty] = useState("");
  const handlePropertySelect = (property) => {
   setSelectedProperty(property);
 };
  return (
   <div className="container">
     <h1 className="title">不動産査定フォーム</h1>
     <PropertyTypeButtons onSelect={handlePropertySelect} />
     {selectedProperty && (
       <div className="selected-property">
         <h2>選択された物件タイプ: {selectedProperty}</h2>
         {/* Render the corresponding form based on the selected property */}
         {selectedProperty === "マンション" && <MansionForm />}
         {selectedProperty === "戸建て" && <HouseForm />}
         {selectedProperty === "土地" && <LandForm />}
       </div>
     )}
   </div>
 );

export default App;