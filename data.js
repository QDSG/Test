/*
 * @Author: gc
 * @Date: 2021-02-20 10:20:47
 * @LastEditors: c
 * @LastEditTime: 2021-02-20 11:46:44
 * @FilePath: \gobang\js\index.js
 * @Description: 
 */
//所有初始化的数据
var chess = document.getElementById('chess');   //获取canvas对象
var context = chess.getContext("2d");   //获取画笔
var width = chess.width;    //获取画布的宽度
var height = chess.height;  //获取画布的高度

var me = false;//判断是否为白棋选手
var chessBoard = [];    //记录棋子的落子情况，1为白棋，2为黑棋

var message = {};   //用来接收服务端发过来的信息

var ws;
/* 初始化方法 */
function init() {
    wsLink();
    start();
    oneStep(7, 7);
}
init();
