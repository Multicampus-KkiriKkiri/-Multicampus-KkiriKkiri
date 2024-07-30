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
	<div class="header-nav-left">
		<a href="/mainLogin" class="logo">
			<img src="/images/kkirikkiri_logo.png" alt="끼리끼리 로고" class="logo">
		</a>		 
	       <form action="/groupsearch" method="get" class="search-area">
	         <input type="text" class="first-input" id="search-input" placeholder="모임 검색" /><!--  
	        --><select class="region-input" id="search-userRegion" name="userRegionId">
				<option id="show-user-region" value="${userRegion}">${userRegion}</option>
			 </select><!--
	         --><button>
	         <i class="fa-solid fa-magnifying-glass fa-thin" style="cursor: pointer; font-size: 18px; color:#e4e2dd"></i>
	         </button>
	       </form>	       
	</div>
	
	<div class="header-nav-right">
		<a href="/notificationgrouplist">
			<i class="fa-regular fa-bell header-nav-icon fa-thin"></i>
		</a>
		<a href="/notificationchatlist">
			<i class="fa-regular fa-comment header-nav-icon fa-thin"></i>
		</a>
		<a>
			<c:choose>
	            <c:when test="${empty profileImage or profileImage == '/upload/null'}">
	                <img id="uploadedImage" class="profile-circle" src="/images/empty_profile_image.png" alt="기본 프로필 사진">
	            </c:when>
	            <c:otherwise>
	                <img id="uploadedImage" class="profile-circle" src="${profileImage}" alt="내 프로필 사진">
	            </c:otherwise>
	        </c:choose> 			
		</a>			
				
		<span class="header-nav-right-dropdown-area">
		  <button id="main-header-login-dropdown-btn">
		    <i class="fa-solid fa-chevron-down"></i>
		  </button>		  
		  <ul id="main-header-login-dropdown-menu">
		    <li><a class="dropdown-item" href="/mypage">마이페이지</a></li>
		    <li><a class="dropdown-item" href="/groupregister/register">모임 만들기</a></li>
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