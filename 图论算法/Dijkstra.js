// Dijkstra算法：带权有向图，单源到其余各顶点的最短路径
// 不适用于存在负边的情况

const G = [
    [0,3,9,0,0,0,0],
    [0,0,0,7,1,0,0],
    [0,2,0,7,0,0,0],
    [0,0,0,0,0,2,8],
    [0,0,4,5,0,9,0],
    [0,0,0,0,0,0,4],
    [0,0,0,0,0,0,0]
];

function Dijkstra(graph,src){
    const dist = [];//用来记录，一点源点，到其他顶点的距离的数组。
    const visited = [];//用来表示已经访问的节点。

    const INF = Number.MAX_SAFE_INTEGER;
    //初始化数组
    for(let i = 0; i < graph.length; i++){
        dist[i] = INF;
        visited[i] = false;
    }

    let a = 0;//用来记录遍历的数量
    dist[src] = 0;
    while(a < graph.length-1){
        let edg = graph[src];
        visited[src] = true;
        for(let j = 0; j < edg.length; j++){
            if(edg[j] !== 0){
                if(dist[src] + edg[j] < dist[j]){//记录最短路径
                    dist[j] = dist[src] + edg[j];//更新最短路径
                }
            }
        }
        
        let min = INF;
        let minIndex = -1;
        //选出路径最短的节点，并且下一轮循环从这节点开始
        for(let b = 0; b < dist.length; b++){
            if(!visited[b]&&dist[b]<min){
                min = dist[b];
                minIndex = b;
            }
        }
        src = minIndex;
        a++;
    
    }
    return dist;
}

console.log(Dijkstra(map,0))