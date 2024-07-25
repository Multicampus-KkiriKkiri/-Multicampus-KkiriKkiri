<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>    
    
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
	<a id="go-back-to-mypage" href="/mypage">
	<i class="fa-solid fa-arrow-left"></i> 마이 페이지로 돌아가기
	</a>
	<h3 id="edit-mypage-title"><b>내 정보 수정</b></h3>
	
	<section class="edit-mypage-main-area">	
		<!-- 프로필 이미지 -->
		<form  class="edit-my-profile-image-area" method="post" enctype="multipart/form-data">
		    <div  id="edit-myprofile-show-img">
		        <!-- 이미지가 보여지는 공간 -->
		        <c:choose>
		            <c:when test="${empty profileImage}">
		                <img class="edit-mypage-uploaded-image" id="edit-mypage-uploadedImage" src="/images/empty_profile_image.png" alt="기본 프로필 사진"">
		            </c:when>
		            <c:otherwise>
		                <img class="edit-mypage-uploaded-image" id="edit-mypage-uploadedImage" src="${profileImage}" alt="내 프로필 사진">
		            </c:otherwise>
		        </c:choose>     
		    </div>
	    
		    <div class="file-input-container">
		        <label class="custom-file-label" for="file-upload">사진 업로드</label>
		        <input type="file" id="file-upload" name="profileImage" class="file-input" accept="image/*" onchange="loadFile(this)">
		    </div>
		    <div class="edit-mypage-img-save-message">* '사진 업로드' 후 '변경 내용 저장' 버튼을 <br>눌러 저장해 주세요.</div>
		</form>								
	
		<div class="edit-my-info-area">		
			<h6><b>별명</b></h6>
			<div class="edit-mypage-nickName-area">
				<div class="mypage-check-nickName-input-count-num-area">
					<input id="userNickname" type="text" value="${userNickname}" maxLength=26> 
					<span id="mypage-nickName-count-num">${25 - fn:length(userNickname)}</span>
				</div>
				<button id="nickname-confirm-btn">중복확인</button>
			</div>
			<div id="nickname-confirm-result"><!--별명중복검사 결과창  --></div><br>
			<div id="mypage-nickname-count-confirm-result"><!-- 별명 글자수 제한 결과창 --></div>		
			
			<h6><b>자기소개</b></h6>
			<div class="mypage-prfile-intro-input-count-num-area">
				<textarea id="profileIntro" rows="4" cols="5" maxLength=201>${userProfileIntro}</textarea><br>
				<span id="mypage-profile-intro-count-num">${200 - fn:length(userProfileIntro)}</span>
			</div>
			<div id="mypage-profile-intro-count-result"><!--자기소개 글자수 제한 결과창--></div>
			<h6 class="edit-user-area-title"><b>지역</b></h6>			
			<select class="edit-user-area-options" id="userRegion" name="userRegionId">
				<option value="${userRegion}">${userRegion}</option>
			</select>		
			<select class="edit-user-area-options" id="userDistrict" name="userDistrictId">
				<option value="${userDistrict}">${userDistrict}</option>
			</select>		
			<div id="mypage-confirm-result-before-edit"><!-- 별명 미입력시 안내창 --></div>	
			<button id="edit-my-profile-btn">변경 내용 저장</button>
			
			<div class="edit-pw-delete-account">
				<h5>비밀번호 수정하기</h5>
				<p>비밀번호 수정 후 자동으로 로그아웃이 됩니다.<br> 비밀번호 수정 완료 후 다시 로그인해 주세요.</p>
				<button id="open-modify-pw-btn">비밀번호 수정</button>			
			
				<h5 class="delete-account-title">계정 삭제하기</h5>
				<p>계정 삭제 후 끼리끼리 사용을 원하실 경우<br> 회원가입을 통한 새로운 계정을 만들어 주세요.</p>
				<button id="open-delete-modal-btn">계정 삭제</button><br>
			</div>			
		</div>		
	</section>		
</main>

<!-- 내 정보 변경 완료 모달 -->
<div id="edit-my-profile-confirm-message-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container edit-my-profile-confirm-message-modal-main">
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:40px; height:40px; margin-top:8px; margin-right:5px;">  	    	
	    <h6 class="confirm-message-area">내 정보가 수정되었습니다.</h6>
  	</div>       
  </div>
</div>

