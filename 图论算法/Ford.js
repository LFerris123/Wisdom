// Ford算法：单源最短路径，从一个节点到达其他所有节点的最短路径
// 可以存在负权边

const G = [
    [0,3,9,0,0,0,0],
    [0,0,0,7,1,0,0],
    [0,2,0,7,0,0,0],
    [0,0,0,0,0,2,8],
    [0,0,4,5,0,9,0],
    [0,0,0,0,0,0,4],
    [0,0,0,0,0,0,0]
];

function Ford(map,start){
    var MAX_VALUE = 10000;
    var size = map.length;
    var distances = new Array(size).fill(MAX_VALUE);
    distances[start] = 0;

    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if( map[i][j] ==0 && i!=j){
                map[i][j] = MAX_VALUE;
            }
        }
    }
    
    // 判断是否存在负权环
    let flag;
    for(let count = 1; count<size+1;count++){ // 循环size-1次
        flag = false;
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){ //任一边(i,j)
                if(distances[j] > distances[i] + map[i][j]){
                    distances[j] = distances[i] + map[i][j];
                    flag = true;
                }
            }
        }
    }

    return {
        distances,
        flag
    }
}

// SPFA ：Ford算法改进，加入了队列处理
function SPFA(map,start){
    var MAX_VALUE = 10000;
    var size = map.length;
    var distances = new Array(size).fill(MAX_VALUE);
    distances[start] = 0;

    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if( map[i][j] ==0 && i!=j){
                map[i][j] = MAX_VALUE;
            }
        }
    }

    // 队列，用于松弛的节点
    var queue = [start];
    
    while(queue.length!=0){
        let target = queue.shift();
        for(let i=0;i<size;i++){
            if(distances[i] > distances[target] + map[target][i]){
                distances[i] = distances[target] + map[target][i];
                queue.push(i);
            }
        }
    }
    return {
        distances
    }
}



console.log(SPFA(G,0));
