<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>채팅 알림</title>
    <script src="/jquery-3.7.1.min.js"></script>
    <script src="/webjars/sockjs-client/1.5.1/sockjs.min.js"></script>
    <script src="/js/notificationchatlist/notificationchatlist.js"></script>
    <link rel="stylesheet" href="/css/noti/notichat.css">
</head>
<body class="noti-body">
    <header>
        <c:if test="${not empty sessionScope.sessionUserId}">
            <%@ include file="../mainpage/mainHeaderLogin.jsp" %>
        </c:if>
        <c:if test="${empty sessionScope.sessionUserId}">
            <%@ include file="../mainpage/mainHeader.jsp" %>
        </c:if>
    </header>
    <main>
        <div id="chatsContainer" class="noti-chats-container">
            <c:choose>
                <c:when test="${empty message}">
                    <div>${message}</div>
                </c:when>
                <c:otherwise>
                    <script>
                        $(document).ready(function() {
                            fetchLatestChats();
                        });
                    </script>
                </c:otherwise>
            </c:choose>
        </div>
    </main>
    <footer>
        <%@ include file="../mainpage/mainFooter.jsp" %>
    </footer>
</body>
</html>
