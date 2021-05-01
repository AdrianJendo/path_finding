import React from 'react';
import "./Node.css";

export function Node(props) {
    const {row, col, isStart, isEnd, isWall, isHover, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave} = props;

    const extra_class = isEnd ? 'node-end' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
    const hover = isHover ? 'node-hover' : '';

    
    return (
        <div 
            id={`node-${row}-${col}`} 
            className={`node ${extra_class} ${hover}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseLeave={() => onMouseLeave(row, col)}
            onMouseUp={() => onMouseUp(row, col)}
        ></div>
    );
}

