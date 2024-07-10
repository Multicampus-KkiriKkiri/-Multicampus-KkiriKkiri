/**
 * 모임 채팅 페이지 js
 */

var userNickname; // 현재 로그인한 회원 별명 전역변수
var profileImage; // 현재 로그인한 회원 프로필 사진 전역변수

var sock = new SockJS("/ws/multiRoom"); // 웹소켓 전역변수
var offset = 0; // 채팅 불러올 기준 변수

$(document).ready(function() {
	
	// 페이지 로드 시 사용자 별명, 프로필 사진 가져오기
	getUserNincknameAndProfileImage();
	
	// 페이지 로드 시 모임 채팅 내역 가져오기
	loadInitialChats();
	
	// 채팅방 접속 이벤트 처리
	sock.onopen = function() {
	    joinToChat(); // 채팅방에 접속
	}
	
	// 메시지 받을 때 이벤트 처리
	sock.onmessage = function(e) {
	    receiveMessage(e); // 메시지 수신 처리
	}
	
    // 모임 채팅 페이지에서 '전송' 버튼 클릭 시 이벤트 처리
    $('#chatSendBtn').click(function() {
        sendMessage();
    }); // chatSendBtn onclick end
    
    // 채팅 입력란에서 엔터 키 누를때 이벤트 처리
    $('#chatMessageInput').keydown(function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 키 동작 방지
            sendMessage();
        }
    }); // chatMessageInput keydown end
    
    // 채팅 내역 스크롤 될 때 이벤트 처리
    $('#groupChatLogDiv').scroll(function() {
        if ($(this).scrollTop() === 0) {
            loadMoreChats(); // 채팅 내역 추가로 불러오기
        }
    }); // groupChatLogDiv scroll end
    
}); // ready() end

// 사용자 별명 가져오는 함수
function getUserNincknameAndProfileImage() {
	$.ajax({
        url: "/groupdetail/getchatuserinfo",
        method: "POST",
        data: { 
        	userId: userId
        },
        success: function(data) {
			userNickname = data.userNickname;
			profileImage = data.profileImage;
        },
        error: function() {
            alert("채팅 사용자 프로필 정보를 가져오는데 실패했습니다.");
        }
    }); // ajax() end
}

// 모임 채팅방 접속 시 채팅 기록 20개 불러오는 함수
function loadInitialChats() {
    $.ajax({
        url: "/groupdetail/getchathistory",
        method: "POST",
        data: { groupId: groupId, offset: offset },
        success: function(data) {
            if (data.length > 0) {
                offset += data.length;
                
                var chatLog = document.getElementById("groupChatLogDiv");
                
                data.reverse().forEach(function(chat) {
					// 날짜 형식 변환
					chat.chatTime = formatDate(new Date(chat.chatTime));
					// 현재 사용자의 메세지 구분
                    var messageClass = chat.userId === userId ? 'sentMessage' : 'receivedMessage';
                    // 불러온 메세지 순차적으로 추가
                    chatLog.innerHTML += "<p class='chatMessage " + messageClass + "'><span class='chatTimeSpan'>" + chat.chatTime + "</span> <img class='chatUserProfileImg' src='" + chat.profileImage + "' alt='" + chat.profileImage + "' /> <span class='userNicknameSpan'>" + chat.userNickname + "</span> " + chat.chatMessage + "</p>";
                });
                
                $('#groupChatLogDiv').scrollTop($('#groupChatLogDiv')[0].scrollHeight);
            }
        },
        error: function() {
            alert("채팅 내역을 불러오는데 실패했습니다.");
        }
    });
}

// 스크롤 시 채팅 내역 20개씩 추가로 불러오는 함수
function loadMoreChats() {
    $.ajax({
        url: "/groupdetail/getchathistory",
        method: "POST",
        data: { groupId: groupId, offset: offset},
        success: function(data) {
            if (data.length > 0) {
                offset += data.length;
                
                var chatLog = document.getElementById("groupChatLogDiv");
                
                var previousHeight = chatLog.scrollHeight;
                
                data.forEach(function(chat) {
					// 날짜 형식 변환
					chat.chatTime = formatDate(new Date(chat.chatTime)); 
					// 현재 사용자의 메세지 구분
					var messageClass = chat.userId === userId ? 'sentMessage' : 'receivedMessage';
                    // 불러온 메세지 순차적으로 newMessage에 저장
                    var newMessage = document.createElement("p");
                    newMessage.className = 'chatMessage ' + messageClass;
                    newMessage.innerHTML = "<span class='chatTimeSpan'>" + chat.chatTime + "</span> <img class='chatUserProfileImg' src='" + chat.profileImage + "' alt='" + chat.profileImage + "' /> <span class='userNicknameSpan'>" + chat.userNickname + "</span> " + chat.chatMessage;
                    // groupChatLogDiv 앞쪽에 추가
                    chatLog.insertBefore(newMessage, chatLog.firstChild);
                });
                
                $('#groupChatLogDiv').scrollTop(chatLog.scrollHeight - previousHeight);
            }
        },
        error: function() {
            alert("채팅 내역을 추가로 불러오는데 실패했습니다.");
        }
    });
}

// 채팅방 접속하는 함수
function joinToChat() {
    // 접속 메시지 전송
    sock.send(
        JSON.stringify({
            chatRoomId: groupId,
            userId: userId,
            type: "JOIN"
        })
    );
} // joinToChat() end

// 메시지 수신 처리 함수
function receiveMessage(e) {
   
    var content = JSON.parse(e.data);
    var message = content.message; // 메세지 내용
    var type = content.type; // 메세지 타입
    var chatTime = content.chatTime; // 메세지 전송 시간
    var profileImage = content.profileImage; // 메세지 보낸 사용자 프로필 사진
    // 현재 로그인 사용자의 메세지 구분  
    var messageClass = content.userId == userId ? 'sentMessage' : 'receivedMessage';

    var chatLog = document.getElementById("groupChatLogDiv");
    
    if (type == "SEND")
    	// 수신 메세지 groupChatLogDiv에 추가
        chatLog.innerHTML += "<p class='chatMessage " + messageClass + "'><span class='chatTimeSpan'>" + chatTime + "</span> <img class='chatUserProfileImg' src='" + profileImage + "' alt='" + profileImage + "' /> <span class='userNicknameSpan'>" + userNickname + "</span> " + message + "</p>";
    
	// 새 메시지 수신 시 맨 아래로 스크롤
    $('#groupChatLogDiv').scrollTop($('#groupChatLogDiv')[0].scrollHeight);
    
} // receiveMessage() end

// 채팅 메시지 전송, 저장하는 함수
function sendMessage() {
	
    var textarea = document.getElementById("chatMessageInput");
    var myMessage = textarea.value;
    var currentTime = formatDate(new Date()); // 현재 시간을 형식에 맞게 변환
    
    sendChatMessageSoket(myMessage, currentTime); // 채팅 메세지 전송
    saveChatMessage(myMessage, currentTime); // 채팅 메세지 db에 저장
    textarea.value = ''; // 전송 후 입력란 초기화
    
    $('#groupChatLogDiv').scrollTop($('#groupChatLogDiv')[0].scrollHeight);

} // sendMessage() end

// 채팅 메세지 소켓 전송하는 함수
function sendChatMessageSoket(myMessage, currentTime) {	
	sock.send(
		JSON.stringify({
			chatRoomId: groupId,
			userId: userId,
			type: "SEND",
			message: myMessage, // 메세지 내용
			chatTime: currentTime, // 메세지 전송 시간
			profileImage: profileImage // 사용자 프로필
		})
	);
} // sendChatMessageSoket() end

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