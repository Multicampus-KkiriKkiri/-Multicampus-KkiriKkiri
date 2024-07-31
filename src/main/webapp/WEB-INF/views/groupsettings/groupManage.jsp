<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>모임 관리</title>
   
    <!-- 커스텀 CSS -->
    <link rel="stylesheet" href="<c:url value='/css/groupsettings/groupManage.css'/>">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- jQuery -->
    <script src="<c:url value='jquery-3.7.1.min.js'/>"></script>
    <!-- Popper.js 및 부트스트랩 JS -->
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- 커스텀 JS -->
    <script src="<c:url value='/js/groupsettings/groupManage.js'/>"></script>
</head>
<body>
    <header>
        <!-- 헤더 내용 -->
    </header>

    <div class="container">
        <h2>모임 관리</h2>

        <!-- 모임 관리 폼 -->
        <form id="groupForm" action="<c:url value='/settings/updateGroup'/>" method="post" enctype="multipart/form-data">
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
                    <input type="radio" id="onlineButton" name="groupType" value="온라인" ${groupDTO.groupType == '온라인' ? 'checked' : ''}> 온라인
                    <input type="radio" id="offlineButton" name="groupType" value="오프라인" ${groupDTO.groupType == '오프라인' ? 'checked' : ''}> 오프라인
                </div>
            </div>

            <div class="form-group" id="regionSelect" style="display: ${groupDTO.groupType == '오프라인' ? 'block' : 'none'};">
                <label for="groupRegionId">모임 지역 선택</label>
                <div class="region-container">
                    <select id="groupRegionId" name="groupRegionId" data-initial-region-id="${groupDTO.groupRegionId}">
                        <!-- 지역 정보가 여기에 추가됨 -->
                    </select>
                </div>
                <div class="districts-container">
                    <select id="groupDistrictId" name="groupDistrictId" data-initial-district-id="${groupDTO.groupDistrictId}">
                        <!-- 구 정보가 여기에 추가됨 -->
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>모임 설명 & 이미지 수정</label>
                <div class="description-image-box">
                    <div class="image-box">
                        <label for="groupImage" class="image-placeholder">
                            <img id="preview" src="/upload/groupregister/${groupDTO.groupImage}" alt="이미지 미리보기" style="max-width: 200px; max-height: 200px;">
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

            <div class="form-group">
                <label>신청 방식</label>
                <div class="application-type">
                    <input type="radio" class="approval-type" data-value="선착순" name="groupSignUpType" value="선착순" ${groupDTO.groupSignUpType == '선착순' ? 'checked' : ''}>선착순
                    <input type="radio" class="approval-type" data-value="승인제" name="groupSignUpType" value="승인제" ${groupDTO.groupSignUpType == '승인제' ? 'checked' : ''}>승인제
                </div>
                <div class="application-description">
                    <div class="first-come-first-served ${groupDTO.groupSignUpType == '선착순' ? 'active' : ''}">
                        <p>멤버들의 신청과 동시에 참여가 완료돼요. 누구나 참여할 수 있어서 신청률이 높아요.</p>
                    </div>
                    <div class="approval-system ${groupDTO.groupSignUpType == '승인제' ? 'active' : ''}">
                        <p>호스트가 직접 멤버를 수락하거나 거절할 수 있어요. 질문을 통해 취향이 통하는 사람들과 만날 수 있어요.</p>
                        <div class="form-group">
                            <label for="groupSignUpQuestion">가입시 회원에게 물어볼 질문</label>
                            <input type="text" id="groupSignUpQuestion" name="groupSignUpQuestion" value="${groupDTO.groupSignUpQuestion}" style="width: 100%; height: 50px;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="button" id="deleteGroupButton" style="float: left;">모임 삭제</button>
                <button type="button" id="saveGroupButton" style="float: right;">수정 저장</button>
            </div>
        </form>
    </div>

    <footer>
        <!-- 푸터 내용 -->
    </footer>
</body>
</html>
