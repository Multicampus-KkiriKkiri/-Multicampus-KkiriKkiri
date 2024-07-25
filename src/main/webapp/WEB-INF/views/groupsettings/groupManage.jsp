<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모임 관리</title>
    <link rel="stylesheet" href="<c:url value='/css/groupsettings/groupManage.css'/>">
    <script src="<c:url value='/jquery-3.7.1.min.js'/>"></script>
    <script src="<c:url value='/js/groupsettings/groupManage.js'/>"></script>
</head>
<body>
    <header>
        <!-- 헤더 내용 -->
    </header>

    <div class="container">
        <h2>모임 관리</h2>

        <!-- 모임 관리 폼 -->
        <form id="groupForm" action="<c:url value='/groupmanage/update'/>" method="post" enctype="multipart/form-data">
            <input type="hidden" id="groupId" name="groupId" value="${groupDTO.groupId}">

            <div class="form-group">
                <label for="groupName">모임 이름 수정</label>
                <input type="text" id="groupName" name="groupName" value="${groupDTO.groupName}" required>
            </div>

            <div class="form-group">
                <label for="groupInterestId">모임 카테고리 수정</label>
                <select id="groupInterestId" name="groupInterestId" required>
                    <option value="1" ${groupDTO.groupInterestId == 1 ? 'selected' : ''}>문화예술</option>
                    <option value="2" ${groupDTO.groupInterestId == 2 ? 'selected' : ''}>액티비티</option>
                    <option value="3" ${groupDTO.groupInterestId == 3 ? 'selected' : ''}>푸드/드링크</option>
                    <option value="4" ${groupDTO.groupInterestId == 4 ? 'selected' : ''}>자기계발</option>
                    <option value="5" ${groupDTO.groupInterestId == 5 ? 'selected' : ''}>기타</option>
                </select>
            </div>

            <div class="form-group">
                <label>활동 방식</label>
                <div class="activity-type">
                    <input type="radio" id="onlineButton" name="groupType1" value="온라인" ${groupDTO.groupType1 == '온라인' ? 'checked' : ''}> 온라인
                    <input type="radio" id="offlineButton" name="groupType1" value="오프라인" ${groupDTO.groupType1 == '오프라인' ? 'checked' : ''}> 오프라인
                </div>
            </div>

            <div class="form-group" id="regionSelect" style="display: ${groupDTO.groupType1 == '오프라인' ? 'block' : 'none'};">
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
                <label>모임 설명 & 이미지 수정</label>
                <div class="description-image-box">
                    <div class="image-box">
                        <label for="groupImage" class="image-placeholder">
                            <img id="preview" src="${groupDTO.groupImage}" alt="이미지 미리보기" style="max-width: 200px; max-height: 200px;">
                            <span class="plus-icon" style="display: none;">+</span>
                            <input type="file" id="groupImage" name="groupRegisterImage" accept="image/*" style="display:none;">
                        </label>
                    </div>
                    <textarea id="groupDetail" name="groupDetail" placeholder="모임 설명을 입력하세요" required>${groupDTO.groupDetail}</textarea>
                </div>
            </div>

            <button type="button" id="addImageButton">이미지 추가</button>

            <div class="form-group">
                <label for="groupMaximum">참가인원(모임장 포함)</label>
                <input type="number" id="groupMaximum" name="groupMaximum" value="${groupDTO.groupMaximum}" min="1" max="300" required>
            </div>

            <!-- 비밀번호 필드 삭제 -->

            <div class="form-group">
                <button type="button" id="saveGroupButton">저장</button>
            </div>
        </form>
    </div>

    <footer>
        <!-- 푸터 내용 -->
    </footer>
</body>
</html>
