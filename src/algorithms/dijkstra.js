import { sortNodes, getUnvisitedNeighbours } from "./helpers";

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