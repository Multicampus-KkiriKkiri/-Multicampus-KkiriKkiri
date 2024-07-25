<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>알림</title>
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
		            <c:when test="${not empty notificationMessage}">
		                <div>${notificationMessage}</div><br>
		            </c:when>
		            <c:when test="${not empty notification}">
		                <div>
		                    <c:forEach var="dto" items="${notification}">
		                        <div class="notification-item" data-id="${dto.notificationId}">
		                            <div>${dto.notificationTime}</div>
		                            <div>${dto.notificationText}</div>
		                            <div>
		                                <form class="delete-form">
		                                    <input type="hidden" name="notificationId" value="${dto.notificationId}" />
		                                    <button type="button" class="delete-button">삭제</button>
		                                </form>
		                            </div><br>
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