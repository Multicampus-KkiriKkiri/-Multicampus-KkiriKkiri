<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모임 등록</title>
    <link rel="stylesheet" href="<c:url value='/css/groupregister.css'/>">
</head>
<body>
    <!-- 공통 헤더 -->
    <header>
        <!-- 같이 들어갈 헤더 내용 -->
    </header>

    <div class="container">
        <h2>모임 등록</h2>

        <form action="<c:url value='/groupregister'/>" method="post" enctype="multipart/form-data">
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

            <div class="form-group" id="regionSelect" style="display: none;">
                <label for="region">모임 지역 선택</label>
                <select id="region" name="region">
                    <!-- 대한민국 지역 선택 옵션 -->
                    <c:forEach var="region" items="${regions}">
                        <option value="${region}">${region}</option>
                    </c:forEach>
                </select>

                <select id="subregion" name="subregion">
                    <!-- 구나 동 선택 옵션 (동적으로 변경 가능) -->
                </select>
            </div>

            <div class="form-group">
                <label>모임 설명 & 이미지</label>
                <div class="description-image-box">
                    <div class="image-box">
                        <label for="groupImage" class="image-placeholder">
                            <img id="preview" src="#" alt="이미지 미리보기" style="display:none;">
                            <span class="plus-icon">+</span>
                            <input type="file" id="groupImage" name="groupImage" accept="image/*" style="display:none;">
                        </label>
                        <button type="button" id="addImageButton">이미지 추가</button>
                    </div>
                    <textarea id="description" name="description" placeholder="모임 설명을 입력하세요" required></textarea>
                </div>
            </div>

            <div class="form-group">
                <label for="maxParticipants">참가인원(모임장 포함)</label>
                <input type="number" id="maxParticipants" name="maxParticipants" min="1" max="300" required>
            </div>

            <div class="form-group">
                <label>신청방식</label>
                <div class="application-type">
                    <button type="button" class="approval-type" data-value="선착순">선착순</button>
                    <button type="button" class="approval-type" data-value="가입제">가입제</button>
                </div>
                <div class="application-description">
                    <div class="first-come-first-served">
                        <img src="firstcome.jpg" alt="선착순 이미지">
                        <p>멤버들의 신청과 동시에 참여가 완료돼요.</p>
                    </div>
                    <div class="approval-system" style="display: none;">
                        <img src="approval.jpg" alt="승인제 이미지">
                        <p>모임장이 직접 멤버 수락, 거절 가능</p>
                        <div id="questionBox">
                            <label for="question">가입시 회원에게 물어볼 질문</label>
                            <input type="text" id="question" name="question">
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit">모임 등록</button>
        </form>
    </div>

    <script src="<c:url value='/js/groupregister.js'/>"></script>
</body>
</html>
