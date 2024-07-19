<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div>
    <h2>멤버 관리</h2>
    <div id="currentMembers">
        <h3>현재 멤버</h3>
        <c:forEach var="member" items="${currentMembers}">
            <div class="memberRow">
                <img src="${member.profileImage}" alt="Profile Image" />
                <p>${member.profileIntro}</p>
                <p>${member.statusDate}</p>
                <p>${member.userNickname}</p>
                <button class="kickMemberBtn" data-user-id="${member.userId}">내보내기</button>
            </div>
        </c:forEach>
    </div>
    <div id="pendingMembers">
        <h3>승인 대기 멤버</h3>
        <c:forEach var="pending" items="${pendingMembers}">
            <div class="pendingRow">
                <img src="${pending.profileImage}" alt="Profile Image" />
                <p>${pending.signUpAnswer}</p>
                <p>${pending.userNickname}</p>
                <button class="approveMemberBtn" data-user-id="${pending.userId}">승인</button>
                <button class="rejectMemberBtn" data-user-id="${pending.userId}">거절</button>
            </div>
        </c:forEach>
    </div>
</div>

<script>
    $(document).ready(function() {
        $(".kickMemberBtn").click(function() {
            var userId = $(this).data("user-id");
            if (confirm("해당 회원을 내보내시겠습니까?")) {
                $.ajax({
                    url: "/groupsettings/kickMember",
                    method: "POST",
                    data: { groupId: ${groupDTO.groupId}, userId: userId },
                    success: function() {
                        alert("회원이 내보내졌습니다.");
                        location.reload();
                    },
                    error: function() {
                        alert("회원 내보내기에 실패했습니다.");
                    }
                });
            }
        });

        $(".approveMemberBtn").click(function() {
            var userId = $(this).data("user-id");
            $.ajax({
                url: "/groupsettings/approveMember",
                method: "POST",
                data: { groupId: ${groupDTO.groupId}, userId: userId },
                success: function() {
                    alert("회원이 승인되었습니다.");
                    location.reload();
                },
                error: function() {
                    alert("회원 승인에 실패했습니다.");
                }
            });
        });

        $(".rejectMemberBtn").click(function() {
            var userId = $(this).data("user-id");
            $.ajax({
                url: "/groupsettings/rejectMember",
                method: "POST",
                data: { groupId: ${groupDTO.groupId}, userId: userId },
                success: function() {
                    alert("회원이 거절되었습니다.");
                    location.reload();
                },
                error: function() {
                    alert("회원 거절에 실패했습니다.");
                }
            });
        });
    });
</script>
