import { manhattanDistance, getUnvisitedNeighbours, sortNodes } from "./helpers";
// Greedy best-first search algorithm
// Returns an array of visited nodes (closed set) between startNode and endNode using manhattan distance as heuristic
export function greedyBestFirstSearch(grid, startNode, endNode) {

    // hCost (heuristic cost) estimated cost to the end from the current node
    // Saved under node.cost
    getHCosts(endNode, grid)

    // Initialize Visited List
    const visited = [];
    // Initialize unvisited list
    const unvisited = [startNode];

    do {
        sortNodes(unvisited) //Sort the unvisited nodes by cost (reverse order)
        const cur_node = unvisited.pop() //Get the lowest cost node
        
        // Update value of current node and append to visited list
        cur_node.isVisited = true;
        visited.push(cur_node);

        // If endnode is found, terminate function
        if (cur_node === endNode) {
            return visited;
        }

		// Check the neighbours of the current node
        const unvisited_neighbours = getUnvisitedNeighbours(cur_node, grid);
        for (const neighbour of unvisited_neighbours) {
            if (!unvisited.includes(neighbour)) {
                neighbour.previousNode = cur_node;
                unvisited.push(neighbour);
            }
        }
    } while (unvisited.length);
    return visited;
}

//Gets hCosts relative to end node (manhattan distance)
const getHCosts = (endNode, grid) => {
    for (let row = 0; row < grid.length; ++row) {
        for (let col = 0; col < grid[row].length; ++col) {
            const node = grid[row][col];
            node.cost = manhattanDistance(endNode, node);
        }
    }
};