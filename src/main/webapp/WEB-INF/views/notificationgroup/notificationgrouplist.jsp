<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>알림</title>
<script src="/jquery-3.7.1.min.js"></script>   
</head>
<body>
<header>
	<%@ include file="../mainpage/mainHeader.jsp" %>
	<%@ include file="../mainpage/mainHeaderLogin.jsp" %>
</header>

<main>
 	<div>
 		<c:if test="${notificationDTO == null}">
 			<div>알림이 없습니다.</div><br>
 		</c:if>
 		 		
		<c:if test="${notificationDTO != null}">
            <div>
                <div>${notificationDTO.notificationTime}</div><br>
                <div>${userDTO.userNickname}의 ${groupName} 모임 가입 ${notificationDTO.notificationText} 입니다.</div><br>
                <div>
                    <form action="deleteNotification" method="post">
                        <input type="hidden" name="notificationId" value="${notificationDTO.notificationId}" />
                        <input type="submit" value="삭제" />
                    </form>
                </div>
            </div>
        </c:if>
		
	</div>
</main>

<footer>
	<%@ include file="../mainpage/mainFooter.jsp" %>
</footer>
</body>
</html>