/**
 * 모임 채팅 페이지 js
 */

var sock = new SockJS("/ws/multiRoom");

$(document).ready(function() {
	
	// 페이지 로드 시 채팅방 접속 이벤트 처리
	sock.onopen = function() {
	    join(); // 채팅방에 접속
	}
	
	// 메시지 받을 때 이벤트 처리
	sock.onmessage = function(e) {
	    receiveMessage(e); // 메시지 수신 처리
	}
	
	// 모임 채팅 페이지에서 '전송' 버튼 클릭 시 이벤트 처리
	$('#chatSendBtn').click(function() {
		var textarea = document.getElementById("chatMessageInput");
		var myMessage = textarea.value;
		var currentTime = formatDate(new Date()); // 현재 시간을 형식에 맞게 변환
		
		send(myMessage, currentTime); // 채팅 메세지 전송
		saveChatMessage(myMessage, currentTime); // 채팅 메세지 db에 저장
	}); // chatSendBtn onclick end
    
}); // ready() end

// 채팅방 접속하는 함수
function join() {
    // 접속 메시지 전송
    sock.send(
        JSON.stringify({
            chatRoomId: groupId,
            userId: userId,
            type: "JOIN"
        })
    );
} // join() end

// 메시지 수신 처리 함수
function receiveMessage(e) {
    var content = JSON.parse(e.data);
    var message = content.message; // 메세지 내용
    var type = content.type; // 메세지 타입
    var chatTime = content.chatTime; // 메세지 전송 시간
    
    var chatLog = document.getElementById("groupChatLogDiv");
    if (type == "SEND")
        chatLog.innerHTML += "<p><span class='chat-time'>" + chatTime + "</span> " + message + "</p>";
} // receiveMessage() end

// 채팅 메세지 소켓 전송하는 함수
function send(myMessage, currentTime) {	
	// 채팅 메세지 전송
	sock.send(
		JSON.stringify({
			chatRoomId: groupId,
			userId: userId,
			type: "SEND",
			message: myMessage, // 메세지 내용
			chatTime: currentTime // 메세지 전송 시간
		})
	);
} // send() end

// 채팅 메세지 DB에 저장하는 함수
function saveChatMessage(myMessage, currentTime) {
	$.ajax({
        url: "/groupdetail/chatmessagesend",
        method: "POST",
        data: { 
			groupId: groupId, 
        	userId: userId, 
        	chatMessage: myMessage, // 메세지 내용
        	chatTime: currentTime // 메세지 전송 시간
        },
        success: function(data) {
			if(data != 1) {
            	alert("채팅 메세지(data)를 db에 저장하는데 실패했습니다.");
			}
        },
        error: function() {
            alert("채팅 메세지를 db에 저장하는데 실패했습니다.");
        }
    }); // ajax() end
} // saveChatMessage() end

// 날짜 형식을 'yyyy-MM-dd HH:mm:ss'로 변환하는 함수
function formatDate(date) {
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
} // formatDate() end