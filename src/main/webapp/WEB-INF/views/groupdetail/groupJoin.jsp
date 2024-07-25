<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${groupDTO.groupName} 가입 신청</title>
<script src="/jquery-3.7.1.min.js"></script>
<script src="/js/groupdetail/groupDetail.js"></script>
<script src="/js/groupdetail/groupJoin.js"></script>
<script>
	var groupId = ${groupDTO.groupId};
	var userId = ${userId};
</script>
<link rel="stylesheet" type="text/css" href="/css/groupdetail/groupJoin.css">
</head>
<body>
	<main>
		<section id="joinPageSection">
				<div>
					<h2>모임장의 질문에 답변을 작성해 주세요</h2>
					<p>작성한 답변은 모임장에게만 공개돼요.</p>
				</div>
	            <div id="questionDiv">
	                <div id="leaderInfoDiv">
	                    <div id="leaderProfileDiv">
	                        <img src="/upload/${groupLeaderDTO.profileImage}" alt="${groupLeaderDTO.userNickname}">
	                    </div>
	                    <div id="leaderNameDiv">
	                        ${groupLeaderDTO.userNickname}
	                    </div>
	                </div>
	                <div id="signUpQuestionDiv">
	                    ${groupDTO.groupSignUpQuestion}
	                </div>
	            </div>
				<div>
					<form>
						<div><textarea id="signUpAnswerTxt">5글자 이상 답변을 작성해주세요.</textarea></div>
						<div><button id="joinApplyBtn">모임 가입 신청</button></div>		
					</form>
				</div>
		</section>
	</main>
</body>
</html>