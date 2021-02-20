/*
 * @Author: gc
 * @Date: 2021-02-20 10:18:58
 * @LastEditors: c
 * @LastEditTime: 2021-02-20 17:26:29
 * @FilePath: \gobang\js\socket.js
 * @Description: 
 */

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
//设置用户id
function sendMessage(type, mes) {
    let m = JSON.stringify({
        type: type,
        data: mes,
    })
    ws.send(m);
}

function close() {
    ws.close();
}
