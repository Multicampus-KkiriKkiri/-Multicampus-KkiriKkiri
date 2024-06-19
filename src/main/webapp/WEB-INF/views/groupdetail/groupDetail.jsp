<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${ groupDTO.groupName }</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupDetailTap.js"></script>
<script>
	var groupId = ${groupDTO.groupId};
</script>
<link rel="stylesheet" type="text/css" href="/css/groupDetail.css">
</head>
<body>
	<main>
		<section>
			<div><img src="${groupDTO.groupImage}" alt="${groupDTO.groupName}"></div>
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
			<button id="tapInfoBtn">모임 설명 & 가입 멤버</button>
			<button id="tapEventBtn">모임 일정</button>
			<button id="tapPhotoBtn">모임 사진</button>
			<button id="tapChatBtn">모임 채팅</button>
		</section>
		<section id="tapPageSection">
			<div>
				<div><img src="${groupLeaderDTO.profileImage}" alt="${groupLeaderDTO.userNickname}">${groupLeaderDTO.userNickname}</div>
	            <div>${groupDTO.groupDetail}</div>
			</div>
			<div>
			  	<div>가입멤버</div>
	            <div id="membersSection">
	            	<div>프로필 사진 목록</div>
	                <div>닉네임 목록</div>
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
			<button>공유</button>
			<button>찜</button>
			<button>모입 가입</button>
		</span>
	</div>
</body>
</html>