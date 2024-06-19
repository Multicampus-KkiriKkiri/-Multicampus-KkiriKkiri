<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${groupDTO.groupName} 일정 목록</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupDetailTap.js"></script>
</head>
<body>

	<section id="tapPageSection">

	    <div>
			<h1>모임 일정 목록</h1>
			<h1>모임명:${groupDTO.groupName}</h1>
		</div>
	    
	</section>
	
</body>
</html>