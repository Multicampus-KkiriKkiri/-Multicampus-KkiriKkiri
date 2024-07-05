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
			<img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" class="logo">
		</a>		 
	       <span class="search-area">
	         <input type="text" class="first-input" id="search-input" placeholder="검색어 입력" /><!--  
	        --><input type="text" class="second-input" id="search-input" placeholder="지역 입력" /><!--
	         --><button>
	         <i class="fa-solid fa-magnifying-glass fa-thin" style="cursor: pointer; font-size: 18px; color:#e4e2dd"></i>
	         </button>
	       </span>	       
	</div>
	
	<div class="header-nav-right">
		<a href="#">
			<i class="fa-regular fa-bell header-nav-icon fa-thin"></i>
		</a>
		<a href="#">
			<i class="fa-regular fa-comment header-nav-icon fa-thin"></i>
		</a>
		<a href="#">
			<img class="profile-circle" src="${profileImage}" alt="내 프로필 사진">
		</a>			
		<span class="btn-group dropdown">
		  <button class="dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:white">
		    <i class="fa-solid fa-chevron-down" style="margin-bottom:15px; background-color:white; color:#706F6F"></i>
		  </button>		  
			  <ul class="dropdown-menu dropdown-menu-end" >
			    <li><a class="dropdown-item" href="#">마이페이지</a></li>
			    <li><a class="dropdown-item" href="#">모임 만들기</a></li>
			    <li><a class="dropdown-item" href="/logout">로그아웃</a></li>
			  </ul>		  		  
		</span>
	</div>	
</header>

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
<script src="<c:url value='/js/mainpage/mainHeaderLogin.js'/>"></script>
</body>
</html>