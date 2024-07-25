<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>게시물 상세보기</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupphoto/photoPost.js"></script>
<script>
	var uploadDateTime = "${photoList[0].uploadDateTime}";
</script>
<link rel="stylesheet" type="text/css"
	href="/css/groupphoto/photoPost.css">
</head>
<body>
	<main>
		<section id="photoPostDetailPageSection">
			<div id="photoPostTileDiv">
				<span>${photoList[0].postTitle}</span>
			</div>
			<div id="photoPostInfoDiv">
				<span id="postUploadDateTimeSpan"></span>
			</div>
			<div id="photoContentDiv">
				<c:forEach var="dto" items="${photoList}" varStatus="status">
					<img class="photoImg" src="/upload/groupphoto/${dto.photoFileName}" alt="${dto.postTitle}">
				</c:forEach>
			</div>
		</section>
	</main>
</body>
</html>