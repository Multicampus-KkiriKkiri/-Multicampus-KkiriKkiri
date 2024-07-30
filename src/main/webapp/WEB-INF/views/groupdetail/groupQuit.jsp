<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${groupDTO.groupName} 나가기</title>
<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
<script src="/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="/js/groupdetail/groupQuit.js"></script>
<script>
	var groupId = ${groupDTO.groupId};
	var userId = ${userId};
</script>
<link rel="stylesheet" type="text/css" href="/css/groupdetail/groupQuit.css">
</head>
<body>
	<main>
		<section id="quitPageSection">
			<div id="quitPageDiv">
				<div id="groupQuitHeaderDiv">
					<div id="quitHeaderGuideDiv1">모임을 나가기 전 꼭 확인해주세요!</div>
					<div id="quitHeaderGuideDiv2">
						<ul>
							<li>모임 일정에 참여하고 있는 경우 모임을 나갈 수 없습니다.</li>
							<li>모임 채팅방에서도 나가게되며 다시 입장할 수 없습니다.</li>
							<li>모임 내 회원님의 정보는 모두 삭제됩니다.</li>
						</ul>
					</div>
				</div>
				<div id="groupQuitCheckDiv">
					<div id="checkDiv">
						<label for="checkbox"> <input type="checkbox" id="checkbox">
							위 안내사항을 모두 확인했습니다.
						</label>
					</div>
					<div id="QuitBtnsDiv">
						<div>
							<button id="cancelQuitBtn" class="btn btn-primary">모임 계속</button>
						</div>
						<div>
							<button id="groupQuitBtn" class="btn btn-danger">모임 나가기</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</body>
</html>