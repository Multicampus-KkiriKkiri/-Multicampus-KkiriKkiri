<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!--  ㅁㄴㅇㅇㅇㄹ-->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Group Settings Main</title>
   
    <!-- 커스텀 CSS -->
    <link rel="stylesheet" href="<c:url value='/css/groupsettings/groupSettingsMain.css'/>">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
    <script src="<c:url value='jquery-3.7.1.min.js'/>"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
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
