<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<script src="/jquery-3.7.1.min.js"></script>
<script>
	$(document).ready(function() {
		
	}); // ready end
</script>
</head>
<body>
	<h1>임시 로그인(회원 id session에 저장)</h1>
	<h1>현재 sessionUserId  = <%=session.getAttribute("sessionUserId") %></h1>
	<form action="/groupdetail/tmplogin" method="post">
		<input type="text" name="inputUserId">
		<button>로그인(sessionUserId 저장)</button>
	</form>
	<br>
	<form action="/groupdetail/tmplogout" method="post">
		<button>로그아웃(sessionUserId 삭제)</button>
	</form>
	<br>
	<form action="/groupdetail/info" method="get">
		<input type="hidden" name="groupId" value="1">
		<button>'테스트모임' 상세 페이지로 이동</button>
	</form>
</body>
</html>