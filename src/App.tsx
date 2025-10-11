import "./App.css";
import { useState } from "react";

function useInput(initialValue: number) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(Number(e.target.value));

  return { value, onChange };
}

function App() {
  const name = useInput(0);

  return (
    <div className="app">
      <div className="inputfield">
        <label>Zeit festlegen:</label>
        <input
          className="input"
          type="number"
          value={name.value}
          onChange={name.onChange}
        ></input>
      </div>
      <div>
        <h2>Time left:</h2>
        <h2>{name.value.toFixed(3)} s</h2>
      </div>
      <div className="buttons">
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default App;
