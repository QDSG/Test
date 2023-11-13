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

//设置用户id
function sendMessage(type, mes) {
    let m = JSON.stringify({
        type: type,
        data: mes,
    })
    ws.send(m);
}

function wsLink() {
    ws = new WebSocket("ws://localhost:8083/");

    ws.onopen = function (socket) {
        console.log("websocket已连接成功", socket)
    }
    ws.onmessage = function (e) {
        console.log(e)
        let data = JSON.parse(e.data);
        let type = data.type;
        if(data.success) {
            switch (type) {
                case "setId":
                    console.log("设置用户成功");
                    if(!message.info) {
                        message.info = data.data;
                    } else {
                        message.info = Object.assign(message.info, data.data);
                    }
                    break;
                case "join":
                    if(!message.info) {
                        message.info = data.data;
                    } else {
                        message.info = Object.assign(message.info, data.data);
                    }
                    break;
            
                case "joinRoom":
                    if(!message.room) {
                        message.info = data.data;
                    } else {
                        message.room = Object.assign(message.room, data.data);
                        message.info.room = message.room.id;
                    }
                    break;
                
                case "createRoom":
                    if(!message.room) {
                        message.info = data.data;
                    } else {
                        message.room = Object.assign(message.room, data.data);
                        message.info.room = message.room.id;
                    }
                    break;
                default:
                    break;
            }
        } else {
            console.log(data.mes);
        }
    };

    ws.onclose = function () {
        console.log("onclose");
    };
    ws.onerror = function (e) {
        console.log("onerror");
        console.log(e)
    };

}

function close() {
    ws.close();
}

/* 初始化方法 */
function init() {
    wsLink();
    start();
    oneStep(7, 7);
}
init();

//点击画布判断位置，放置对应棋子
(function () {
    chess.onclick = function (e) {
        var oX = e.offsetX; //相对画布在x轴的位置
        var oY = e.offsetY; //相对画布在y轴的位置
        var x = Math.floor(oX / 30);
        var y = Math.floor(oY / 30);
        if (!chessBoard[x][y]) {
            oneStep(x, y);
        }
    };
})()

//创建角色
function setName() {
    let val = document.getElementById('name').value;   //获取input对象
    console.log(val);
    if(val == null || val == "") {
        console.log("请输入正确的数字")
    } else {
        console.log(val);
        sendMessage("setId", val);  //设置用户id
    }
}

//登录角色
function join() {
    let val = document.getElementById('name').value;   //获取input对象
    console.log(val);
    if(val == null || val == "") {
        console.log("请输入正确的数字")
    } else {
        console.log(val);
        sendMessage("join", val);  //设置用户id
    }
}

//加入房间
function joinRoom() {
    let val = document.getElementById('name').value;   //获取input对象
    console.log(val);
    if(val == null || val == "") {
        console.log("请输入正确的数字")
    } else {
        console.log(val);
        sendMessage("joinRoom", {
            room: val,
            userId: message.info.id,
        });  //设置用户id
    }

}

//创建房间
function createRoom() {
    let val = document.getElementById('name').value;   //获取input对象
    console.log(val);
    if(val == null || val == "") {
        console.log("请输入正确的数字")
    } else {
        console.log(val);
        sendMessage("createRoom", {
            room: val,
            userId: message.info.id,
        });  //设置用户id
    }
}