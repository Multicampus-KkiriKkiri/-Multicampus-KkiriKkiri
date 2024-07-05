<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      

<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>채팅</title>
	<script src="/jquery-3.7.1.min.js"></script>
</head>

<body>

<header>
    <c:if test="${not empty sessionScope.sessionUserId}">
        <%@ include file="../mainpage/mainHeaderLogin.jsp" %>
    </c:if>
    <c:if test="${empty sessionScope.sessionUserId}">
        <%@ include file="../mainpage/mainHeader.jsp" %>
	</c:if>
</header>

<main>
	<div>
		<div>
			<div></div><br>
			<div></div><br>
			<div></div><br>
			<div></div><br>
		</div>
	</div>


</main>

<footer>
	<%@ include file="../mainpage/mainFooter.jsp" %>
</footer>


</body>

</html>