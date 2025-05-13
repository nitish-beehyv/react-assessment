// import "./App.css";
import Dropdown from "./Components/Dropdown";
import { useState } from "react";

function App() {
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  return (
    <>
      <h1>Dropdown</h1>
      <div>
        <input
          type="checkbox"
          value="all"
          onChange={(e) => setIsMultiSelect(e.target.checked)}
          checked={isMultiSelect}
        />
        <label>MultiSelect</label>
      </div>
      <Dropdown
        onChange={(e) => console.log(e)}
        optionKey="id"
        optionLabel="name"
        isMultiSelect={isMultiSelect}
      />
    </>
  );
}

export default App;
