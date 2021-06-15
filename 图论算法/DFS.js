// 深度优先搜索算法
// 深度优先的思想是沿着一条路往深处行进直到无路可走，再回溯后退。
// 多用于遍历输出所有路径

const map = [
    [0,1,0,0,0,1],
    [0,0,0,1,0,0],
    [1,0,1,0,0,1],
    [1,0,0,1,0,1],
    [1,1,0,0,0,0]
];

/**
 * DFS遍历输出所有路径
 * @param {*} map 迷宫图
 * @param {*} x0 起点
 * @param {*} y0 
 * @param {*} x1 终点
 * @param {*} y1 
 */
function DFS(map,x0,y0,x1,y1){
    var sizeX = map.length;
    var sizeY = map[0].length;
    var path = new Array(); // 储存路径
    var Reached = new Array(sizeX);
    for(let i=0;i<sizeX;i++){
        Reached[i] = new Array(sizeY).fill(false);
    }
    var dir = [[0,1],[0,-1],[1,0],[-1,0]]; // 方向
    path.push({
        x:x0,
        y:y0
    })
    function run(x,y){
        // 到达终点
        if(x == x1 && y == y1){
            console.log(path);
            return;
        }

        // 分别从四个方向上深入
        for(let i=0;i<4;i++){
            let new_x = x+dir[i][0];
            let new_y = y+dir[i][1];
            // 越界、无路、已到达等情况跳过
            if(new_x<0 || new_x>=sizeX || new_y<0 || new_y>=sizeY || map[new_x][new_y] || Reached[new_x][new_y]) continue;
            // 加入路径
            path.push({
                x:new_x,
                y:new_y
            })
            Reached[new_x][new_y] = true;
            // 开始新的遍历
            run(new_x,new_y);
            // 回溯
            path.pop();
            Reached[new_x][new_y] = false;
        }
    }
    run(x0,y0);
}

DFS(map,0,0,4,5);
