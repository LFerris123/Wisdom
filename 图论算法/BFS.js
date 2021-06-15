// BFS 广度优先搜索
// 广度优先搜索算法的思想就是将所有的目标按照遍历的深度分层，先将同一层次的节点遍历完后再开始下一层次的遍历。

const map = [ // 这是迷宫图，不是邻接矩阵
    [0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1],
    [0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1],
    [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
];

// 对于迷宫图

/**
 * BFS迷宫图的最短路的距离，并不能得到具体路径
 * @param {*} map 迷宫图
 * @param {*} x0 起点
 * @param {*} y0 
 */
 function BFS_Maze(map,x0,y0){
    var sizeX = map.length;
    var sizeY = map[0].length;
    var WaitToVisit = [];
    var distances = new Array(sizeX);
    for(let i=0;i<sizeX;i++){
        distances[i] = new Array(sizeY).fill(10000);
    }
    function visit(x,y){
        // 不超过边界 / 未到达过(或有捷径) -->更新并加入待访问队列
        if(x-1>=0 && !map[x-1][y] && distances[x-1][y] > distances[x][y]+1){
            distances[x-1][y] = distances[x][y]+1;
            WaitToVisit.push({x:x-1,y:y});
        }
        if(x+1<sizeX && !map[x+1][y] && distances[x+1][y] > distances[x][y]+1){
            distances[x+1][y] = distances[x][y]+1;
            WaitToVisit.push({x:x+1,y:y});
        }
        if(y-1>=0 && !map[x][y-1] && distances[x][y-1] > distances[x][y]+1){
            distances[x][y-1] = distances[x][y]+1;
            WaitToVisit.push({x:x,y:y-1});
        }
        if(y+1<sizeY && !map[x][y+1] && distances[x][y+1] > distances[x][y]+1){
            distances[x][y+1] = distances[x][y]+1;
            WaitToVisit.push({x:x,y:y+1});
        }
    }

    distances[x0][y0] = 0;
    visit(x0,y0);
    while(WaitToVisit.length!=0){
        let next = WaitToVisit.shift();
        visit(next.x,next.y);
    }
    return distances;
}


/**
 * A*算法是对上方算法的改进：启发式搜索(将曼哈顿距离作为估计函数)
 * @param {*} G 迷宫图
 * @param {*} x0 起点
 * @param {*} y0 
 * @param {*} x1 终点
 * @param {*} y1
 * @returns 
 */
function BFS_AStar(map,x0,y0,x1,y1){
    var sizeX = map.length;
    var sizeY = map[0].length;
    var WaitToVisit = [];
    var distances = new Array(sizeX);
    for(let i=0;i<sizeX;i++){
        distances[i] = new Array(sizeY).fill(10000);
    }

    function addWaitNode(newNode){
        for(let i=0,len=WaitToVisit.length;i<len;i++){
            if(newNode.d < WaitToVisit[i].d){
                WaitToVisit.splice(i,0,newNode);
                return;
            }
        }
        WaitToVisit.push(newNode);
    }

    function visit(x,y){
        if(x-1>=0 && !map[x-1][y] && distances[x-1][y] > distances[x][y]+1){
            distances[x-1][y] = distances[x][y]+1;
            addWaitNode({x:x-1,y:y,d:Math.abs(x-1-x1)+Math.abs(y-y1)});
        }
        if(x+1<sizeX && !map[x+1][y] && distances[x+1][y] > distances[x][y]+1){
            distances[x+1][y] = distances[x][y]+1;
            addWaitNode({x:x+1,y:y,d:Math.abs(x+1-x1)+Math.abs(y-y1)});
        }
        if(y-1>=0 && !map[x][y-1] && distances[x][y-1] > distances[x][y]+1){
            distances[x][y-1] = distances[x][y]+1;
            addWaitNode({x:x,y:y-1,d:Math.abs(x-x1)+Math.abs(y-1-y1)});
        }
        if(y+1<sizeY && !map[x][y+1] && distances[x][y+1] > distances[x][y]+1){
            distances[x][y+1] = distances[x][y]+1;
            addWaitNode({x:x,y:y+1,d:Math.abs(x-x1)+Math.abs(y+1-y1)});
        }
    }

    distances[x0][y0] = 0;
    visit(x0,y0);
    while(WaitToVisit.length!=0){
        let next = WaitToVisit.shift();
        visit(next.x,next.y);
    }
    return distances;
}

// 对于邻接矩阵

/**
 * 无权图的单源最短路径问题：从起始点到其他所有点。  
 * 可以改写成到达确定一点的最短距离及路径(修改**循环判断处**-->待访问节点是否包含目标节点？)
 * @param {*} G 图的邻接矩阵
 * @param {*} start 起点
 */
 function BFS(G,start){
    var size = G.length;//顶点数
    var Visited = new Array(size).fill(false);// 记录是否到达
    var path = new Array(size).fill(-1);// 记录前驱顶点
    var distances = new Array(size).fill(-1);// 到达各顶点的路径长
    var WaitToVisit = [];// 邻居顶点
    // 访问节点
    function visit(node){
        for(let i=0;i<size;i++){ // 循环顶点
            if(!Visited[i] && G[node][i]>0){ // 未访问且有路径连接
                WaitToVisit.push(i); // 放入待访问队列
                distances[i] = distances[node]+1; // 更新路径长
                path[i] = node; // 更新前驱节点
            }
        }
        Visited[node] = true; // 已访问
    }
    distances[start] = 0; // 起始节点距离为0
    path[start] = -1; // 起始节点无前驱节点
    visit(start); // 访问起始节点
    while(WaitToVisit.length!=0){ // 待访问队列不为空
        let from = WaitToVisit.shift(); // 弹出一个节点
        visit(from); // 访问
    }
    return {
        distances,
        path
    }
}

