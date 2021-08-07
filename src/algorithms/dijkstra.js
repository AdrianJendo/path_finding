//Returns an array of visited nodes between startNode and endNode using Dijstra's Algorithm
export function dijkstra(grid, startNode, endNode){
    //if (!startNode || !endNode || startNode===endNode || !grid.length){
    //    return false;
    //}

    //Initialize Visited List
    const visited = [];
    //Initialize unvisited list
    const unvisited = [startNode];
    startNode.cost = 0;

    do {
        sortNodes(unvisited) //Sort the unvisited nodes by cost (reverse order)
        const cur_node = unvisited.pop() //Get the lowest cost node

        // Update value of current node and append to visited list
        cur_node.isVisited = true;
        visited.push(cur_node);
        
        // If endnode is found, terminate function
        if (cur_node === endNode) {
            return visited
        };

        // Updates the nodes surrounding the current node to include the current node as the previous node
        const unvisited_neighbours = getUnvisitedNeighbours(cur_node, grid);
        for (const neighbour of unvisited_neighbours) {
            if (!unvisited.includes(neighbour)) {
                neighbour.previousNode = cur_node;
                neighbour.cost = cur_node.cost + 1;
                unvisited.push(neighbour);
            }
        }
    } while (unvisited.length);
    return visited;
}

//Returns reverse ordered array of unvisited nodes by cost
const sortNodes = (unvisited) => {
    //Iterates through unvisited array and compares each pair of nodes
    //If b - a > 0, swap position of b & a
    unvisited.sort((a, b) => b.cost - a.cost);
}

//Returns a list of unvisited nodes surrounding the current node
const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = [];
    const {col, row} = node;
    if (row > 0) {
        neighbours.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        neighbours.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbours.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        neighbours.push(grid[row][col + 1]);
    }
    return neighbours.filter(neighbour => !neighbour.isVisited && !neighbour.isWall);
}

//Returns a list of the shortest path of nodes
//Uses backtracking to go from endNode to startNode
export function getShortestPath(endNode) {
    const shortestPath = [];
    let cur = endNode;
    while (cur) {
        shortestPath.unshift(cur); //Add current node to start of shortestPath list
        cur = cur.previousNode;
    }

    return shortestPath;
}