<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모임 등록</title>
    <link rel="stylesheet" href="<c:url value='/css/groupRegister.css'/>">
    <script src="<c:url value='/jquery-3.7.1.min.js'/>"></script>
    <script src="<c:url value='/js/groupregister/groupRegister.js'/>"></script>
    
</head>
<body>
    <header>
        <!-- 헤더 내용 -->
    </header>

    <div class="container">
        <h2>모임 등록</h2>

        <!-- 모임 등록 폼 -->
        <form id="groupForm" action="<c:url value='/groupregister/register'/>" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="groupName">모임 이름</label>
                <input type="text" id="groupName" name="groupName" required>
            </div>
            
            <div class="form-group">
                <label for="groupInterestId">모임 카테고리</label>
                <select id="groupInterestId" name="groupInterestId" required>
                    <option value="1">문화예술</option>
                    <option value="2">액티비티</option>
                    <option value="3">푸드/드링크</option>
                    <option value="4">자기계발</option>
                    <option value="5">기타</option>
                </select>
            </div>
            <!-- groupSignUpType 얘도 저장해야함.-->
            <div class="form-group">
                <label>활동 방식</label>
                <div class="activity-type">
                    <!-- <input type="button" id="offlineButton" name="groupType1" value="오프라인">
                
                    <input type="button" id="onlineButton"  name="groupType1" value="온라인">-->
                     <input type="radio" id="onlineButton"  name="groupType1" value="온라인">  온라인                   
                    <input type="radio" id="offlineButton"  name="groupType1" value="오프라인" checked> 오프라인
                   
                </div>
            </div>
            
                        
            <div class="form-group" id="regionSelect">
                <label for="groupRegionId">모임 지역 선택</label>
                <div class="region-container">
                    <select id="groupRegionId" name="groupRegionId">
                        <!-- 지역 정보가 여기에 추가됨 -->
                    </select>
                </div>
                <div class="districts-container">
                    <select id="groupDistrictId" name="groupDistrictId">
                        <!-- 구 정보가 여기에 추가됨 -->
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label>모임 설명 & 이미지</label>
                <div class="description-image-box">
                    <div class="image-box">
                        <label for="groupImage" class="image-placeholder">
                            <img id="preview" src="#" alt="이미지 미리보기" style="display:none; max-width: 200px; max-height: 200px;">
                            <span class="plus-icon">+</span>
                            <input type="file" id="groupImage" name="groupRegisterImage" accept="image/*" style="display:none;">
                            
                        </label>
                    </div>
                    <textarea id="groupDetail" name="groupDetail" placeholder="모임 설명을 입력하세요" required></textarea>
                </div>
            </div>
            
            <button type="button" id="addImageButton">이미지 추가</button>
            
            <div class="form-group">
                <label for="groupMaximum">참가인원(모임장 포함)</label>
                <input type="number" id="groupMaximum" name="groupMaximum" min="2" max="300" required>
            </div>
            
            <div class="form-group">
                <label>신청 방식</label>
                <div class="application-type">
                    <input type="radio" class="approval-type" data-value="선착순" name="groupSignUpType" value="선착순" checked>선착순
                    <input type="radio" class="approval-type" data-value="가입제" name="groupSignUpType" value="승인제" >승인제
                </div>
                <div class="application-description">
                    <div class="first-come-first-served active">
                        <!--  <img src="<c:url value='/images/firstcome.png' />" alt="선착순 이미지"> -->
                        <p>멤버들의 신청과 동시에 참여가 완료돼요. 누구나 참여할 수 있어서 신청률이 높아요.</p>
                    </div>
                    <div class="approval-system">
                        <!-- <img src="<c:url value='/images/approval.png' />" alt="승인제 이미지"> -->
                        <p>호스트가 직접 멤버를 수락하거나 거절할 수 있어요. 질문을 통해 취향이 통하는 사람들과 만날 수 있어요.</p>
                        <div class="form-group">
                            <label for="groupSignUpQuestion">가입시 회원에게 물어볼 질문</label>
                            <input type="text" id="groupSignUpQuestion" name="groupSignUpQuestion" style="width: 100%; height: 50px;">
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="submit" id="register_submit">모임 등록</button>
        </form>
    </div>
</body>
</html>
