import React, { useCallback, useEffect, useState } from 'react';
import { Node } from './Node/Node';
import { Popup } from './Popup';
import "./PathfindingVisualizer.css";
import { dijkstra } from "../algorithms/dijkstra";
import { getShortestPath } from "../algorithms/helpers";
import { AStar } from "../algorithms/AStar";
import {greedyBestFirstSearch} from "../algorithms/greedybest"

const NUMROWS = 25;
const NUMCOLS = 50;
const START_NODE_ROW = 12;
const START_NODE_COL = 5;
const END_NODE_ROW = 12;
const END_NODE_COL = 45;
const ANIMATION_SPEED = 12;

//For later
//Code using A* and also switch between Dijsktra and A*

export function PathfindingVisualizer() {

    //States for handling grid, animation, popup, mouse
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [reset, setReset] = useState(false);
    const [animation,setAnimation] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [addWalls, setAddsWalls] = useState(true);
    
    //States for handling special nodes, gride size
    const [numRows, setNumRows] = useState(NUMROWS);
    const [numCols, setNumCols] = useState(NUMCOLS);
    const [changeStart, setChangeStart] = useState(false);
    const [startNode, setStartNode] = useState({row:START_NODE_ROW, col:START_NODE_COL});
    const [changeEnd, setChangeEnd] = useState(false);
    const [endNode, setEndNode] = useState({row:END_NODE_ROW, col:END_NODE_COL});
    const [walls, setWalls] = useState([]);

    //For rows & column dropdown menus
    const rows = [];
    for(let i = 10; i<=30; i++){
        rows.push(i);
    }
    const cols = [];
    for(let i = 10; i<=70; i++){
        cols.push(i);
    }

    //function for creating/updating the grid
    //called whenever dependencies are changed
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

    //set new grid any time function is changed
    useEffect(() => {
        const new_grid = createGrid();
        setGrid(new_grid);
    }, [createGrid]);

    
    //Returns new node
    const createNode = (row, col, {start, end, walls}={}) => {
        let start_node = row === start.row && col === start.col;
        let end_node = row === end.row && col === end.col;
        return {
            row,
            col,
            isStart : start_node,
            isEnd: end_node,
            isVisited : false,
            isWall : walls.length && row<walls.length && col < walls[0].length && walls[row][col],
            isHover : false,
            previousNode : null,
            cost: Infinity,
            id: "row" + row.toString() + "col" + col.toString() // Unique permutation so that each node has its own string id
        };
    };


    //Solves current grid using Dijkstra's Algorithm
    const solveDijkstra = () => {
        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];
        const visited_nodes = dijkstra(grid, start, end); //returns a list of visited nodes
        const shortest_path_list = getShortestPath(end); //returns the shortest path from end node to start node
        animateDijkstra(visited_nodes, shortest_path_list);
        setAnimation(true);
    };

    //Solves current grid using A*
    const solveAStar = () => {
        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];
        const visited_nodes = AStar(grid, start, end); //returns a list of visited nodes
        const shortest_path_list = getShortestPath(end); //returns the shortest path from end node to start node
        animateDijkstra(visited_nodes, shortest_path_list);
        setAnimation(true);
    };

    //Solves current grid using greedy best-first search
    const solveGreedyBestFirstSearch = () => {
        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];
        const visited_nodes = greedyBestFirstSearch(grid, start, end); //returns a list of visited nodes
        const shortest_path_list = getShortestPath(end); //returns the shortest path from end node to start node
        animateDijkstra(visited_nodes, shortest_path_list);
        setAnimation(true);
    };

    //Animates Dijkstra's Algorithm
    const animateDijkstra = (visited_nodes, shortest_path_list) => {
        //Iterate through visited nodes
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
                if(!node.isStart && !node.isEnd){
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
                }
              }, ANIMATION_SPEED*i);
        }      
        
        //After animating the visited nodes, do the shortest path animation
        setTimeout(() => {
            animateShortestPath(shortest_path_list);
        }, ANIMATION_SPEED * visited_nodes.length)
    };

    //Animates shortest path
    const animateShortestPath = (shortest_path) => {
        for(let i = 0; i < shortest_path.length; ++i){
            setTimeout( () => {
                const node = shortest_path[i];
                if(i!==0 && i!==shortest_path.length-1){
                    //Updating only the class to improve speed/fluidity of animation
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
    //Handles all possible events that occur when mouse is clicked on a node
    const handleMouseDown = (row, col) => {
        //Updating start node
        if(changeStart && !grid[row][col].isWall && !grid[row][col].isEnd){
            let start_node = find('start');
            grid[start_node[0]][start_node[1]].isStart = false;
            setStartNode({row:row, col:col});
            setChangeStart(false);
        }
        //Updating end node
        else if (changeEnd && !grid[row][col].isWall && !grid[row][col].isStart){
            let end_node = find('end');
            grid[end_node[0]][end_node[1]].isEnd = false;
            setEndNode({row:row, col:col});
            setChangeEnd(false);
        }
        //Invalid node selected for new start/end node
        else if (changeEnd || changeStart){
            alert('Please choose another space');
            return;
        }
        //Adding a wall
        else if(!mouseIsPressed && !reset && !animation){
            getNewGridWalls(grid, row, col);
            const walls = getWallsArray();
            setWalls(walls);
        } 
        setMouseIsPressed(!mouseIsPressed);
    };

    //Handles scenarios for when mouse enters a node
    const handleMouseEnter = (row, col) => {
        //Changing background colour of node when hovering
        //Hover for new start node
        if(changeStart && !grid[row][col].isEnd && !grid[row][col].isWall){
            updateGrid("node-hover-start", row, col);
        }
        //Hover for new end node
        else if(changeEnd && !grid[row][col].isStart && !grid[row][col].isWall){
            updateGrid("node-hover-end", row, col);
        }
        else{
            //Hover for wall
            if(!(mouseIsPressed || grid[row][col].isWall || grid[row][col].isStart || grid[row][col].isEnd|| grid[row][col].isVisited || reset || animation) && addWalls){
                updateGrid("node-hover", row, col);
            }
            //Hover for delete wall
            else if (!addWalls && grid[row][col].isWall && !reset && !animation){
                updateGrid("node-hover-red", row, col);
            }
            //Adding a new wall
            if (mouseIsPressed && addWalls && !reset && !animation) {
                getNewGridWalls(grid, row, col);
                const walls = getWallsArray();
                setWalls(walls);
            }
        }        
    };

    //Handles scenarios for when mouse leaves a node
    const handleMouseLeave = (row, col) => {
        //Removing class added from hover
        if(!(mouseIsPressed || grid[row][col].isWall || grid[row][col].isStart || grid[row][col].isEnd || grid[row][col].isVisited) ||
            ((changeStart || changeEnd) && !grid[row][col].isStart && !grid[row][col].isEnd && !grid[row][col].isWall))
        {
            updateGrid("", row, col);
        }
        //Changing previous 'hover class' if node is a wall
        else if (grid[row][col].isWall){
            updateGrid("node-wall", row, col);
        }
        //Remove wall
        if(mouseIsPressed && !addWalls && !reset && !animation) {
            getNewGridWalls(grid, row, col);
            const walls = getWallsArray();
            setWalls(walls);
        }
    }
    
    //Enables click and hold to place/remove
    //If want to click once to place and click again to stop placing, just delete this function (and its calls)
    const handleMouseUp = (row, col) => {
        setMouseIsPressed(false);
        
        if(!(addWalls||reset||animation)){
            getNewGridWalls(grid, row, col);
            const walls = getWallsArray();
            setWalls(walls);
        }
    };

    //Add extra node class to grid space for any hover effects
    const updateGrid = (extra_class, row, col) => {
        document.getElementById(`node-${row}-${col}`).className =
        'node '.concat(extra_class);
    }

    //Not actually shallow copy since 2D array, each node object in each column points to original node from grid
    //Function updated the isWall property for the space
    const getNewGridWalls = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
          ...node,
          isWall: addWalls &&!node.isStart &&!node.isEnd,
        };
        newGrid[row][col] = newNode;
    };

    //Finds (row,col) of the start/end node <- specified by string
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

    //Returns 2D bool array of grid to determine wall locations 
    //Also updates any non start,end, or wall nodes to have no extra class
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

    //Resets grid (maintaining walls and start/end node)
    const resetGrid = () => {
        const walls = getWallsArray();
        setWalls(walls);
        setReset(false);
        setAddsWalls(true);
        setPopupOpen(false);
    }

    //Resets grid including all walls
    const resetAll = () => {
        if(reset){
            resetGrid();
        }
        setWalls([]);
        setAddsWalls(true);
        setPopupOpen(false);
    }

    //Toggles popup menu
    const togglePopup = () => {
        if(!animation) setPopupOpen(!popupOpen);
    }

    //Toggles wall setting (between add and destroy)
    const toggleWalls = () => {
        if(reset){
            resetGrid();
        }
        setAddsWalls(!addWalls);
        setPopupOpen(false);
        setMouseIsPressed(false);
        cancelChange();
    }

    //Updating grid to select new start node
    const updateChangeStart = () => {
        if(reset){
            resetGrid();
        }
        cancelChange(); //Handling case where other node is being updated
        setPopupOpen(false);
        setChangeStart(true);
        setChangeEnd(false);
        setAddsWalls(true);
        let start = find('start');
        updateGrid("node-hover-start", start[0], start[1]);
    }

    //Updating grid to select new end node
    const updateChangeEnd = () => {
        if(reset){
            resetGrid();
        }
        cancelChange(); //Handling case where other node is being updated
        setPopupOpen(false);
        setChangeEnd(true);
        setChangeStart(false);
        setAddsWalls(true);
        let end = find('end');
        updateGrid("node-hover-end", end[0], end[1]);
    }

    //Cancelling update start/end selection
    const cancelChange = () => {
        setChangeStart(false);
        setChangeEnd(false);
        let start = find('start');
        updateGrid("node-start", start[0], start[1]);
        let end = find('end');
        updateGrid("node-end", end[0], end[1]);
    }

    //Updating number of rows
    const updateRows = (e) => {        
        setNumRows(e.target.value);
        let count = 1;
        if(startNode.row >= e.target.value){
            //handle if (node is endNode) or (node is a wall)
            if(e.target.value-count === endNode.row && startNode.col === endNode.col){
                count++;
            }
            grid[e.target.value-count][startNode.col].isWall=false;
            setStartNode({...startNode, row:e.target.value-count});
        }
        if (endNode.row >= e.target.value){
            //handle if (node is endNode) or (node is a wall)
            if((e.target.value-count === startNode.row || startNode.row >= e.target.value) && startNode.col === endNode.col){ //incude case where start and end are in same column
                count++;
            }
            grid[e.target.value-count][endNode.col].isWall=false;
            setEndNode({...endNode, row:e.target.value-count});
        }
        if(reset){
            resetGrid();
        }
        else{
            const walls = getWallsArray();
            setWalls(walls);
        }
    }

    //Updating number of columns
    const updateCols = (e) => {        
        setNumCols(e.target.value);
        let count = 1;
        if(startNode.col >= e.target.value){
            //handle if (node is endNode) or (node is a wall)
            if(e.target.value-count === endNode.col && startNode.row === endNode.row){
                count++;
            }
            grid[startNode.row][e.target.value-count].isWall=false;
            setStartNode({...startNode, col:e.target.value-count});
        }
        if (endNode.col >= e.target.value){
            //handle if (node is endNode) or (node is a wall)
            if((e.target.value-count === startNode.col || startNode.col >= e.target.value) && startNode.row === endNode.row){ //incude case where start and end are in same row
                count++;
            }
            grid[endNode.row][e.target.value-count].isWall=false;
            setEndNode({...endNode, col:e.target.value-count});
        }
        if(reset){
            resetGrid();
        }
        else{
            const walls = getWallsArray();
            setWalls(walls);
        }
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <button onClick={togglePopup} className="settings"><span className="fa fa-gear"></span></button>
            <div className='header'>
                {!animation && !reset && !(changeStart || changeEnd) &&
                    <div>
                        <button className="headerButton" onClick={solveDijkstra}>Dijkstra's Algorithm</button>
                        <button className = "headerButton" onClick={solveAStar}>A* Algorithm</button>
                        <button className = "headerButton" onClick={solveGreedyBestFirstSearch}>Greedy Best-First Search</button>
                    </div>
                }
                {reset && !(changeStart || changeEnd) && <button onClick = {resetGrid}>Reset Grid </button>}
                {changeStart && <h3 style={{marginTop:'0px', color:'green'}}>Select New Start Node</h3>} 
                {changeEnd && <h3 style={{marginTop:'0px', color:'red'}}>Select New End Node</h3>} 
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
                                    </>}
                            handleClose={togglePopup}
                            />
            }
            
        </div>
        
    );
}

