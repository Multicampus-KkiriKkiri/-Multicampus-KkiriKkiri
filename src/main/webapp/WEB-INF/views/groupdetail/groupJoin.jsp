<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${groupDTO.groupName} 가입 신청</title>
<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
<script src="/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
			<div id="joinPageDiv">
				<div id="groupJoinHeaderDiv">
					<div id="joinHeaderGuideDiv1">모임장의 질문에 답변을 작성해 주세요</div>
					<div id="joinHeaderGuideDiv2">✔작성한 답변은 모임장에게만 공개돼요.</div>
				</div>
	            <div id="questionDiv">
	                <div id="leaderInfoDiv">
	                    <div id="leaderImgDiv">
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
				<div id="answerDiv">
					<form>
						<div><textarea id="signUpAnswerTxt" placeholder="5글자 이상 답변을 작성해주세요."></textarea></div>
						<div id="joinApplyBtnDiv"><button id="joinApplyBtn">모임 가입 신청</button></div>		
					</form>
				</div>
			</div>
		</section>
	</main>
</body>
</html>