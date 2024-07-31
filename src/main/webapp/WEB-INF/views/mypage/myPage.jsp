<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    

<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
    
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
	<div class="myPage-title">
		<h2>안녕하세요,</h2> 
		<div class="myPage-subTitle">
			<h1><b>${loginUser.userNickname}</b></h1>
			<h2>님<i class="fa-brands fa-fly"></i></h2>		
		</div>	
	</div>
		
	<div class="mypage-container">	
		<section class="col-3 my-info-area">		
			<div class="my-info-area-deco-box">			
				<div class="profile-img-container">
			        <c:choose>
			            <c:when test="${empty profileImage or profileImage == '/upload/null'}">
			                <img id="uploadedImage" src="/images/empty_profile_image.png" alt="기본 프로필 사진" style="width:300px;height:350px;">
			            </c:when>
			            <c:otherwise>	
			                <img id="uploadedImage" src="${profileImage }" alt="내 프로필 사진" style="width:300px;height:350px;">
			            </c:otherwise>
			        </c:choose> 
			        
					<div class="profile-overlay"></div>
					
					<div class="profile-text">
						<h4 class="my-page-userNickname" style=""><b>${loginUser.userNickname}</b></h4>					
						<div>${loginUser.userEmail}</div>
						<div class="my-page-region-area">
							<i class="fa-solid fa-location-dot" style="margin-right:5px; margin-top:5px;"></i>
							<div>${userRegion} ${loginUserDistrict}</div>	
						</div>					
					</div>										
				</div>	
						
				<div class="my-page-interest-area">
					<button onclick=location.href="/editmypage" id="go-to-edit-my-page">
						<i class="fa-solid fa-pen"></i>내 정보 수정하기
					</button>
					<p><b>내 관심사</b></p>	
						<div id="user-interests">
							<c:forEach items="${loginUserInterestNames}" var="interestName">
				                     <div class="my-page-show-interest-area">
				                     	<i class="fa-solid fa-paper-plane"></i>
				                     	<div>${interestName}</div>
			                     	 </div>
			                 </c:forEach>
						</div>							    						
					<button id="show-modify-interest-btn">관심사 수정하기</button>	
				</div> 					
				
				<div id="interest-list-area" style="display:none">
					<div class="first-my-page-interest-checkbox-area">
						<input class="interest-list" type="checkbox" id="cultureArt" name="cultureArt">
	        			<label for="cultureArt">문화예술</label>			            
				
						<input class="interest-list" type="checkbox" id="activity" name="activity">
						<label for="activity">액티비티</label>
					</div>
					
					<div class="second-my-page-interest-checkbox-area"> 
						<input class="interest-list" type="checkbox" id="foodDrink" name="foodDrink">
	        			<label for="foodDrink">푸드/드링크</label>
	        		
	        			<input class="interest-list" type="checkbox" id="selfStudy" name="selfStudy">
	        			<label for="selfStudy">자기계발</label>
	        		</div>
	        		
	        		<div class="third-my-page-interest-checkbox-area">
	        			<input class="interest-list" type="checkbox" id="etc" name="etc">
	        			<label for="etc">기타</label> 	
					</div>
					
					<div id="my-page-interest-warning"><!-- 관심사 한 가지 이상 선택 안내 메시지 --></div>
					<button id="modify-interest-btn">수정 완료</button>
				</div>
			</div>		
		</section>
		
		<section class="col-10 my-group-area">
			<div id="my-page-nav">
				<button id="my-group-area">내 모임</button>
				<button id="my-event-area">내 모임 일정</button>					
			</div>
			<div class="my-page-top-nav-line"><!--메뉴탭 아래 선 --></div>							
				
				<div id="my-groups">
					<div id="my-group-area-nav">
						<button class="my-group-bottom-nav" id="as-member">모임원</button>
						<button class="my-group-bottom-nav" id="as-leader">모임장</button>
						<button class="my-group-bottom-nav" id="waiting-lists">신청 대기</button>
						<button class="my-group-bottom-nav" id="wishlists">찜</button>				
						<div id="my-group-nav-underline"><!--메뉴탭 아래 슬라이딩 선 --></div>
					</div>	
					<div id="my-group-content" class="row">
					<!--모임메뉴탭에 따라 ajax를 통해 받은 내용이 달리 보여짐  -->					
					</div>
				</div>	
				
				<div id="my-events">
					<div id="my-event-area-nav">
						<button class="my-event-bottom-nav" id="ongoing-events">예정된 일정</button>
						<button class="my-event-bottom-nav" id="past-events">지난 일정</button>				
						<div id="my-event-nav-underline"><!--메뉴탭 아래 슬라이딩 선--> </div>
					</div>			
					<div id="my-event-content">
					<!-- ajax로 받은 일정 목록이 보여짐 -->
					</div>
				</div>								
		</section>
	</div>	
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

<script src="/js/mypage/myPage.js"></script>
	<!--관심사 체크박스 - 데이터에서 받아온 사용자 관심사 정보와 일치하면 
	checkbox 체크한 상태로 화면 보여주기 + 체크된 관심사 항목을 다시 컨트롤러로 주기 위해 배열에 저장
	js파일에 있는 interests[]을 사용해야 하기 때문에 js파일 스크립트 아랫부분에 반드시 써야함  -->
	<c:forEach items="${loginUserInterestNames}" var="interestName">
		<c:if test="${interestName =='문화예술'}"> 
		 <script>
		   $("#cultureArt").attr("checked", "checked");
		   interests.push("문화예술");
		 </script>
		</c:if>  
		
		<c:if test="${interestName =='액티비티'}"> 
		 <script>
		 	$("#activity").attr("checked", "checked");
		    interests.push("액티비티");
		 </script>
		</c:if>
		
		<c:if test="${interestName =='푸드/드링크'}"> 
		 <script>		 	
		 	$("#foodDrink").attr("checked", "checked");
		    interests.push("푸드/드링크");	
		 </script>
		</c:if>
		
		<c:if test="${interestName =='자기계발'}"> 
		 <script>
		 $("#selfStudy").attr("checked", "checked");
		   interests.push("자기계발");
		 </script>		 
		</c:if>	
		
		 <c:if test="${interestName =='기타'}"> 
		 <script>
		 $("#etc").attr("checked", "checked");
		   interests.push("기타");
		 </script>
		</c:if>	
	</c:forEach>
</body>
</html>

