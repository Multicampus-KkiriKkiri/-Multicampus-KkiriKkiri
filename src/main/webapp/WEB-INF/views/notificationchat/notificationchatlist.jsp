<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>      

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>채팅 알림</title>
    <script src="/jquery-3.7.1.min.js"></script>
    <script src="/js/notificationchatlist/notificationchatlist.js"></script>
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
    <div id="chatsContainer">
        <c:choose>
            <c:when test="${empty groupImages}">
                <div>${message}</div>
            </c:when>
            <c:otherwise>
                <c:forEach var="i" begin="0" end="${fn:length(groupImages) - 1}" step="1">
                    <div class="chatContainer" id="group-${groupIds[i]}">
                        <div class="groupImage"><img src="${groupImages[i]}" alt="Group Image"/></div>
                        <div class="groupName">${groupNames[i]}</div>
                        <div class="userNickname">${userNicknames[i]}</div>
                        <div class="chatMessage">${chatMessages[i]}</div>
                    </div>
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </div>
</main>


<footer>
    <%@ include file="../mainpage/mainFooter.jsp" %>
</footer>

</body>

</html>
