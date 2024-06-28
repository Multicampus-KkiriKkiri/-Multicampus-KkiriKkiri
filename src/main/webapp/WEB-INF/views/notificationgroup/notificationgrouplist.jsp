<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>알림</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/notificationgrouplist/notification.js"></script>   
</head>
<body>

<header>
	<%@ include file="../mainpage/mainHeader.jsp" %>
</header>

<main>

    <div id="notification-container">
        <c:choose>
            <c:when test="${notification == null}">
                <div>알림이 없습니다.</div><br>
            </c:when>
            <c:when test="${notification != null}">
                <div>
                    <c:forEach var="dto" items="${notification}">
                        <div class="notification-item">
                            <div>${dto.notificationTime}</div><br>
                            <div>${dto.notificationText} 입니다.</div><br>
                            <div>
                                <form class="delete-form">
                                    <input type="hidden" name="notificationId" value="${dto.notificationId}" />
                                    <input type="hidden" name="userId" value="${dto.userId}" />
                                    <input type="hidden" name="groupId" value="${dto.groupId}" />
                                    <button type="button" class="delete-button">삭제</button>
                                </form>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </c:when>
        </c:choose>
    </div>
    
</main>

<footer>
	<%@ include file="../mainpage/mainFooter.jsp" %>
</footer>
</body>
</html>