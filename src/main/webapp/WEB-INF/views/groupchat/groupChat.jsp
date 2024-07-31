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
		<div id="groupChatBorderDiv">
			<div id="groupChatLogDiv">
				<!-- 채팅방(groupChat.js) -->
			</div>
			<div id="chatTextSendDiv">
				<div id="chatTextInputDiv">
					<input type="text" id="chatMessageInput">
					<button id="chatSendBtn">
						<svg xmlns="http://www.w3.org/2000/svg" width="45px" hegiht="45px" fill="none" viewBox="0 0 24 24" id="Arrowup"><path fill="#8fbc8f" fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 5a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L13 10.414V16a1 1 0 1 1-2 0v-5.586l-2.293 2.293a1 1 0 0 1-1.414-1.414l4-4A1 1 0 0 1 12 7Z" clip-rule="evenodd" class="color000000 svgShape"></path></svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

</html>