<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모임 등록</title>
    <link rel="stylesheet" href="<c:url value='/css/groupRegister.css'/>">
    <!-- 최신 Bootstrap CSS 링크 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- Bootstrap JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <script src="<c:url value='/js/groupregister/groupRegister.js'/>"></script>
</head>


<body>
    <header>
        <c:choose>
            <c:when test="${userId == 0}">
                <jsp:include page="../mainpage/mainHeader.jsp" />
            </c:when>
            <c:otherwise>
                <jsp:include page="../mainpage/mainHeaderLogin.jsp" />
            </c:otherwise>
        </c:choose>
    </header>

    <div class="container mt-5">
        <h2 class="text-center mb-4">모임 등록</h2>

        <!-- 모임 등록 폼 -->
        <form id="groupForm" action="<c:url value='/groupregister/register'/>" method="post" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="groupName" class="form-label">모임 이름</label>
                <input type="text" id="groupName" name="groupName" class="form-control" required>
            </div>
            
            <div class="mb-3">
                <label for="groupInterestId" class="form-label">모임 카테고리</label>
                <select id="groupInterestId" name="groupInterestId" class="form-select" required>
                    <option value="1">문화예술</option>
                    <option value="2">액티비티</option>
                    <option value="3">푸드/드링크</option>
                    <option value="4">자기계발</option>
                    <option value="5">기타</option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">활동 방식</label>
                <div class="form-check">
                    <input type="radio" id="onlineButton" name="groupType1" value="온라인" class="form-check-input">
                    <label for="onlineButton" class="form-check-label">온라인</label>
                </div>
                <div class="form-check">
                    <input type="radio" id="offlineButton" name="groupType1" value="오프라인" class="form-check-input">
                    <label for="offlineButton" class="form-check-label">오프라인</label>
                </div>
            </div>
            
            <div class="mb-3" id="regionSelect">
                <label for="groupRegionId" class="form-label">모임 지역 선택</label>
                <select id="groupRegionId" name="groupRegionId" class="form-select">
                    <!-- 지역 정보가 여기에 추가됨 -->
                </select>
                <select id="groupDistrictId" name="groupDistrictId" class="form-select mt-2">
                    <!-- 구 정보가 여기에 추가됨 -->
                </select>
            </div>
            
			          <div class="mb-3">
			    <label class="form-label">모임 설명 & 이미지</label>
			    <div class="d-flex">
			        <div class="image-box me-3">
			            <label for="groupImage" class="d-flex justify-content-center align-items-center h-100 text-muted cursor-pointer">
			                <img id="preview" src="#" alt="이미지 미리보기" class="img-fluid d-none" style="max-width: 200px; max-height: 200px;">
			                <span class="fs-1">+</span>
			                <input type="file" id="groupImage" name="groupRegisterImage" accept="image/*" class="d-none">
			            </label>
			        </div>
			        <textarea id="groupDetail" name="groupDetail" class="form-control" placeholder="모임 설명을 입력하세요" rows="5" required></textarea>
			    </div>
			</div>
			
			<button type="button" id="addImageButton" class="btn btn-secondary mb-3">이미지 추가</button>

            
            <div class="mb-3">
                <label for="groupMaximum" class="form-label">참가인원(모임장 포함)</label>
                <input type="number" id="groupMaximum" name="groupMaximum" class="form-control" min="2" max="300" required>
            </div>
            
            <div class="mb-3">
                <label class="form-label">신청 방식</label>
                <div class="d-flex flex-column">
                    <div class="form-check">
                        <input type="radio" class="form-check-input approval-type" data-value="선착순" name="groupSignUpType" value="선착순" checked>
                        <label class="form-check-label">선착순</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" class="form-check-input approval-type" data-value="승인제" name="groupSignUpType" value="승인제">
                        <label class="form-check-label">승인제</label>
                    </div>
                </div>
                <div class="mt-2">
                    <div class="first-come-first-served active">
                        <p>멤버들의 신청과 동시에 참여가 완료돼요. 누구나 참여할 수 있어서 신청률이 높아요.</p>
                    </div>
                    <div class="approval-system">
                        <p>호스트가 직접 멤버를 수락하거나 거절할 수 있어요. 질문을 통해 취향이 통하는 사람들과 만날 수 있어요.</p>
                        <div class="mb-3">
                            <label for="groupSignUpQuestion" class="form-label">가입시 회원에게 물어볼 질문</label>
                            <input type="text" id="groupSignUpQuestion" name="groupSignUpQuestion" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="submit" id="register_submit" class="btn btn-primary">모임 등록</button>
        </form>
    </div>
    
    <footer>
        <jsp:include page="../mainpage/mainFooter.jsp" />
    </footer>
</body>
</html>
