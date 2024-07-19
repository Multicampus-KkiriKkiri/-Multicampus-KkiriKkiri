<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>모임 설정 페이지</title>
    <script src="/jquery-3.7.1.min.js"></script>
    <script>
        $(document).ready(function() {
            // Function to load the corresponding page
            function loadPage(page) {
                $("#contentSection").load(page);
            }

            // Event listeners for tabs
            $("#groupManageTab").click(function() {
                loadPage("/groupManage.jsp");
            });

            $("#memberManageTab").click(function() {
                loadPage("/memberManage.jsp");
            });

            $("#scheduleManageTab").click(function() {
                loadPage("/scheduleManage.jsp");
            });

            $("#photoManageTab").click(function() {
                loadPage("/photoManage.jsp");
            });

            // Load default tab
            loadPage("/groupManage.jsp");
        });
    </script>
    <link rel="stylesheet" type="text/css" href="/css/groupDetail.css">
</head>
<body>
    <!-- Header -->
    <header>
        <button>로그인</button>
        <input type="text" placeholder="키워드 입력">
        <input type="text" placeholder="위치 입력">
        <button>검색버튼</button>
        <button>알림</button>
        <button>채팅</button>
        <button>내 프로필 사진</button>
    </header>

    <!-- Tabs -->
    <nav>
        <button id="groupManageTab">모임 관리</button>
        <button id="memberManageTab">멤버 관리</button>
        <button id="scheduleManageTab">일정 관리</button>
        <button id="photoManageTab">사진 관리</button>
    </nav>

    <!-- Content Section -->
    <section id="contentSection">
        <!-- Content will be loaded here -->
    </section>

    <!-- Footer -->
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
