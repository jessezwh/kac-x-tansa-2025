import { useState } from 'react';
import './App.css';


function App() {

  const [scores, setScores] = useState([0, 0])
  const [startstop, setStartstop] = useState(0);

  const stst = ['START!', 'stop.'];

  const toggleS = () => {
    if (startstop) {
      setStartstop(0);
    } else {
      setStartstop(1);
    }
  }

  const handle = () => {
    return
  }


  return (
    <div className="app">
      <h1>Points</h1>
      <div className="scoreboard">
        <div className="score tansa">
          <h1>TANSA</h1>
          <span> {scores[0]} </span>
        </div>
        <div className="score kac">
          <h1>KAC</h1>
          <span> {scores[1]} </span>
        </div>
      </div>

      <h1>Control Time</h1>
      <div className="scorebar">
        <div className="control tansa">
          <span>0s</span>
        </div>
        <div className="control kac">
          <span>0s</span>
        </div>
      </div>

      <h1>Updaters</h1>
      <div className="updaters">
        <div className="updater">
          <form action={handle} name="tansa">
            <button type="submit">-</button>
            <input type="text" />
            <button type="submit">+</button>
          </form>
        </div>
        <div className="updater">
          <form action={handle} name="kac">
            <button type="submit">-</button>
            <input type="text" />
            <button type="submit">+</button>
          </form>
        </div>
      </div>

      <div className="start">
        <button onClick={toggleS}>{stst[startstop]}</button>
      </div>
    </div>   
  );
}

export default App;
