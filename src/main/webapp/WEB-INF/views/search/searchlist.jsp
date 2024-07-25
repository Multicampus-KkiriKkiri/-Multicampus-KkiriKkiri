<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>검색</title>
    <script src="/jquery-3.7.1.min.js"></script>
    <script src="/js/searchlist/searchlist.js"></script>
</head>

<body>
    <header>
        <c:if test="${not empty sessionScope.sessionUserId}">
            <%@ include file="../mainpage/mainHeaderLogin.jsp" %>
        </c:if>
        <c:if test="${empty sessionScope.sessionUserId}">
            <%@ include file="../mainpage/mainHeader.jsp" %>
        </c:if>
    </header>

    <main>
        <div id="searchContainer">
            <ul>
                <li>
                    <input type="radio" name="searchType" value="group" checked onclick="setSearchType('group')"> 모임
                </li>
                <li>
                    <input type="radio" name="searchType" value="event" onclick="setSearchType('event')"> 일정
                </li>
                <li><input type="text" id="searchInput" placeholder="검색창"></li>
                <li><button onclick="search()">검색</button></li>
            </ul>
        </div>

        <div id="filterContainer">
            <ul>
                <li>지역
                    <select id="regions"></select>
                    <select id="districts"></select>
                </li>
                <li>카테고리
                    <select id="interests">
                        <option value="문화예술">문화예술</option>
                        <option value="액티비티">액티비티</option>
                        <option value="푸드/드링크">푸드/드링크</option>
                        <option value="자기계발">자기계발</option>
                        <option value="기타">기타</option>
                    </select>
                </li>
                <li>온/오프라인
                    <select id="onlineOffline">
                        <option value="온라인">온라인</option>
                        <option value="오프라인">오프라인</option>
                    </select>
                </li>
                <li>정렬
                    <select id="sortOrder" onchange="sortResults(this.value)">
                        <option value="new">최신순</option>
                        <option value="old">오래된 순</option>
                    </select>
                </li>
            </ul>
        </div>

        <div id="resultsContainer">
            <!-- AJAX로 로드될 검색 결과 -->
        </div>
    </main>

    <footer>
        <%@ include file="../mainpage/mainFooter.jsp" %>
    </footer>

    <script>
        $(document).ready(function() {
            // 초기 검색 실행
            search();
        });
    </script>

</body>

</html>
