import logo from './logo.svg';
import './App.css';
import {  useEffect , useState } from 'react'; 
import GameBoard from './components/GameBoard';
function App() {
  const[points , setPoints] = useState([]);
  const [current, setCurrent] = useState(1);
  const [status , setStatus] = useState("idle");
  const [time, setTime] = useState(0);
  const [autoPlay , setAutoPlay] = useState(false);
  const [totalPoints , setTotalPoints] = useState(5);

  // generate point
  const generatePoints = (num) => {
    const size = 400;
    return Array.from({length : num} , (_, i) => ({
      id : i + 1,
      x : Math.random() * (size -40),
      y : Math.random() * (size -40),
      visible : true,
    }));
  };
  const handleStart = () => {
    setPoints(generatePoints(totalPoints));
    setCurrent(1);
    setStatus("playing");
    setTime(0);
  };

  const handleRestart = () =>{
    handleStart();
  }

  const handleClick = (id) =>{
    if (status !== "playing") return;
    if (id!== current){
      setStatus("game over");
      return;
    }
    setPoints((prevPoints) =>
      prevPoints.map((point)=>
        point.id === id ? {...point , visible : false} : point
      )
    );
    setCurrent((current) => current + 1);
  };

  //check win
  useEffect(() => {
    if (status !== "playing") return;
    const allGone = points.length > 0 && points.every((point) => !point.visible);
    if (allGone) {
      setStatus("won");
    }

  }, [points, status]);

  //timer
  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
    return () => clearInterval(timer);
  }, [status]);

  //autoplay
  useEffect(() => {
    if (!autoPlay || status !== "playing") return;
    const nextPoint = points.find((point) =>point.id === current && point.visible);
    if (nextPoint){
      const time = setTimeout(() => {handleClick(nextPoint.id);
      } ,200);
      return () => clearTimeout(time);

    } }, [autoPlay, current, points, status]);

  return (

    <div className="App">
      <h2>LET 'S PLAY!</h2>

    <div>
      Points: {" "}
      <input
        type="number"
        value={totalPoints}
        onChange={(e) => setTotalPoints(+e.target.value)}
        min="1"
        max="20"
      />
    </div>

      <div>Time : {time}s</div>

      {status === "idle" && <button onClick={handleStart}>Play</button>}

      {status !== "idle" && (
        <>  
          <button onClick={handleRestart}>Restart</button>
          {status === "playing" &&(
            <button onClick={()=> setAutoPlay((a) => !a)}>
              {autoPlay ? "Stop Auto Play" : "Auto Play"}
              </button>
          )}
        </>
      )}

      {status === "game over" && <h3>Game Over!</h3>}
      {status === "won" && <h3>You Won!</h3>}
      <GameBoard points={points} onClick={handleClick}/>
      {status === "playing" && <div>Next: {current}</div>}

    </div>

  );
}

export default App;
