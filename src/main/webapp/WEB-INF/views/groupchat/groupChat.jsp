<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

<head>
<script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="/js/groupchat/groupChat.js"></script>
<script>
		var roomId = ${groupId};
		var sock = new SockJS("/ws/multiRoom");
		
		/*onopen 함수는 페이지가 로드되면 자동실행됨*/
		sock.onopen = function () {
		    sock.send( JSON.stringify({chatRoomId: roomId, type: "JOIN"}) );
		}
		
		/*onmessage 함수는 메세지 주고받을때마다 자동실행됨*/	
		sock.onmessage = function (e) {
			var content = JSON.parse(e.data);
		        var message = content.message;
		        var type = content.type;
		    	var chatLog = document.getElementById("groupChatAreaDiv");     
		        if(type == "SEND")
		    		chatLog.innerHTML = chatLog.innerHTML + "<p>" + message + "</p>";
		}
		
		function send(){
			var textarea = document.getElementById("chatMessageInput");
			var myMessage = textarea.value;
			sock.send( JSON.stringify({chatRoomId: roomId, type: "SEND", message: myMessage}) );
		}    
	</script>
<link rel="stylesheet" type="text/css"	href="/css/groupchat/groupChat.css">
</head>

<section class="tapPageSection" id="chatTapPageSection">
	<div id="groupChatPageDiv">
		<div id="groupChatHeaderDiv">
			끼리끼리 이야기
		</div>
		<div id="groupChatAreaDiv">
			<div>채팅 내용 표시 공간</div>
		</div>
		<div id="chatTextSendDiv">
			<div id="chatTextInputDiv">
				대화입력 : <input type="text" id="chatMessageInput">
				<button id="chatSendBtn" onclick="send()">전송</button>
			</div>
		</div>
	</div>
</section>

</html>