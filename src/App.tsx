import "./App.css";
import { useState, useRef, useEffect } from "react";

function useInput(initialValue: number) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(Number(e.target.value));

  return { value, onChange };
}

function App() {
  const name = useInput(0);
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const intervalID = useRef(-1);

  useEffect(() => {
    if ((now - startTime) / 1000 >= name.value) {
      clearInterval(intervalID.current);
      setNow(startTime + name.value * 1000);
    }
  }, [startTime, now, name.value]);

  function handleStart() {
    const dateNow = Date.now();
    setStartTime(dateNow);
    setNow(dateNow);

    intervalID.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  const secondsLeft = name.value - (now - startTime) / 1000;

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
        <h2>{secondsLeft.toFixed(3)} s</h2>
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default App;
