/*
 * @Author: gc
 * @Date: 2021-02-20 10:19:34
 * @LastEditors: c
 * @LastEditTime: 2021-02-20 10:19:55
 * @FilePath: \gobang\js\initChess.js
 * @Description: 
 */

/* 绘制棋盘 */
function start() {
    for (let i = 0; i < 15; i++) {
        chessBoard[i] = [];
        context.strokeStyle = "#BFBFBF";
        //开始路径
        context.beginPath();
        //绘制横线
        context.moveTo(15, 15 + 30 * i);
        context.lineTo(width - 15, 15 + 30 * i);
        //结束路径
        context.closePath();
        //绘制路径
        context.stroke();
        //开始路径
        context.beginPath();
        //绘制纵线
        context.moveTo(15 + 30 * i, 15);
        context.lineTo(15 + 30 * i, height - 15);
        //结束路径
        context.closePath();
        //绘制路径
        context.stroke();
    }
}
/* 走一步棋 */
function oneStep(x, y) {
    //开始路径
    context.beginPath();
    //绘制圆
    context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);
    //结束路径
    context.closePath();
    //设置填充颜色
    var gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
        chessBoard[x][y] = 1;
    } else {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
        chessBoard[x][y] = 2;
    }
    context.fillStyle = gradient;
    //进行填充
    context.fill();
    me = !me;
}
