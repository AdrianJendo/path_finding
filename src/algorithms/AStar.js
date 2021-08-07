// Returns an array of visited nodes (closed set) between startNode and endNode using A* with manhattan distance
export function AStar(grid, startNode, endNode) {
    // Initialize Visited List
    const closedSet = [];
    // Initialize unvisited list
    const openSet = {};

    // gCost minimum distance from start node to current node
    // hCost (heuristic cost) estimated cost to the end from the current node
    const [gCosts, hCosts] = getGHCosts(startNode, endNode, grid)

    startNode.cost = hCosts[startNode.id]; // Represents the fCost of start node
    openSet[startNode.id] = startNode;

    do {
        const cur_node = findSmallestFCost(openSet);
        delete openSet[cur_node.id]
        
        // Update value of current node and append to visited list
        closedSet.push(cur_node);
        cur_node.isVisited = true;

        // If endnode is found, terminate function
        if (cur_node === endNode) {
            return closedSet;
        }

		// Check the neighbours of the current node
        const unvisited_neighbours = getUnvisitedNeighbours(cur_node, grid);
        for (const neighbour of unvisited_neighbours) {
            const gCost = gCosts[cur_node.id] + 1;
            if (gCost < gCosts[neighbour.id]) {
                gCosts[neighbour.id] = gCost;
                neighbour.cost = gCost + hCosts[neighbour.id]; // fCost
                neighbour.previousNode = cur_node;
                if (openSet[neighbour.id] !== null) {
                    openSet[neighbour.id] = neighbour;
                }
            }
        }
    } while (Object.keys(openSet).length !== 0);
    return closedSet;
}

//Gets gCosts (Infinity except for start) & hCosts relative to end node (manhattan distance)
const getGHCosts = (startNode, endNode, grid) => {
    const hCosts = {};
    const gCosts = {};

    for (let row = 0; row < grid.length; ++row) {
        for (let col = 0; col < grid[row].length; ++col) {
            const node = grid[row][col];
            hCosts[node.id] = manhattanDistance(endNode, node);
            if (node === startNode) {
                gCosts[node.id] = 0;
            }
            else {
                gCosts[node.id] = Infinity;
            }
        }
    }
	return [gCosts, hCosts];
};

const findSmallestFCost = (openSet) => {
    let openSetValues = Object.values(openSet)
    let smallest_node = openSetValues[0];
	for (const val of openSetValues) {
		if (val.cost < smallest_node.cost) {
			smallest_node = val;
		}
	}

	return smallest_node;
}

//AStar heuristic
//https://datascience.stackexchange.com/questions/20075/when-would-one-use-manhattan-distance-as-opposed-to-euclidean-distance
//So in a nutshell: Manhattan distance generally works only if the points are arranged in the form of a grid and the problem which we are working on gives more priority to the distance between the points only along with the grids, but not the geometric distance.
const manhattanDistance = (node, target) => {
    return Math.abs(node.row-target.row) + Math.abs(node.col-target.col);
}

//Returns a list of unvisited nodes surrounding the current node
const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = [];
    const {col, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour =>
        !neighbour.isVisited && !neighbour.isWall
    );
}