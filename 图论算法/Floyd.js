// Floyd算法：一次性计算出所有节点的最短路径及距离
// 三重循环，复杂度较高，适用于小型图

// 邻接矩阵
const G = [
    [0,3,9,0,0,0,0],
    [0,0,0,7,1,0,0],
    [0,2,0,7,0,0,0],
    [0,0,0,0,0,2,8],
    [0,0,4,5,0,9,0],
    [0,0,0,0,0,0,4],
    [0,0,0,0,0,0,0]
];

function Floyd(map){
    var MAX_VALUE = 10000;
    var size = map.length;
    var distances = new Array(size); // 记录最短路径
    // 记录路径 path[i][j]
    // -1：表示i与j之间无路径
    // >=0：表示i与j之间需经过点path[i][j]
    var path = new Array(size);
    for(let i=0;i<size;i++){
        distances[i] = new Array(size).fill(MAX_VALUE);
        path[i] = new Array(size).fill(-1);
    }
    // 根据map初始化
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(i == j){
                distances[i][j] = 0;
            }
            if(map[i][j] > 0){
                distances[i][j] = map[i][j];
            }
        }
    }

    // 三重循环(对任一点k，与任意两点i,j之间)  -->注意for循环k,i,j的顺序
    for(let k=0;k<size;k++){
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){
                if(distances[i][k] == MAX_VALUE) continue;
                if(distances[k][j] == MAX_VALUE) continue;
                if(distances[i][j] > distances[i][k] + distances[k][j]){
                    path[i][j] = (path[i][k]==-1) ? k:path[i][k];
                    distances[i][j] = distances[i][k] + distances[k][j];
                }
            }
        }
    }

    return {
        distances,
        path
    }
}

console.log(Floyd(G));

