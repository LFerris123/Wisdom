/**
 * 验证朋友悖论：你的朋友的朋友数量总是比你多。  
 * 验证方法：计算每个人的朋友数量；对每一个人的，计算其朋友数量比朋友的朋友数量少的概率  
 * 统计所有人-->朋友悖论成立的概率
 *  */ 
function run(map){
    var size = map.length;
    // 存储各节点的朋友数
    var friendsNumber = new Array(size).fill(0);

    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(map[i][j] > 0){
                friendsNumber[i]++;
            }
        }
    }

    // 存储各节点的朋友比自己多的朋友数
    var friendsNumberMoreThanSelf = new Array(size).fill(0);
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(map[i][j] > 0 && friendsNumber[j] >= friendsNumber[i]){
                friendsNumberMoreThanSelf[i]++;
            }
        }
    }

    // 如果比自己朋友多的朋友数占到了自己的一半以上，表明满足朋友悖论
    var isSuccess = new Array(size).fill(false);
    let count = 0;
    for(let i=0;i<size;i++){
        if(friendsNumberMoreThanSelf[i] > friendsNumber[i]/2){
            isSuccess[i] = true;
            count++;
        }
    }

    // 朋友悖论满足的概率
    let probability = count/size;

    return {
        friendsNumber,
        friendsNumberMoreThanSelf,
        isSuccess,
        probability
    }
    
}


// 邻接矩阵
const G = [
    [0,1,1,0,0,0,0],
    [1,0,1,1,1,0,0],
    [1,1,0,1,1,0,0],
    [0,1,1,0,1,1,1],
    [0,1,1,1,0,1,0],
    [0,0,0,1,1,0,1],
    [0,0,0,1,0,1,0]
];

console.log(run(G));