<!-- 비밀번호 수정 모달 -->
<div id="modify-pw-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <span class="modal-close" id="modify-pw-modal-close">&times;</span><br>
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    
	    <h5><b>비밀번호 수정하기</b></h5>
	    <form id="modify-pw-modal-form">
		    <div class="modify-pw" style="margin-top: 25px">			    
		        <h6 class="modify-pw-subtitle"><b>기존 비밀번호</b></h6>		        	  	    
			    <div class="password-input-container-in-modify-modal">
				  <input type="password" placeholder=" 기존 비밀번호를 입력하세요" id="modify-pw-modal-original-userPw" name="userPw" required>
				  <i class="fa-regular fa-eye-slash"></i>
				</div> 				
				<div class="modify-pw-modal-form modify-pw-modal-warning" id="modify-pw-modal-original-userPw-confirm"><!--기존 비밀번호 확인 결과창  --></div>
			    <h6 class="modify-pw-subtitle"><b>새로운 비밀번호</b></h6>	 			    	    
			    <div class="password-input-container-in-modify-modal">
				  <input type="password" placeholder=" 새로운 비밀번호를 입력하세요" id="modify-pw-modal-new-userPw" name="newUserPw" required>
				  <i class="fa-regular fa-eye-slash"></i>
				</div>		 				   	
			    <input type="password" placeholder=" 새로운 비밀번호 재입력" id="modify-pw-modal-new-userPw-confirm" name="newUserPw" required>
			    <div class="modify-pw-modal-form modify-pw-modal-warning" id="modify-pw-modal-new-userPw-confirm-result"><!--비밀번호 일치 결과창  --></div> 	
			    <div class="modify-pw-modal-form modify-pw-modal-warning" id="modify-pw-modal-final-confirm-result"><!--최종 비밀번호 수정 결과창  --></div>    
		    </div>	    		    
		    <button type="button" id="modify-pw-modal-btn" class="login-modal-button">비밀번호 수정</button>	  
	    </form>  	
  	</div>       
  </div>
</div>

<!-- 비밀번호 수정완료 모달 -->
<div id="modify-pw-confirm-message-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    	
	    <h6 class="confirm-message-area">비밀번호 수정이 완료됐습니다. <br>다시 로그인해 주세요.</h6>
	    <button onclick="location.href='/logout'" type="button" id="modify-pw-confirm-message-modal-btn" class="edit-mypage-modal-confirm-message-btn">확인</button>
  	</div>       
  </div>
</div>

<!-- 계정 삭제 모달 -->
<div id="delete-account-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <span class="modal-close" id="delete-account-modal-close">&times;</span><br>
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    
	    <h5><b><i class="fa-solid fa-triangle-exclamation" style="margin-right:7px; color: #F2DD00;"></i>계정 삭제하기</b></h5>
		<p>가입/주최한 모임 및 알림 내용을 포함한 <br>모든 데이터가 삭제됩니다.</p>
		<h6>정말 삭제 하시겠습니까?</h6>
	    <form id="modify-pw-modal-form">
	    
		    <div class="delete-account" style="margin-top: 25px">
			    
		        <h6 style="margin-right:270px; margin-top: 15px;"><b>비밀번호</b></h6>	 
		         	    
			    <div class="password-input-container-in-delete-account-modal">
				  <input type="password" placeholder=" 비밀번호를 입력하세요" id="delete-account-modal-userPw" name="userPw" required>
				  <i class="fa-regular fa-eye-slash" id="pw-icon"></i>
				</div> 
				
				<div class="delete-account-modal-form-warning warning" id="delete-account-modal-pw-confirm"><!--비밀번호 확인 결과창  --></div>			    
		    </div>
		    	    		    
		    <button type="button" id="delete-account-modal-btn" class="login-modal-button">계정 삭제</button>	  
	    </form>  
	    	
  	</div>       
  </div>
</div>

<!-- 계정 삭제 완료 모달 -->
<div id="delete-account-confirm-message-modal" class="modal">
  <div class="modal-contents" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    	
	    <h6 class="confirm-message-area">계정이 삭제되었습니다. <br>그동안 끼리끼리를 이용해 주셔서 감사합니다.</h6>
	    <button onclick="location.href='/kkirikkiri'" type="button" id="delete-account-confirm-message-modal-btn" class="edit-mypage-modal-confirm-message-btn">확인</button>
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