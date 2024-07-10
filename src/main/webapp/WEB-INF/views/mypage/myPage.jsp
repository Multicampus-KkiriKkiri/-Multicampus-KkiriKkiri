<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>      
    
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
<link rel="stylesheet" href="/css/mypage/mypage.css" />  
<link rel="stylesheet" href="/css/kkirikkiri.css" />

<script src="/jquery-3.7.1.min.js"></script>   
<script>
$(document).ready(function(){
	
});
</script>
    
</head>
<body>
<%@ include file="/WEB-INF/views/mainpage/mainHeaderLogin.jsp" %>

<main class="container">
	<h1>안녕하세요 ${loginUser.userNickname}님!</h1>
	<div class="mypage-container">
		<section class="col-3" style="border:1px solid red;">
			<div class="profile-img-container">
				<img src="/images/letsGo.jpg" alt="내 프로필 사진">	
				<div class="profile-overlay"></div>
				<div class="profile-text">
					<div name="userNickname">${loginUser.userNickname}</div>
					<div>${loginUserRegion} ${loginUserDistrict}</div>	
				</div>							
			</div>			
				<div>
					<div>내 관심사</div>					
					 <ul>
		                 <c:forEach items="${loginUserInterestNames}" var="interestName">
		                     <li>${interestName}</li>
		                 </c:forEach>
	                  </ul>							
					<div>관심사 목록</div>
					<div>문화예술</div>
					<div>액티비티</div>
					<div>푸드/드링크</div>
					<div>자기계발</div>
					<div>기타</div>					
				</div>
				<button onclick=location.href="/editmypage">내 정보 수정</button>
				<!--  
				<form action="/gotomypage" method="post">
					<input type="hidden" id="userRegion" name="userRegion" value="${loginUserRegion}">
				</form>
				-->
		</section>
		
		<section class="col-10" style="border:1px solid red;">		
				<div class="list-nav">
					<a href="#">내 모임</a>
					<a href="#">내 모임 일정</a>
				</div>
				
				<div id="my-groups-by-status">
					<a href="#">모임원</a>
					<a href="#">모임장</a>
					<a href="#">신청 대기</a>
					<a href="#">찜</a>				
				</div>				
				<div>
				모임메뉴탭에 따라 내용이 달리 보여짐
				</div>				
		</section>
	</div>	
	
	<!--  
	<section class="show-my-list-area row">		
		<div class="col-4" style="border:1px solid blue; width:430px;">			
				<div>일정이미지</div>
				<div>
					<div>일정날짜</div>
					<div>일정제목</div>
					<div>모임이름</div>
				</div>					
		</div>		
	</section>
	-->	
</main>





<%@ include file="/WEB-INF/views/mainpage/mainFooter.jsp" %> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.0/moment.min.js"></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
  crossorigin="anonymous"
></script>
<script
  src="https://kit.fontawesome.com/2c827c8cca.js"
  crossorigin="anonymous"
></script>
<script src="<c:url value='/js/mypage/myPage.js'/>"></script>
</body>
</html>












