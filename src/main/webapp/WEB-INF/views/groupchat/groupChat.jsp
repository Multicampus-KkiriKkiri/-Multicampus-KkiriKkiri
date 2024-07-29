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
	<div id="groupChatPageDiv">
		<div id="groupChatHeaderDiv">끼리끼리 이야기</div>
		<div id="groupChatLogDiv">
		</div>
		<div id="chatTextSendDiv">
			<div id="chatTextInputDiv">
				대화입력 : <input type="text" id="chatMessageInput">
				<button id="chatSendBtn">전송</button>
			</div>
		</div>
	</div>
</section>

</html>