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
<link rel="stylesheet" href="/css/mypage/editmypage.css" />  
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
	<h3>내 정보 보기로 돌아가기</h3><!-- 버튼 형식으로 만들어서 controller 연결하기 -->
	<h1>내 정보 수정</h1>
	
	<section class=big>
		
			<!-- 프로필 이미지 -->
			<form  method="post" enctype="multipart/form-data">
			    <div  id="signup-myprofile-show-img">
			        <!-- 이미지가 보여지는 공간 -->
			        <c:choose>
			            <c:when test="${empty profileImage}">
			                <img id="uploadedImage" src="/images/empty_profile_image.png" alt="기본 프로필 사진" style="width:300px;height:350px;">
			            </c:when>
			            <c:otherwise>
			                <img id="uploadedImage" src="${profileImage}" alt="내 프로필 사진" style="width:300px;height:350px;">
			            </c:otherwise>
			        </c:choose>     
			    </div>
			    <div class="file-input-container">
			        <label class="custom-file-label" for="file-upload">사진 업로드</label>
			        <input type="file" id="file-upload" name="profileImage" class="file-input" accept="image/*" onchange="loadFile(this)">
			    </div>
			</form>	
							
								
	
		<div class="test-area">
			별명<br>
			<input id="userNickname" type="text" value="${userNickname}"> 
			<button id="nickname-confirm-btn">별명 중복 검사</button>
			<div id="nickname-confirm-result">별명중복검사 결과창</div><br>
			자기소개<br>
			<textarea id="profileIntro" rows="4" cols="50">${userProfileIntro}</textarea><br>
			
			지역수정<br>
			<div>
				<select id="userRegion" name="userRegionId">
					<option value="" disabled selected>${userRegion}</option>
				</select>
			</div>
			<div>
				<select id="userDistrict" name="userDistrictId">
					<option value="" disabled selected>${userDistrict}</option>
				</select>
			</div>
			
			
			<h3>비밀번호 수정</h3>
			<button id="open-modify-pw-btn">비번 수정 버튼</button>
			
			<h3>계정 삭제</h3>
			<button id="open-delete-modal-btn">계정 삭제 버튼</button><br>
			
			<button id="edit-my-profile-btn">변경 내용 저장</button>
		</div>
	</section>	
</main>


<!-- 내 정보 수정 완료 후 확인 모달창 - 추후 추가하기-->



<!-- 비밀번호 수정 모달 -->
<div id="modify-pw-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <span class="modal-close" id="modify-pw-modal-close">&times;</span><br>
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    
	    <h5><b>비밀번호 수정</b></h5>

	    <form id="modify-pw-modal-form">
		    <div class="modify-pw" style="margin-top: 25px">
			    
		        <h6 style="margin-right:270px; margin-top: 15px;"><b>기존 비밀번호</b></h6>	  	    
			    <div class="password-input-container">
				  <input type="password" placeholder=" 기존 비밀번호를 입력하세요" id="modify-pw-modal-original-userPw" name="userPw" required>
				  <i class="fa-regular fa-eye-slash"></i>
				</div> 
				<div class="modify-pw-modal-form warning" id="modify-pw-modal-original-userPw-confirm"><!--기존 비밀번호 확인 결과창  --></div>
			    
			    <h6 style="margin-right:270px; margin-top: 15px;"><b>새로운 비밀번호</b></h6>	  	    
			    <div class="password-input-container">
				  <input type="password" placeholder=" 새로운 비밀번호를 입력하세요" id="modify-pw-modal-new-userPw" name="newUserPw" required>
				  <i class="fa-regular fa-eye-slash"></i>
				</div>		    	
			    <input type="password" placeholder=" 새로운 비밀번호 재입력" id="modify-pw-modal-new-userPw-confirm" name="newUserPw" required>
			    <div class="modify-pw-modal-form warning" id="modify-pw-modal-new-userPw-confirm-result"><!--비밀번호 일치 결과창  --></div> 	
			    <div class="modify-pw-modal-form warning" id="modify-pw-modal-final-confirm-result"><!--최종 비밀번호 수정 결과창  --></div>
			    
			    
		    </div>	    		    
		    <button type="button" id="modify-pw-modal-btn" class="login-modal-button">비밀번호 수정</button>	  
	    </form>  	
  	</div>       
  </div>
</div>



<!-- 계정 삭제 모달 -->
<div id="delete-account-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <span class="modal-close" id="delete-account-modal-close">&times;</span><br>
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    
	    <h5><b>계정 삭제</b></h5>
		<p>계정을 삭제하시면 가입/주최한 모든 모임 및 알림 내용을 포함한 모든 데이터가 삭제됩니다.
		정말 삭제 하시겠습니까?</p>
	    <form id="modify-pw-modal-form">
		    <div class="modify-pw" style="margin-top: 25px">
			    
		        <h6 style="margin-right:270px; margin-top: 15px;"><b>비밀번호</b></h6>	  	    
			    <div class="password-input-container">
				  <input type="password" placeholder=" 비밀번호를 입력하세요" id="delete-account-modal-userPw" name="userPw" required>
				  <i class="fa-regular fa-eye-slash" id="pw-icon"></i>
				</div> 
				<div class="delete-account-modal-form warning" id="delete-account-modal-pw-confirm"><!--비밀번호 확인 결과창  --></div>			    
		    </div>	    		    
		    <button type="button" id="delete-account-modal-btn" class="login-modal-button">계정 삭제</button>	  
	    </form>  	
  	</div>       
  </div>
</div>


















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
<script src="<c:url value='/js/mypage/editMyPage.js'/>"></script>
</body>
</html>