<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Group Settings Main</title>
    <!-- 부트스트랩 CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- 커스텀 CSS -->
    <link rel="stylesheet" href="<c:url value='/css/groupsettings/groupSettingsMain.css'/>">
    <!-- jQuery 및 Popper.js -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <!-- 부트스트랩 JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- 커스텀 JS -->
    <script src="<c:url value='/js/groupsettings/groupSettingsMain.js' />"></script>
    <script>
        var groupId = ${groupDTO.groupId};  // 서버에서 전달된 groupId
        var userId = ${userId};
    </script>
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

    <main id="groupSettingsMain">
        <input type="hidden" id="groupId" value="${groupDTO.groupId}">
        <input type="hidden" id="userId" value="${userId}">
        <section id="groupNavSection">
            <nav class="groupDetailNav" id="groupTapNav">
                <button class="tapBtn" data-tab="group">모임 관리</button>
                <button class="tapBtn" data-tab="member">멤버 관리</button>
                <button class="tapBtn" data-tab="event">일정 관리</button>
                <button class="tapBtn" data-tab="photo">사진 관리</button>
            </nav>
        </section>
        <section id="groupSettingTapPageSection">
            <!-- 기본 탭 콘텐츠 로드 -->
            <jsp:include page="groupManage.jsp"/>
        </section>
    </main>    

    <footer>
        <jsp:include page="../mainpage/mainFooter.jsp" />
    </footer>
</body>
</html>
