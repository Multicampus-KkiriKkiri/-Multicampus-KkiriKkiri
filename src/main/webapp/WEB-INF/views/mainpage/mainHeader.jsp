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
<link rel="stylesheet" href="/css/kkirikkiri.css" />

<!-- 구글 로그인 -->
<meta name ="google-signin-client_id" content="592800938088-7p3at2tql9q7fandc48m3fllfolbkd78.apps.googleusercontent.com">

<script src="/jquery-3.7.1.min.js"></script>   
<script>
$(document).ready(function(){
	
});
</script>    
</head>
<body>
<header class="header-nav">
	<div>
		<a href="#" class="logo">
			<img src="images/kkirikkiri_logo.png" alt="끼리끼리 로고" class="logo">
		</a>		 
	       <span class="search-area">
	         <input type="text" class="first-input" id="search-input" placeholder="검색어 입력" /><!--  
	        --><input type="text" class="second-input" id="search-input" placeholder="지역이나타나야 해" /><!--
	         --><button>
	         <i class="fa-solid fa-magnifying-glass fa-thin" style="cursor: pointer; font-size: 18px; color:white"></i>
	         </button>
	       </span>	       
	</div>
	
	<div class="before-login-header-nav-right">
		<button id="login-button">로그인</button>
		<button id="signup-button">회원가입</button>
	</div>	
</header>

<!-- 로그인 모달 -->
<div id="login-modal" class="modal">
  <div class="modal-content" style="padding-bottom:30px;">
  	<div class="modal-content-container">
	    <span class="modal-close">&times;</span><br>
	    <img src="images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    
	    <h2><b>로그인</b></h2>
	    <div class="signup-suggestion">
		    <h6 style="margin-right:7px">아직 계정이 없다면?</h6>
		    <a href="#" style="color:#3b5f3e"><b>계정 만들기</b></a>
	    </div>
	    <div class="email-login" style="margin-top: 25px">
		    <h6 style="margin-right:290px"><b>이메일</b></h6>
		    <input type="text">
		    <h6 style="margin-right:270px; margin-top: 15px"><b>비밀번호</b></h6>
		    <input type="password">
	    </div>	    
	    <button class="login-modal-button">로그인</button>	    
	    <div style="display:flex; align-items:center; justify-content:space-between; padding: 0 10px; margin:20px 0">
		    <div style="flex: 1; border-top: 1px solid #e4e2dd;"></div>
		    <span style="margin: 0 10px;">또는</span>
		    <div style="flex: 1; border-top: 1px solid #e4e2dd;"></div>
	    </div>
	    <!-- 카카오 로그인 -->
	    <div onclick="kakaoLogin();">
		    <a href="javascript:void(0)">
		    	<img src="images/kakao_login_medium_wide.png" alt="카카오톡 로그인 버튼" style="width: 80%">
		    </a>	
	    </div>
	    <!-- 구글 로그인 -->
		<div id="GgCustomLogin" style="height: 100px; padding:0px">
			<a href="javascript:void(0)">
				<img src="images/google_login.png" alt="구글 로그인 버튼" style="width:350px; margin-top: 13px;">
			</a>
		</div>	
		<a href="#" style="text-decoration:underline; margin-top:0px;">로그인에 어려움이 있으신가요?</a>     	
  	</div>       
  </div>
</div>

<!-- 회원가입 모달 -->
<div id="signup-modal" class="modal">
  <div class="modal-content" style="padding-bottom:40px;">
  	<div class="modal-content-container">
	    <span class="modal-close">&times;</span><br><br>
	    <img src="images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  	    
	    <h2><b>회원가입</b></h2>
	    <div class="signup-suggestion">
		    <h6 style="margin-right:7px">이미 회원이신가요?</h6>
		    <a href="#" style="color:#3b5f3e"><b>로그인 하기</b></a>
	    </div>
		<!-- 카카오 회원가입 -->
	    <div onclick="kakaoLogin();">
		    <a href="javascript:void(0)">
		    	<button class="signup-button" style="margin-top:25px; background-color:#F7E600"><i class="fa-solid fa-comment" style="margin-right:10px;"></i>카카오로 계속하기</button>  
		    </a>	
	    </div>
	    <!-- 구글 회원가입 -->
		<div id="GgCustomLogin" >
			<a href="javascript:void(0)">
				<button class="signup-button"><img src="images/google_logo.png" alt="구글 로고" style="margin-right:15px;">구글로 계속하기</button>  
			</a>
		</div>	
		<button class="signup-button" id="open-email-signup-modal"><i class="fa-solid fa-envelope" style="margin-right:10px;"></i>이메일로 가입하기</button>   
  	</div>
  </div>
</div>

<!-- 이메일 회원가입 모달 -->
<div id="email-signup-modal" class="modal">
  <div class="modal-content" style="padding-bottom:40px;">
  	<div class="modal-content-container">
	    <span class="modal-close">&times;</span><br><br>
	    <img src="images/kkirikkiri_logo.png" alt="끼리끼리 로고" style="width:50px; height:50px">  
	    <div class="email-login" style="margin-top: 25px">
		    <h6 style="margin-right:290px"><b>이메일</b></h6>
		    <input type="text">
		    <div class="email-signup-form">이메일 중복 결과창</div> 
		    <h6 style="margin-right:270px; margin-top: 15px;"><b>비밀번호</b></h6>		    
		    
		    <div class="password-input-container">
        		<input type="password" id="passwordInput" class="password-input" placeholder="   비밀번호">
        		<i class="fa-solid fa-eye-slash toggle-password" onclick="togglePasswordVisibility()"></i>
    		</div>   	    
		    <input type="password" placeholder="   비밀번호 재입력">
		    <div class="email-signup-form">비밀번호 일치 결과창</div> 	    
	    </div>
	    <div class="email-signup-form" style="margin-top:20px;">
	    	<input type="checkbox" name="age" value="rightAge" class="email-signup-form-checkbox"> 
	    	<span style="font-size:17px; margin-left:10px;">저는 18세 이상입니다.</span>
	    </div>	
	    	    		    
		<div class="email-signup-form">전체 입력이 안됐을시 보여지는 창</div> 
	    <button class="login-modal-button">회원가입</button>  	    
	    <div class="signup-suggestion" style="margin-top: 25px;">
		    <h6 style="margin-right:7px">이미 회원이신가요?</h6>
		    <a href="#" style="color:#3b5f3e"><b>로그인 하기</b></a>
	    </div>
		   
  	</div>
  </div>
</div>






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
<!-- 카카오톡 api -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<!-- 구글 api-->
<script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
<script src="<c:url value='/js/mainpage/mainHeader.js'/>"></script>
</body>
</html>