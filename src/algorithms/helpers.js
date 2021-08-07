//AStar heuristic
//https://datascience.stackexchange.com/questions/20075/when-would-one-use-manhattan-distance-as-opposed-to-euclidean-distance
//So in a nutshell: Manhattan distance generally works only if the points are arranged in the form of a grid and the problem which we are working on gives more priority to the distance between the points only along with the grids, but not the geometric distance.
export const manhattanDistance = (node, target) => {
    return Math.abs(node.row-target.row) + Math.abs(node.col-target.col);
}

//Returns reverse ordered array of unvisited nodes by cost
export const sortNodes = (unvisited) => {
    //Iterates through unvisited array and compares each pair of nodes
    //If b - a > 0, swap position of b & a
    unvisited.sort((a, b) => b.cost - a.cost);
}

//Returns a list of unvisited nodes surrounding the current node
export const getUnvisitedNeighbours = (node, grid) => {
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