import GameBoard from "./components/GameBoard";
import "./App.css";
import { useEffect , useState } from "react";

function App() {
  const[points, setPoints] = useState([]);
  const[current,setCurrent] = useState(1);
  const[status , setStatus] = useState("idle");
  const[timer, setTimer] = useState(0);
  const[autoPlay, setAutoPlay] = useState(false);
  const[totalPoints, setTotalPoints] = useState(5);

  const generatePoints = (num) => {
    const size=400;
    return Array.from({ length: num }, (_, id) => ({
      id:i+1,
      x:Math.random() * (size-20),
      y:Math.random() * (size-20),
      visible:true,
    }));
  }

  const handleStart = () => {
    setPoints(generatePoints(totalPoints));
    setStatus("playing");
    setCurrent(1);
    setTimer(0);
  }
  const handleRestart = () =>{
    handleStart();
  }
  const handleClick = (id) => {
    if (status !== "playing") return;
    if (id != current)
      setStatus("gaemeover");
      return;

  setPoints((prevPoints) =>
    prevPoints.map((point) =>
      point.id === id ? { ...point, visible: false } : point
    )
  );

  setCurrent((prevCurrent) => prevCurrent + 1);
  };

  useEffect(() => {
    if (status === "playing") return;
    const allDont = points.length >0 && points.every((point) => !point.visible);
    if (allDont) setStatus("win");
  }, [points, status]);

  useEffect(() => {
    let interval;
    if (status === "playing") {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if(!autoPlay || status !== "playing") return;
    const nextPoint = points.find((point) => point.id === current && point.visible);
    if (nextPoint) {
      const timeout = setTimeout(() => {
        handleClick(nextPoint.id);
      },200);
      return () => clearTimeout(timeout);
    }
  }, [autoPlay, status, points, current]);



  return (
    <div className="App">
      <h2>LET'S PLAY!</h2>
      <div>
        Point :{""}
        <input>
        type="number"
        value={totalPoints}
        onChange={(e) => setTotalPoints(Number(e.target.value))}
        
        </input>
      </div>

      <div>Time :{timer}s</div>
      {status === "idle" && <button onClick={handleStart}>Play</button>}

      {status !== "idle" && (<><button onClick={handleRestart}>Restart</button>
        {status === "playing" && (<button onClick={() => setAutoPlay((auto) => !auto)}>Auto Play{autoPlay ? " (On)" : " (Off)"}</button>) } </>
    )}

    {status === "gameover" && <h3>Game Over! Try Again.</h3>}
    {status === "win" && <h3>Congratulations! You Win!</h3>}
    <GameBoard points={points} onClick={handleClick} />
    {status ===}
    {status === "win" && <button onClick={handleRestart}>Play Again</button>}


      

    </div>
  );
}

export default App;
