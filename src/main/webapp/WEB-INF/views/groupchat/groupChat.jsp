<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

<head>
<script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
<script src="/js/groupchat/groupChat.js"></script>
<link rel="stylesheet" type="text/css" href="/css/groupchat/groupChat.css">
</head>

<section class="tapPageSection" id="chatTapPageSection">
	<div id="groupChatHeaderDiv">
		<span>
			<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#7d7d7d"><path d="M360-80v-529q-91-24-145.5-100.5T160-880h80q0 83 53.5 141.5T430-680h100q30 0 56 11t47 32l181 181-56 56-158-158v478h-80v-240h-80v240h-80Zm120-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/></svg>
		</span>
		<span>
			끼리끼리 이야기
		</span>
		<span>
			<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#7d7d7d"><path d="M240-400h480v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"/></svg>
		</span>
	</div>
	<div id="groupChatPageDiv">
		<div id="groupChatLogDiv">
			<!-- 채팅방(groupChat.js) -->
		</div>
		<div id="chatTextSendDiv">
			<div id="chatTextInputDiv">
				<input type="text" id="chatMessageInput">
				<button id="chatSendBtn">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3B5F3E"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
				</button>
			</div>
		</div>
	</div>
</section>

</html>