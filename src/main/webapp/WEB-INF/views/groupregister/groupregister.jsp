<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모임 등록</title>
    <link rel="stylesheet" href="<c:url value='/css/groupregister.css'/>">
    <script src="<c:url value='/jquery-3.7.1.min.js'/>"></script>
    <script src="<c:url value='/js/groupregister/groupregister.js'/>"></script>
</head>
<body>
    <header>
        <!-- 헤더 내용 -->
    </header>

    <div class="container">
        <h2>모임 등록</h2>

        <!-- 모임 등록 폼 -->
        <form action="<c:url value='/group/register'/>" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="groupName">모임 이름</label>
                <input type="text" id="groupName" name="groupName" required>
            </div>
            
            <div class="form-group">
                <label for="category">모임 카테고리</label>
                <select id="category" name="category" required>
                    <option value="문화예술">문화예술</option>
                    <option value="액티비티">액티비티</option>
                    <option value="푸드/드링크">푸드/드링크</option>
                    <option value="자기계발">자기계발</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>활동 방식</label>
                <div class="activity-type">
                    <button type="button" id="offlineButton">오프라인</button>
                    <button type="button" id="onlineButton">온라인</button>
                </div>
            </div>
            
            <div class="form-group" id="regionSelect">
                <label for="region">모임 지역 선택</label>
                <div class="region-container">
                    <select id="region" name="region">
                        <!-- 지역 정보가 여기에 추가됨 -->
                    </select>
                </div>
                <div class="districts-container">
                    <select id="district" name="district">
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
                            <input type="file" id="groupImage" name="groupImage" accept="image/*" style="display:none;">
                        </label>
                    </div>
                    <textarea id="description" name="description" placeholder="모임 설명을 입력하세요" required></textarea>
                </div>
            </div>
            
            <button type="button" id="addImageButton">이미지 추가</button>
            
            <div class="form-group">
                <label for="maxParticipants">참가인원(모임장 포함)</label>
                <input type="number" id="maxParticipants" name="maxParticipants" min="1" max="300" required>
            </div>
            
            <div class="form-group">
                <label>신청 방식</label>
                <div class="application-type">
                    <button type="button" class="approval-type" data-value="선착순">선착순</button>
                    <button type="button" class="approval-type" data-value="가입제">승인제</button>
                </div>
                <div class="application-description">
                    <div class="first-come-first-served active">
                        <img src="<c:url value='/images/firstcome.png' />" alt="선착순 이미지">
                        <p>멤버들의 신청과 동시에 참여가 완료돼요. 누구나 참여할 수 있어서 신청률이 높아요.</p>
                    </div>
                    <div class="approval-system">
                        <img src="<c:url value='/images/approval.png' />" alt="승인제 이미지">
                        <p>호스트가 직접 멤버를 수락하거나 거절할 수 있어요. 질문을 통해 취향이 통하는 사람들과 만날 수 있어요.</p>
                        <div class="form-group">
                            <label for="question">가입시 회원에게 물어볼 질문</label>
                            <input type="text" id="question" name="question" style="width: 100%; height: 50px;">
                            <p>호스트의 질문:</p>
                            <p id="hostQuestion"></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="submit" id="register_submit">모임 등록</button>
        </form>
    </div>
</body>
</html>
