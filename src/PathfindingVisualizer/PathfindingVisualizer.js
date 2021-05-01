import React, {useCallback, useEffect, useState} from 'react';
import {Node} from './Node/Node';
import {Popup} from './Popup';
import "./PathfindingVisualizer.css";
import {dijkstra, getShortestPath} from "../algorithms/dijkstra";

const NUMROWS = 20;
const NUMCOLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

//TODO
//Change Grid Size

//For later
//Code using A* and also switch between Dijsktra and A*

export function PathfindingVisualizer() {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [reset, setReset] = useState(false);
    const [animation,setAnimation] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [addWalls, setAddsWalls] = useState(true);
    
    const [numRows, setNumRows] = useState(NUMROWS);
    const [numCols, setNumCols] = useState(NUMCOLS);
    const [changeStart, setChangeStart] = useState(false);
    const [startNode, setStartNode] = useState({row:START_NODE_ROW, col:START_NODE_COL});
    const [changeEnd, setChangeEnd] = useState(false);
    const [endNode, setEndNode] = useState({row:END_NODE_ROW, col:END_NODE_COL});
    const [walls, setWalls] = useState([]);


    const createGrid = useCallback( () => {
        const grid = [];
        for (let row=0; row<numRows; ++row){
            const curRow = [];
            for (let col=0; col<numCols; ++col){
                curRow.push(createNode(row, col, {start:startNode, end:endNode, walls:walls}));
            }
            grid.push(curRow);
        }
        return grid;
    }, 
    [numRows, numCols, startNode, endNode, walls]
    );


    useEffect(() => {
        const new_grid = createGrid();
        setGrid(new_grid);
        console.log('Hey');
    }, [createGrid]);

    

    const createNode = (row, col, {start, end, walls}) => {
        let start_node = row === start.row && col === start.col;
        let end_node = row === end.row && col === end.col;
        return {
            row,
            col,
            isStart : start_node,
            isEnd: end_node,
            isVisited : false,
            isWall : walls.length && walls[row][col],
            isHover : false,
            previousNode : null,
            cost: Infinity
        };
    };


    //Solves current grid using Dijkstra's Algorithm
    const solveDijkstra = () => {
        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];
        const visited_nodes = dijkstra(grid, start, end); //Either need to reset isVisited property of use Ref to store the classnames
        const shortest_path_list = getShortestPath(end);
        animateDijkstra(visited_nodes, shortest_path_list);
        setAnimation(true);
    };

    //Animates Dijkstra's Algorithm
    const animateDijkstra = (visited_nodes, shortest_path_list) => {
        //Iterate through visited nodes
        //let new_grid = grid.slice();
        const update_interval = 7;
        for(let i =0; i<visited_nodes.length; ++i){
            /*
            //Updating entire state is not efficient
            setTimeout( () => {
                const node = visited_nodes[i];                
                const new_node = {...node, isAnimated: true};
                grid[node.row][node.col] = new_node;
                if(i%update_interval===0 || i===visited_nodes.length-1){
                    setGrid(new_grid);
                    new_grid = grid.slice();
                }
            }, i);*/

            //Only update class of node of interest
            setTimeout(() => {
                const node = visited_nodes[i];
                if(i!== 0 && i!== visited_nodes.length-1){
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
                }
              }, update_interval*i);
        }      
        
        //After animating the visited nodes, do the shortest path animation
        setTimeout(() => {
            animateShortestPath(shortest_path_list);
        }, update_interval * visited_nodes.length)
    };

    const animateShortestPath = (shortest_path) => {
        for(let i = 0; i < shortest_path.length; ++i){
            setTimeout( () => {
                const node = shortest_path[i];
                if(i!==0 && i!==shortest_path.length-1){
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
                }
                else if(i===shortest_path.length-1){
                    setReset(true);
                    setAnimation(false);
                }
            }, 50*i);
        }
    };

    //Coded like this to allow click once to place and click twice to release (must delete handleMouseUp)
    const handleMouseDown = (row, col) => {
        if(changeStart){
            let start_node = find('start');
            grid[start_node[0]][start_node[1]].isStart = false;
            /*const newGrid = grid.slice(); //shallow copy of grid
            const node = newGrid[row][col];
            const newNode = {
                ...node,
                isStart: true
            };
            newGrid[row][col] = newNode;*/
            //setGrid(newGrid);
            setStartNode({row:row, col:col});
            setChangeStart(false);
        }
        else if (changeEnd){
            let end_node = find('end');
            grid[end_node[0]][end_node[1]].isEnd = false;
            const newGrid = grid.slice();
            const node = newGrid[row][col];
            const newNode = {
                ...node,
                isEnd: true
            };
            newGrid[row][col] = newNode;
            //setGrid(newGrid);
            setEndNode({row:row, col:col});
            setChangeEnd(false);
        }
        else if(!mouseIsPressed && !reset && !animation){
            const newGrid = getNewGridWalls(grid, row, col);
            setGrid(newGrid);
        } 
        setMouseIsPressed(!mouseIsPressed);
    };

    const handleMouseEnter = (row, col) => {
        if(changeStart && !grid[row][col].isEnd && !grid[row][col].isWall){
            updateGrid("node-hover-start", row, col);
        }
        else if(changeEnd && !grid[row][col].isStart && !grid[row][col].isWall){
            updateGrid("node-hover-end", row, col);
        }
        else{
            if(!(mouseIsPressed || grid[row][col].isWall || grid[row][col].isStart || grid[row][col].isEnd|| grid[row][col].isVisited || reset || animation) && addWalls){
                updateGrid("node-hover", row, col);
            }
            else if (!addWalls && grid[row][col].isWall && !reset && !animation){
                updateGrid("node-hover-red", row, col);
            }
            if (mouseIsPressed && addWalls && !reset && !animation) {
                const newGrid = getNewGridWalls(grid, row, col);
                setGrid(newGrid);
            }
        }        
    };

    
    const handleMouseLeave = (row, col) => {
        if(!(mouseIsPressed || grid[row][col].isWall || grid[row][col].isStart || grid[row][col].isEnd || grid[row][col].isVisited)){
            updateGrid("", row, col);
        }
        else if ((changeStart || changeEnd) && !grid[row][col].isStart && !grid[row][col].isEnd && !grid[row][col].isWall){
            updateGrid("", row, col);
        }
        else if (grid[row][col].isWall){
            updateGrid("node-wall", row, col);
        }

        if(mouseIsPressed && !addWalls && !reset && !animation) {
            const newGrid = getNewGridWalls(grid, row, col);
            setGrid(newGrid);
        }
    }
    
    //Enables click and hold to place/remove
    //If want to click once to place and click again to stop placing, just delete this function (and its calls)
    const handleMouseUp = (row, col) => {
        setMouseIsPressed(false);
        if(!(addWalls||reset||animation)){
            const newGrid = getNewGridWalls(grid, row, col);
            setGrid(newGrid);
        }
    };

    const updateGrid = (extra_class, row, col) => {
        document.getElementById(`node-${row}-${col}`).className =
        'node '.concat(extra_class);
    }


    const getNewGridWalls = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
          ...node,
          isWall: addWalls &&!node.isStart &&!node.isEnd,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    const find = (start_end) => {
        for(let i = 0; i < grid.length; ++i){
            for(let j = 0; j<grid[0].length; ++j){
                if(grid[i][j].isStart && start_end==='start'){
                    return [i, j];
                }
                else if (grid[i][j].isEnd && start_end==='end'){
                    return [i, j];
                }
            }
        }

        return false;
    }

    const getWallsArray = () => {
        const walls = [];
        for(let i = 0; i< grid.length; ++i){
            walls[i] = [];
            for(let j=0; j<grid[0].length; ++j){
                walls[i][j] = grid[i][j].isWall;
                if(!grid[i][j].isStart && !grid[i][j].isEnd && !grid[i][j].isWall){
                    updateGrid("", i, j);
                }
            }
        }
        return walls;
    }

    const resetGrid = () => {
        
        const walls = getWallsArray();
        setWalls(walls);
        //const newGrid = createGrid({start: startNode, end: endNode, walls:walls});
        //setGrid(newGrid);
        setReset(false);
        setAddsWalls(true);
        setPopupOpen(false);
    }

    const resetAll = () => {
        if(reset){
            resetGrid();
        }
        //const newGrid = createGrid({start:startNode, end:endNode});
        //setGrid(newGrid);
        setWalls([]);
        setAddsWalls(true);
        setPopupOpen(false);
    }

    const togglePopup = () => {
        if(!animation) setPopupOpen(!popupOpen);
    }

    const toggleWalls = () => {
        if(reset){
            resetGrid();
        }
        setAddsWalls(!addWalls);
        setPopupOpen(false);
        setMouseIsPressed(false);
        cancelChange();
    }

    const updateChangeStart = () => {
        if(reset){
            resetGrid();
        }
        setPopupOpen(false);
        setChangeStart(true);
        setChangeEnd(false);
        setAddsWalls(true);
        let start = find('start');
        updateGrid("node-hover-start", start[0], start[1]);
    }

    const updateChangeEnd = () => {
        if(reset){
            resetGrid();
        }
        setPopupOpen(false);
        setChangeEnd(true);
        setChangeStart(false);
        setAddsWalls(true);
        let end = find('end');
        updateGrid("node-hover-end", end[0], end[1]);
    }

    const cancelChange = () => {
        setChangeStart(false);
        setChangeEnd(false);
        let start = find('start');
        updateGrid("node-start", start[0], start[1]);
        let end = find('end');
        updateGrid("node-end", end[0], end[1]);
    }

    const rows = [];
    for(let i = 10; i<=30; i++){
        rows.push(i);
    }

    const cols = [];
    for(let i = 10; i<=70; i++){
        cols.push(i);
    }

    const updateRows = (e) => {
        if(reset){
            resetGrid();
        }
        setNumRows(e.target.value);
    }

    const updateCols = (e) => {
        if(reset){
            resetGrid();
        }
        setNumCols(e.target.value);
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <button onClick={togglePopup} className="settings"><span className="fa fa-gear"></span></button>
            <div className='header'>
                {!animation && !reset && !(changeStart || changeEnd) && <button onClick={solveDijkstra}>Solve via Dijkstra's Algorithm</button>}
                {reset && !(changeStart || changeEnd) && <button onClick = {resetGrid}>Reset Grid </button>}
                {changeStart && <h3 style={{marginTop:'0px'}}>Select New Start Node</h3>} {/*Colour Green/red baed on action */}
                {changeEnd && <h3 style={{marginTop:'0px'}}>Select New End Node</h3>} {/*Colour Green/red baed on action */}
                {(changeStart||changeEnd) && <button style = {{marginBottom:'0px'}} onClick={cancelChange}>Cancel</button>}
                <br></br>
            </div>

            <div className='grid'>
                {grid.map((row, row_index) => {
                    return <div key = {row_index}>
                        {row.map((node, col_index) => {
                            const {row, col, isStart, isEnd, isWall, isHover} = node;
                            return <Node 
                                        key = {col_index} 
                                        col= {col}
                                        row = {row}
                                        isStart = {isStart} 
                                        isEnd = {isEnd}
                                        isWall = {isWall}
                                        mouseIsPressed = {mouseIsPressed}
                                        isHover = {isHover}
                                        onMouseDown = {(row, col) => handleMouseDown(row, col)}
                                        onMouseEnter = {(row, col) => handleMouseEnter(row, col)}
                                        onMouseLeave = {(row, col) => handleMouseLeave(row, col)}
                                        onMouseUp = {(row, col) => handleMouseUp(row, col)}
                                    ></Node>
                            })
                        }
                    </div>
                })}
            </div>
            {popupOpen && <Popup
                            content={<>
                                    <div className="row">
                                        <div className="column">
                                            <b>Reset All</b> 
                                        </div>
                                        <div className="column">
                                            <button onClick={resetAll}><span className={"fa fa-refresh"}></span></button> 
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="column">
                                            {!addWalls?<b>Add Walls</b>:<b>Remove Walls</b>}
                                        </div>
                                        <div className="column">
                                            <button onClick={toggleWalls}><span className={!addWalls?"fa fa-wrench":"fa fa-bomb"}></span></button>  {/*style={{marginTop:"20px"}}*/}
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="column">
                                            <b>Grid Size</b>
                                        </div>
                                        <div className="column">
                                            <div className="row" style={{marginBottom:"10px"}}>
                                                <div className="column">
                                                    <b style={{fontSize:"15px"}}>Rows</b>
                                                </div>
                                                <div className="column">
                                                <b style={{fontSize:"15px"}}>Columns</b>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="column">
                                                <select name="row-select" value={numRows} onChange={updateRows}>
                                                    {rows.map( (i) => {
                                                        return (<option key = {i} value = {i}>{i}</option>)
                                                    })}
                                                </select>
                                                    </div>
                                                    <div className="column">
                                                        <select name="col-select" value={numCols} onChange={updateCols}>
                                                    {cols.map( (i) => {
                                                        return (<option key = {i} value = {i} >{i}</option>)
                                                    })}
                                                </select>
                                                    </div>
                                                
                                            </div>                                            
                                        </div>

                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="column">
                                            <button onClick = {updateChangeStart}>Change Start Node</button> 
                                        </div>
                                        <div className="column">
                                            <button onClick={updateChangeEnd}>Change End Node</button> 
                                        </div>
                                    </div>
                                    <br></br>
                                    <button>Done</button>

                                    </>}
                            handleClose={togglePopup}
                            />
            }
            
        </div>
        
    );
}

