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
		send(myMessage); // 채팅 메세지 전송
		saveChatMessage(myMessage); // 채팅 메세지 db에 저장
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
    var message = content.message;
    var type = content.type;
    var chatLog = document.getElementById("groupChatLogDiv");
    if (type == "SEND")
        chatLog.innerHTML += "<p>" + message + "</p>";
} // receiveMessage() end

// 채팅 메세지 소켓 전송하는 함수
function send(myMessage) {
	// 채팅 메세지 전송
	sock.send(
		JSON.stringify({
			chatRoomId: groupId,
			userId: userId,
			type: "SEND",
			message: myMessage
		})
	);
} // send() end

// 채팅 메세지 DB에 저장하는 함수
function saveChatMessage(myMessage) {
	$.ajax({
        url: "/groupdetail/chatmessagesend",
        method: "POST",
        data: { 
			groupId: groupId, 
        	userId: userId, 
        	chatMessage: myMessage, 
        	chatTime: ""
        },
        success: function(data) {
			auth = data;
			setChatBtn(auth);
            setGroupOptionBtn(auth);
        },
        error: function() {
            alert("사용자 권한을 확인하는데 실패했습니다.");
        }
    }); // ajax() end
}