<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div>
    <h2>모임 관리</h2>
    <form id="groupManageForm">
        <!-- Group details form fields here -->
        <input type="text" name="groupName" value="${groupDTO.groupName}" />
        <textarea name="groupDetail">${groupDTO.groupDetail}</textarea>
        <!-- Additional fields for group management -->
        <button type="submit">저장</button>
    </form>
    <button id="deleteGroupBtn">모임 삭제</button>
</div>

<script>
    $(document).ready(function() {
        $("#groupManageForm").submit(function(event) {
            event.preventDefault();
            // Form submission logic
        });

        $("#deleteGroupBtn").click(function() {
            if (confirm("모임을 삭제하시겠습니까?")) {
                $.ajax({
                    url: "/groupsettings/deleteGroup",
                    method: "POST",
                    data: { groupId: ${groupDTO.groupId} },
                    success: function() {
                        alert("모임이 삭제되었습니다.");
                        window.location.href = "/mainpage";
                    },
                    error: function() {
                        alert("모임 삭제에 실패했습니다.");
                    }
                });
            }
        });
    });
</script>
