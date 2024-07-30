<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>

<head>

<script src="/js/groupphoto/groupPhoto.js"></script>
<script>
	var pageNum = ${pageNum};
</script>
<link rel="stylesheet" type="text/css"
	href="/css/groupphoto/groupPhoto.css">
</head>

<section class="tapPageSection" id="photoTapPageSection">
	<div id="groupPhotoPageDiv">
		<div id="groupPhotoHeaderDiv">
			<span>모임 사진(${totalPostCount})</span>
		</div>
		<div id="groupPhotoBoardDiv">
			<!-- js 파일에서 모임 사진 게시물 내용 추가 -->
		</div>

		<div id="pageNumBtnDiv">
			<% 
			int totalPostCount = (Integer) request.getAttribute("totalPostCount"); 
			if(totalPostCount >= 1) {
			%>
				<button class="movePageBtn" id="previousBtn">이전</button>
			<%
			}
			int pageNum = (Integer) request.getAttribute("pageNum");
			int totalpage = 0;
			if (totalPostCount % 9 == 0) {
				totalpage = totalPostCount / 9;
			} else {
				totalpage = totalPostCount / 9 + 1;
			} // if-else end

			for (int i = 1; i <= totalpage; i++) {
				if(pageNum == i) {
				%>
					<button class="pageNumBtn clicked" data-pageNum="<%=i%>" value="<%=i%>"><%=i%></button>
				<%
				} else {
				%>
					<button class="pageNumBtn" data-pageNum="<%=i%>" value="<%=i%>"><%=i%></button>
				<%
				} // if end
			} // for end
			if(totalPostCount >= 1) {
			%>
				<button class="movePageBtn" id="nextBtn">다음</button>
			<%
			}
			%>
		</div>
	</div>
</section>

<script>
	var totalPage = <%= totalpage %>;
</script>

</html>