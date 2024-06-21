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
<link rel="stylesheet" href="/css/main.css" />
<link rel="stylesheet" href="/css/kkirikkiri.css" />

<script src="/jquery-3.7.1.min.js"></script>
<script>
	$(document).ready(function() {
		
	}); // ready end
</script>
</head>
<body>
	<%@ include file="mainHeaderLogin.jsp" %>	
	<main>
		<section class="main-banner row">
			<div class="col-1"></div>
			<div class="col-3">
				<img src="images/main_banner.png" alt="끼리끼리 배너"> 
			</div>	
			<div class="col-2"></div>
			<div class="banner-phrase col-5">
				<h1>친구도 취미도<br> <b>끼리끼리</b>에서</h1>
				<h6>나와 같은 관심사를 가진 사람들과 <br>가장 가까운 곳에서 소모임을 시작해보세요!</h6>
				<button>모임 만들기</button>
			</div>
			<div class="col-1"></div>				
		</section>
		
		<section class="container">
			<div class="my-group">
				<h3><b>내 모임</b></h3>
				<a href="#">내 모임 더보기</a>
			</div>			
			<div class="row">				
				<div class="col">
					<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/test.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/test.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/test.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/test.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>				  		
			</div>	
			<div class="row">				
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/kkirikkiri_logo.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/kkirikkiri_logo.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/kkirikkiri_logo.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>
				<div class="col">			    
		      		<a href="#" alt="">			    
			      		<img class="my-group-image" src="images/kkirikkiri_logo.png" alt="내 모임">    			    
					    <p>Some text</p>
				    </a>
				</div>				  		
			</div>	
			
			<div class="interest-group-suggestion">
				<h3><b>관심사별 모임</b></h3>
				<div class="row">				
					<div class="col interest-nav">			    
			      		<a href="#" alt="">			    
				      		<i class="fa-solid fa-shapes"></i>    			    
						    <p>전체모임</p>
					    </a>
					</div>
					<div class="col interest-nav">			    
			      		<a href="#" alt="">			    
				      		<i class="fa-solid fa-masks-theater"></i>    			    
						    <p>문화예술</p>
					    </a>
					</div>
					<div class="col interest-nav">			    
			      		<a href="#" alt="">			    
				      		<i class="fa-solid fa-person-running"></i>    			    
						    <p>액티비티</p>
					    </a>
					</div>
					<div class="col interest-nav">			    
			      		<a href="#" alt="">			    
				      		<i class="fa-solid fa-utensils"></i>   			    
						    <p>푸드&드링크</p>
					    </a>
					</div>
					<div class="col interest-nav">			    
			      		<a href="#" alt="">			    
				      		<i class="fa-solid fa-building-columns"></i>    			    
						    <p>자기계발</p>
					    </a>
					</div>	
					<div class="col interest-nav">			    
			      		<a href="#" alt="">			    
				      		<i class="fa-brands fa-sketch"></i>   			    
						    <p>기타</p>
					    </a>
					</div>					  		
				</div>			
				
				<div class="row">				
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>				  		
				</div>	
				<div class="row">				
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>
					<div class="col">			    
			      		<a href="#" alt="">			    
				      		<img class="interest-group-image" src="images/kkirikkiri_logo.png" alt="관심 카테고리별 모임">    			    
						    <p>Some text</p>
					    </a>
					</div>				  		
				</div>	
			</div>			
		</section>
	</main>
	<%@ include file="mainFooter.jsp" %>

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
<script src="main.js"></script>
</body>
</html>