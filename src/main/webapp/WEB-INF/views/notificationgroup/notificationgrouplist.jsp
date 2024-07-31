<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>알림</title>
    <link rel="stylesheet" href="/css/noti/notigroup.css" />
    <script src="/jquery-3.7.1.min.js"></script>
    <script src="/js/notificationgrouplist/notificationgrouplist.js"></script>   
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
        <div id="notification-container">
            <c:choose>
                <c:when test="${not empty notificationMessage && empty notification}">
                    <div id="initial-message">${notificationMessage}</div><br>
                </c:when>
                <c:when test="${not empty notification}">
                    <div class="notification-group" id="initial-notifications">
                        <c:forEach var="dto" items="${notification}">
                            <div class="notification-item" data-id="${dto.notificationId}">
                                <div>${dto.notificationTime}</div>
                                <div>${dto.notificationText}</div>
                                <div>
                                    <form class="delete-form">
                                        <input type="hidden" name="notificationId" value="${dto.notificationId}" />
                                        <button type="button" class="delete-button">삭제</button>
                                    </form>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </c:when>
            </c:choose>
            <div class="notification-group" id="ajax-notifications"></div>
        </div>	    
    </main>

    <footer>
        <%@ include file="../mainpage/mainFooter.jsp" %>
    </footer>

</body>

</html>
