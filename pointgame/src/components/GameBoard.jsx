import Point from "./Point";

export default function GameBoard({ points, onClick }) {
    return(
        <div className="board">
            {points.map((point) => 
            point.visible ? (<Point key ={point.id} point={point} onClick={onClick}/>) : null
            )}

        </div>

    );
}