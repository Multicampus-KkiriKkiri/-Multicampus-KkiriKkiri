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
 <main>
 	<div>
		<c:forEach items="${notificationDTO}">
			<div>
				<div>${notificationDTO.notificationTime}</div>
				<div>${notification.notificationText}</div>
				<div>
					<form action="deleteNotification" method="post">
						<input type="submit" name="notificationId" value="${notificationDTO.notificationId}" />
					</form>
				</div>
			</div>
		</c:forEach>
	</div>
 	
 </main>
</body>
</html>