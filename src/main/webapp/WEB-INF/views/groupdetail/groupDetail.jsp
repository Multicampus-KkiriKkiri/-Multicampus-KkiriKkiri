<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${ groupDTO.groupName }</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupdetail/groupDetail.js"></script>
<script>
	var groupId = ${groupDTO.groupId};
	var userId = ${userId};
	var groupSignUpType = "${groupDTO.groupSignUpType}";
</script>
<link rel="stylesheet" type="text/css" href="/css/groupdetail/groupDetail.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
<body>
	<main>
		<section>
			<div><img id="groupImg" src="${groupDTO.groupImage}" alt="${groupDTO.groupName}"></div>
			<div>
				<div>${groupDTO.groupName}</div>
				<div>${category}</div>
				<div>${groupDTO.groupRegion}</div>
				<div>${memberCnt}/${groupDTO.groupMaximum}</div>
				<div>${groupDTO.groupType}</div>
				<div>${groupDTO.groupSignUpType}</div>
				
			</div>
		</section>
		<section>
			<button class="tapBtn" value="info">모임 설명 & 가입 멤버</button>
			<button class="tapBtn" value="event">모임 일정</button>
			<button class="tapBtn" value="photo">모임 사진</button>
			<button class="tapBtn" value="chat" id="chatBtn">모임 채팅</button>
		</section>
		<section id="tapPageSection">
			<div>
				<div id="leaderInfoDiv">
					<div id="leaderImageDiv">
						<img id="leaderImg" src="${groupLeaderDTO.profileImage}" alt="${groupLeaderDTO.userNickname}">
					</div>
					<div id="leaderNameDiv">
						${groupLeaderDTO.userNickname}
					</div>
				</div>
	            <div>${groupDTO.groupDetail}</div>
			</div>
			<div>
			  	<div>가입멤버</div>
	            <div id="membersDiv">
	            	<div>
	            		프로필 사진 목록
	            		<%-- <c:forEach var="userProfileImg" items="${memberList.profileImage}}">
	            		
	            		</c:forEach> --%>
	            	</div>
	                <div>
	                	닉네임 목록
	                	
	                </div>
	            </div>
			</div>
		</section>
	</main>
	
	<!-- 하단 고정바 -->
	<div id="groupFooter">
		<span>
			${groupDTO.groupName}		
		</span>
		<span>
			<button id="groupShareBtn">공유</button>
			<button id="groupWishBtn" value=""></button>
			<button id="groupOptionBtn" value=""></button>
		</span>
	</div>
</body>
</html>