<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>모임 관리</title>
</head>
<body>
    <h2>모임 관리</h2>
    <!-- Your form and inputs as per the image layout -->
    <form>
        <label>모임 이름: <input type="text" name="groupName"></label>
        <button type="button">모임 이름 수정</button><br>
        <label>모임 위치: <input type="text" name="groupLocation"></label>
        <button type="button">모임 위치 수정</button><br>
        <label>모임 설명&사진:</label>
        <div>
            <input type="file" name="groupImage">
            <textarea name="groupDescription"></textarea>
        </div>
        <label>모임 카테고리: <input type="text" name="groupCategory"></label><br>
        <label>온/오프라인: <input type="text" name="groupType"></label><br>
        <label>가입시 질문: <input type="text" name="groupQuestion"></label><br>
        <button type="button">모임 수정완료 버튼</button>
        <button type="button">모임 삭제 버튼</button>
    </form>
</body>
</html>