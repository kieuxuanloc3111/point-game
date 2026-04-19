import { memo } from "react";

function Point({ point, onClick }) {
    return (
        <div 
            className="point" 
            style={{ left: point.x, top: point.y }}
            onClick={() => onClick(point.id)} 
        >
            {point.id}
        </div>
    );
}

export default memo(Point);