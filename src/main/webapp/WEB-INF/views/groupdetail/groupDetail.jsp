<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Map" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${ groupDTO.groupName }</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="/js/groupdetail/groupQuit.js"></script>
<script src="/js/groupdetail/groupJoin.js"></script>
<script src="/js/groupdetail/groupDetail.js"></script>
<script>
	var groupId = ${groupDTO.groupId};
	var userId = ${userId};
	var profileImage = "${profileImage}";
	var groupInterestId = ${groupDTO.groupInterestId};
	var groupType = "${groupDTO.groupType}";
	var groupSignUpType = "${groupDTO.groupSignUpType}";
	var groupMemberCnt = ${groupMemberCnt};
	var groupMaximumMemberCnt = ${groupDTO.groupMaximum};
  var leaderProfileImg = "${groupLeaderDTO.profileImage}";
	var leaderName = "${groupLeaderDTO.userNickname}";
	var groupSignUpQuestion = "${groupDTO.groupSignUpQuestion}";
	var userEventAttendApplyHistory = "${userEventAttendApplyHistory}";

  $(document).ready(function() {
	        // URL에 #chatTapBtn이 있으면 자동으로 채팅 탭으로 이동
	        if (window.location.hash === '#chatTapBtn') {
	            $('#chatTapBtn').click();
	        }
	    });

</script>
<link rel="stylesheet" type="text/css" href="/css/groupdetail/groupQuit.css">
<link rel="stylesheet" type="text/css" href="/css/groupdetail/groupJoin.css">
<link rel="stylesheet" type="text/css" href="/css/groupdetail/groupDetail.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body>
	<!-- header -->
	<c:choose>
	    <c:when test="${userId == 0}">
	        <jsp:include page="../mainpage/mainHeader.jsp" />
	    </c:when>
	    <c:otherwise>
	        <jsp:include page="../mainpage/mainHeaderLogin.jsp" />
	    </c:otherwise>
	</c:choose>
	
	<!-- main -->
	<main id="groupDetailMain">
		<section id="groupHeaderSection" class="groupDetailSection">
			<div id="groupImgDiv">
				<img id="groupImg" src="/upload/groupregister/${groupDTO.groupImage}" alt="${groupDTO.groupName}">
			</div>
			<div id="groupDetailDiv">
				<div id="groupNameDiv">${groupDTO.groupName}</div>
				<div id="groupCategoryDiv">
					<span class="groupInfoIconSpan" id="groupCategoryIconSpan">
						<!-- 모임 카테고리에 따라 아이콘 추가(groupDetail.js) -->
					</span>
					<span id="groupCategorySpan">
						${category}
					</span>
				</div>
				<%
				Map<String, String> regionMap = (Map<String, String>)request.getAttribute("regionMap");
				String groupDistrictName = regionMap.get("groupDistrict");
				// groupDistrictName 이 '온라인'이 아닐때
				if(!groupDistrictName.equals("온라인")) {
				%>
				<div id="groupRegionDiv" class="groupInfoDiv">
					<span class="groupInfoIconSpan">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/></svg>
					</span>
					<span>
						${regionMap.groupRegion} ${regionMap.groupDistrict}
					</span>
				</div>
				<%
				}
				%>
				<div id="groupTypeDiv" class="groupInfoDiv">
					<span class="groupInfoIconSpan" id="groupTypeIconSpan"> 
						<!-- groupDetail.js 에서 추가 -->
					</span>
					<span>
						${groupDTO.groupType}
					</span>
				</div>
				<div id="groupMemberCntDiv" class="groupInfoDiv">
					<span class="groupInfoIconSpan">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Z"/></svg>
					</span>
					<span>
						${groupMemberCnt}/${groupDTO.groupMaximum}
					</span>
				</div>
				<div id="groupSignUpTypeDiv" class="groupInfoDiv">
					<span class="groupInfoIconSpan">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>
					</span>
					<span>
						${groupDTO.groupSignUpType}
					</span>
				</div>
			</div>
		</section>
		<section id="groupNavSection">
			<nav id="groupDetailNav">
				<div id="groupTapNavDiv" class="groupDetailNavDiv">
					<button class="groupDetailTapBtn clicked" id="infoTapBtn" value="info">모임 상세</button>
					<button class="groupDetailTapBtn" id="eventTapBtn" value="event">모임 일정</button>
					<button class="groupDetailTapBtn" id="photoTapBtn" value="photo">모임 사진</button>
					<button class="groupDetailTapBtn" id="chatTapBtn" value="chat">모임 채팅</button>
				</div>
				<div id="groupOptionNavDiv" class="groupDetailNavDiv">
					<button id="groupShareBtn">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3B5F3E"><path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z"/></svg>
					</button>
					<button id="groupWishBtn" value=""></button>
					<button id="groupOptionBtn" value=""></button>
				</div>
			</nav>
		</section>
		<section id="groupTapPageSection"  class="groupDetailSection">
			<%@ include file="../groupdetail/groupDetailInfo.jsp" %>
		</section>
	</main>
	
	<!-- footer -->
	<footer id="groupDetailFooter">
		<jsp:include page="../mainpage/mainFooter.jsp" />
	</footer>
</body>
</html>