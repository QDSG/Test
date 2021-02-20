/*
 * @Author: gc
 * @Date: 2021-02-20 10:20:08
 * @LastEditors: c
 * @LastEditTime: 2021-02-20 17:11:09
 * @FilePath: \gobang\js\event.js
 * @Description: 所有事件处理
 */


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
