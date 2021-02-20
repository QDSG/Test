(function (){
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8083 });
var guestNumber = 1,  nickNames = {},  namesUsed = [],  allRooms = [], currentRoom = {}; //sockid--聊天室
server.on("connection", function(socket) {
    let id;
    console.log("一位用户连接")
    socket.on("message", function (mes) {
        mes  = JSON.parse(mes);
        let type = mes.type;
        let data = mes.data;
        console.log(type)
        switch (type) {
            //新socket连入，设置昵称，自定分配id
            case "setId":
                console.log(namesUsed[data])
                if(namesUsed[data]){
                    socket.send(err(null, "用户已存在"));
                } else {
                    let send = { type: "setId", id: data, name: "Guest" + data, num: guestNumber, };
                    socket.send(success(send))
                    namesUsed[data] = send;
                };
                id = data;
                guestNumber++;
                break;
        
            //已有用户名的进行检测
            case "join":
                if(namesUsed[data]){
                    socket.send(success({ type: "join", ...namesUsed[data] }, "登陆成功"));
                    id = data;
                } else {
                    socket.send(err(null, "用户不存在"));
                };
                break;
            //加入房间
            case "joinRoom":
                console.log(allRooms[data.room])
                if(allRooms[data.room]){
                    if(!allRooms[data.room].people1) {
                        allRooms[data.room].people1 = data.userId;
                    } else if(!allRooms[data.room].people2){
                        allRooms[data.room].people2 = data.userId;
                    } else {
                        socket.send(err(null, "房间人已满"));
                        return ;
                    }
                    socket.send(success({ type: "join", ...allRooms[data.room] }, "加入成功"));
                } else {
                    socket.send(err(null, "房间不存在"));
                };
                break;
            //创建房间
            case "createRoom":
                if(allRooms[data.room]){
                    socket.send(err(null, "房间已存在"));
                } else {
                    let send = { type: "createRoom", id: data.room, name: "Room" + data.room, people1: data.userId,  };
                    socket.send(success(send))
                    allRooms[data.room] = send;
                };
                break;
        
            default:
                break;
        }
    });
    socket.on("close", function (e) {
        console.log(e);
        if(allRooms[namesUsed[id].room]) {
            if(allRooms[namesUsed[id].room].people1 == id) {
                allRooms[namesUsed[id].room].people1 = undefined;
            } else if(allRooms[namesUsed[id].room].people2 == id){
                allRooms[namesUsed[id].room].people2 = undefined;
            }
        }
        namesUsed[id].room = undefined;
    })
});
//操作成功返回的信息
function success(data, mes) {
    return JSON.stringify({
        success: true,
        data:data,
        mes:mes||"操作成功",
    })
}
//操作失败返回的信息
function err(data, mes) {
    return JSON.stringify({
        success: true,
        data:data||null,
        mes:mes||"操作失败",
    })
}})();
