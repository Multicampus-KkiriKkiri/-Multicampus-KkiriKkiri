<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${groupDTO.groupName} 모임 설명 & 가입 멤버</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupdetail/groupDetail.js"></script>
</head>
<body>
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
</body>
</html>