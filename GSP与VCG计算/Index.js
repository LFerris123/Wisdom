// 市场定价机制
// 例：广告位的出售

// 各个广告位的点击率
const Hits = [8,5,3,1];

// 各个广告主对点击率的估价
const Values = [10,7,6,3];

function GSP(hits,values){
    var size = hits.length;
    // 价值矩阵：(i,j)广告主i对广告位j的估价
    var worth = new Array(size);
    for(let i=0;i<size;i++){
        worth[i] = new Array(size).fill(0);
        for(let j=0;j<size;j++){
            worth[i][j] = values[i]*hits[j];
        }
    }
    // 广告主的点击价 (次级价格)
    var paid = new Array(size).fill(0);
    // 广告主的回报价
    var feedBack = new Array(size).fill(0);
    paid.forEach((element,index)=>{
        if(index != paid.length-1){
            paid[index] = values[index+1];
            feedBack[index] = worth[index+1][index];
        }
    })

    // 总价格
    var sum = paid.reduce((total,now,index)=>{
        return total + feedBack[index];
    },0)

    return {
        paid,
        feedBack,
        sum
    }
}

function VCG(hits,values){
    var size = hits.length;
    // 价值矩阵：(i,j)广告主i对广告位j的估价
    var worth = new Array(size);
    for(let i=0;i<size;i++){
        worth[i] = new Array(size).fill(0);
        for(let j=0;j<size;j++){
            worth[i][j] = values[i]*hits[j];
        }
    }

    // 广告主的点击价 (VCG规则)
    var paid = new Array(size).fill(0);
    // 广告主的回报价
    var feedBack = new Array(size).fill(0);
    for(let i=0;i<size;i++){
        // 当广告主i不出现时的总价格
        let now_value = 0;
        // 当广告主i出现时的总价格；
        let before_value = 0;
        for(let j=i+1;j<size;j++){
            now_value += worth[j][j-1];
            before_value += worth[j][j];
        }
        feedBack[i] = now_value-before_value;
        paid[i] = feedBack[i]/hits[i];
    }

    // 总价格
    var sum = paid.reduce((total,now,index)=>{
        return total + feedBack[index];
    },0)

    return {
        paid,
        feedBack,
        sum
    }
}
