<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${groupDTO.groupName} 채팅방</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupDetailTap.js"></script>
</head>
<body>
	<section id="tapPageSection">
	    <div>
			<h1>끼리끼리 이야기</h1>
	        <textarea id="chatInput" placeholder="채팅 내용을 입력하세요"></textarea>
	        <button id="sendButton">전송</button>
	    </div>
	
	    <script>
	        document.getElementById('sendButton').onclick = function() {
	            var chatInput = document.getElementById('chatInput').value;
	            // 여기에 채팅 메시지를 서버로 전송하는 코드를 추가합니다.
	            alert('메시지 전송: ' + chatInput);
	        }
	    </script>
	</section>
</body>
</html>