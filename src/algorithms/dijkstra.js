//Returns an array of visited nodes between startNode and endNode using Dijstra's Algorithm
export function dijkstra(grid, startNode, endNode){
    //if (!startNode || !endNode || startNode===endNode || !grid.length){
    //    return false;
    //}

    //Initialize Visited List
    const visited = [];

    //Initialize unvisited list
    const unvisited = [];
    //Weights / Distances
    for (let row = 0; row<grid.length; ++row){
        for (let col = 0; col<grid[0].length; ++col){
            unvisited.push(grid[row][col]); //Fill out unvisited list
        }
    }

    startNode.cost = 0;
    while(unvisited.length){
        sortNodes(unvisited) //Sort the unvisited nodes by cost (reverse order)
        let cur_node = unvisited.pop() //Get the lowest cost node

        //Pass if current node is a wall or it has no previous node (ie: it is beind a wall)
        if (cur_node.isWall) continue;

        //Update value of current node and append to visited list
        cur_node.isVisited = true;
        visited.push(cur_node);
        
        //If current node has distance infinity, stop
        if (cur_node.cost === Infinity) return visited;

        //If endnode is found, terminate function
        if (cur_node === endNode) {
            return visited;
        } else {
            updateNeighbours(cur_node, grid);
        }
    }
}

//Returns reverse ordered array of unvisited nodes by cost
const sortNodes = (unvisited) => {
    //Iterates through unvisited array and compares each pair of nodes
    //If b - a > 0, swap position of b & a
    unvisited.sort((a, b) => b.cost - a.cost);
}

//Updates the nodes surrounding the current node to include the current node as the previous node
const updateNeighbours = (node, grid) => {
    let  unvisited_neighbours = getUnvisitedNeighbours(node, grid);
    for (const neighbour of unvisited_neighbours){
        neighbour.previousNode = node;
        neighbour.cost = node.cost+1;
    }
}

//Returns a list of unvisited nodes surrounding the current node
const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = [];
    const {col, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited); //&& !neighbour.isWall <--------------------------------------------------------------------------------!!!
}

//Returns a list of the shortest path of nodes
//Uses backtracking to go from endNode to startNode
export function getShortestPath(endNode) {
    const shortestPath = [];
    let cur = endNode;
    while(cur) {
        shortestPath.unshift(cur); //Add current node to start of shortestPath list
        cur = cur.previousNode;
    }

    return shortestPath;
}
