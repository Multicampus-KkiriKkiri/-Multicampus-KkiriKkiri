
 /*
function setApproveMember(groupId, userId) {
    $.ajax({
        type: "POST",
        url: "/settings/group/approveMember",
        data: { groupId: groupId, userId: userId },
        success: function (response) {
            if (response === "success") {
                alert("회원 승인이 완료되었습니다.");
                // 페이지 갱신
            } else {
                alert("회원 승인에 실패했습니다.");
            }
        },
        error: function () {
            alert('서버 오류로 인해 회원 승인에 실패하였습니다.');
        }
    });
}

function setKickMember(groupId, userId) {
    $.ajax({
        type: "POST",
        url: "/groupsettings/group/kickMember",
        data: { groupId: groupId, userId: userId },
        success: function (response) {
            if (response === "success") {
                alert("회원이 추방되었습니다.");
                // 페이지 갱신
            } else {
                alert("회원 추방에 실패했습니다.");
            }
        },
        error: function () {
            alert('서버 오류로 인해 회원 추방에 실패하였습니다.');
        }
    });
}

function setRejectMember(groupId, userId) {
    $.ajax({
        type: "POST",
        url: "/groupsettings/group/rejectMember",
        data: { groupId: groupId, userId: userId },
        success: function (response) {
            if (response === "success") {
                alert("회원 요청이 거부되었습니다.");
                // 페이지 갱신
            } else {
                alert("회원 요청 거부에 실패했습니다.");
            }
        },
        error: function () {
            alert('서버 오류로 인해 회원 요청 거부에 실패하였습니다.');
        }
    });
    
}


*/