import "./App.css";
import { useState, useRef, useEffect } from "react";

function useInput(initialValue: number) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(Number(e.target.value));
  return { value, onChange };
}

function App() {
  const input = useInput(0);

  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const update = () => {
      const now = Date.now();
      const totalElapsed = elapsed + (now - startTimeRef.current) / 1000;
      const secondsLeft = Math.max(0, input.value - totalElapsed);

      setDisplay(secondsLeft);

      if (secondsLeft > 0) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        setIsRunning(false);
      }
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, elapsed, input.value]);

  function handleStart() {
    if (isRunning) return;
    startTimeRef.current = Date.now();
    setIsRunning(true);
  }

  function handlePause() {
    if (isRunning) {
      const now = Date.now();
      setElapsed((prev) => prev + (now - startTimeRef.current) / 1000);
      setIsRunning(false);
      return;
    }

    startTimeRef.current = Date.now();
    setIsRunning(true);
  }

  function handleReset() {
    setIsRunning(false);
    setElapsed(0);
    setDisplay(input.value);
  }

  return (
    <div className="app">
      <div className="inputfield">
        <label>Zeit festlegen:</label>
        <input
          className="input"
          type="number"
          value={input.value}
          onChange={input.onChange}
        />
      </div>

      <div>
        <h2>Time left:</h2>
        <h2>{display.toFixed(3)} s</h2>
      </div>

      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause / Weiter</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
