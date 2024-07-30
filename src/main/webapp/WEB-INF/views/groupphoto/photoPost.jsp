<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>게시물 상세보기</title>
<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
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
			<div id="photoPostDetailPageDiv">
				<div id="photoPostHeaderDiv">
					<div id="photoPostTileDiv">
						<span>${photoList[0].postTitle}</span>
					</div>
					<div id="photoPostInfoDiv">
						<span id="postUploadDateTimeSpan"></span>
						<span> · </span>
						<span>${photoList.size()}장의 사진</span>
					</div>
				</div>
				<div id="photoContentDiv">
					<div class="photoGridDiv">
						<c:forEach var="dto" items="${photoList}" varStatus="status">
							<img class="photoImg" src="/upload/groupphoto/${dto.photoFileName}" alt="${dto.postTitle}">
						</c:forEach>
					</div>
				</div>
			</div>
		</section>
	</main>
</body>
</html>