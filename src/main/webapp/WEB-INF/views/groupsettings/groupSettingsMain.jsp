<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <script src="/jquery-3.7.1.min.js"></script>
    <script src="/js/groupSettings/groupSettingsMain.js"></script>
    <script>
        var groupId = ${groupId};
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
        <input type="hidden" id="groupId" value="${groupId}">
        <input type="hidden" id="userId" value="${userId}">
        <section id="groupNavSection">
            <nav class="groupDetailNav" id="groupTapNav">
                <button class="tapBtn" value="group">모임 관리</button>
                <button class="tapBtn" value="member">멤버 관리</button>
                <button class="tapBtn" value="event">일정 관리</button>
                <button class="tapBtn" value="photo">사진 관리</button>
            </nav>
        </section>
        <section id="groupSettingTapPageSection">
            <%-- 기본 탭 콘텐츠 로드 --%>
            <jsp:include page="groupManage.jsp"/>
        </section>
    </main>

    <footer>
        <jsp:include page="../mainpage/mainFooter.jsp" />
    </footer>
</body>
</html>
