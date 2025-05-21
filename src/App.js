import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {

  const [scores, setScores] = useState([0, 0]);
  const updateOpacities = () => {
    const scrObj = [document.getElementsByClassName("score tansa")[0], document.getElementsByClassName("score kac")[0]];
    if (scores[0] > scores[1]) {
      scrObj[0].style.opacity = 1
      scrObj[1].style.opacity = 0.6
    } else if (scores[1] > scores[0]) {
      scrObj[1].style.opacity = 1
      scrObj[0].style.opacity = 0.6
    } else if (scores[0] === scores[1]) {
      scrObj[1].style.opacity = 0.6
      scrObj[0].style.opacity = 0.6
    }
  }

  const [startstop, setStartstop] = useState(0);
  const stst = ['START!', 'stop.'];
  const toggleS = () => {
    if (startstop) {
      setStartstop(0);
    } else {
      setStartstop(1);
    }
  }

  const handleScore = (e) => {
    e.preventDefault();
    const club = e.target.name;
    const act = (e.nativeEvent.submitter.name === "dec") ? 0 : 1;
    const val = Number(e.target[1].value);

    if (club === "tansa") {
      var temp = scores[0]
      if (act) {
        temp += val
      } else {
        temp -= val
      }
      setScores([temp, scores[1]])
    } else if (club === "kac") {
      var temp = scores[1]
      if (act) {
        temp += val
      } else {
        temp -= val
      }
      setScores([scores[0], temp])
    }

    e.target[1].value = null
  }


  const [elapsedTime, setElapsedTime] = useState([0, 0]);
  const intervalIdRefs = [useRef(null), useRef(null)];
  const startTimeRefs = [useRef(0), useRef(0)];

  const updateTimer = () => {
    if (startstop) {
      var lead;
      if (scores[0] > scores[1]) {  //tansa
        startTimeRefs[0].current = Date.now() - elapsedTime[0]
        intervalIdRefs[0].current = setInterval(() => {
          setElapsedTime([Date.now() - startTimeRefs[0].current, elapsedTime[1]])
        }, 10)
      } else if (scores[1] > scores[0]) {  //kac
        startTimeRefs[1].current = Date.now() - elapsedTime[1]
        intervalIdRefs[1].current = setInterval(() => {
          setElapsedTime([elapsedTime[0], Date.now() - startTimeRefs[1].current])
        }, 10)
      } 

    }
  }

  useEffect(() => {
    updateOpacities();
    updateTimer();
    return () => {
        clearInterval(intervalIdRefs[0].current);
        clearInterval(intervalIdRefs[1].current);
    }
  }, [scores, startstop]);

  const formatTime = (time) => {
    let hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");
    let minutes = String(Math.floor(time / (1000 * 60) % 60)).padStart(2, "0");
    let seconds = String(Math.floor(time / (1000) % 60)).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
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
        <div className="control tansa" style={{flex: elapsedTime[0]}}>
          <span>{formatTime(elapsedTime[0])}</span>
        </div>
        <div className="control kac" style={{flex: elapsedTime[1]}}>
          <span>{formatTime(elapsedTime[1])}</span>
        </div>
      </div>

      <h1>Updaters</h1>
      <div className="updaters">
        <div className="updater">
          <form onSubmit={handleScore} name="tansa">
            <button name="dec">-</button>
            <input type="number" />
            <button name="inc">+</button>
          </form>
        </div>
        <div className="updater">
          <form onSubmit={handleScore} name="kac">
            <button name="dec">-</button>
            <input type="number" />
            <button name="inc">+</button>
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
