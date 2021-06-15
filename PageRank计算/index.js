// 计算图中各个节点的重要程度的算法
// 利用网页的连接关系计算网页的重要程度

const G = [
    [0,1,1,0,0,0,0,0],
    [0,0,0,1,1,0,0,0],
    [0,0,0,0,0,1,1,0],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,1,0],
    [0,0,0,0,0,1,0,0],
    [1,0,0,0,0,0,0,0]
]

function PageRank(map){
    var size = map.length;

    // 同等缩减因子
    const rate = 0.8;

    // 存储节点的重要程度指标
    var Rank = new Array(size).fill(1/size);

    function run(){
        // 迭代后的重要程度指标
        let newRank = new Array(size).fill(0);
        for(let i=0;i<size;i++){
            let To = [];// 存储指向的节点
            for(let j=0;j<size;j++){
                if(map[i][j] > 0) To.push(j);
            }
            if(To.length == 0){
                newRank[i] = Rank[i];
                continue;
            }
            let amount = Rank[i]/To.length;
            // 更新
            for(let j=0,len = To.length;j<len;j++){
                newRank[To[j]] += amount;
            }
        }

        // 同等缩减与统一补偿
        newRank.forEach( (element,index) =>{
            newRank[index] *= rate;
            newRank[index] += (1-rate)/size;
        })

        // 判断迭代是否结束
        let flag = true;
        for(let i=0;i<size;i++){
            if(Rank[i] != newRank[i]) flag = false;
            Rank[i] = newRank[i];
        }

        if(!flag) run();
    }
    run();

    return {
        Rank
    }
}

console.log(PageRank(G));