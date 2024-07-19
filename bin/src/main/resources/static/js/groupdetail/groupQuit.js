/**
 * 모임 탈퇴 팝업창 js
 */

$(document).ready(function() {
	
	// '모임 계속' 버튼 클릭 시 이벤트 처리
	$("#cancelQuitBtn").click(function() {
		cancelGroupQuit();
	}); // cancelQuitBtn onclick end

	// '모임 나가기' 버튼 클릭 시 이벤트 처리
    $("#groupQuitBtn").click(function() {
		// 체크박스 체크 여부 확인
		if($("#checkbox").is(":checked")) { // 체크됨
	        submitGroupQuit();		
		} else { // 체크 안됨
			alert("안내사항을 확인해주세요");
		}
    }); // groupQuitBtn onclick end

}); // ready() end

// 모임 탈퇴 과정
function submitGroupQuit() {
	
	$.ajax({
        url: "/groupdetail/groupquit",
        method: "POST",
        data: { 
			userId: userId,
        	groupId: groupId
        },
        success: function(data) {
			if(data == 1) {
				alert("모임 나가기 완료");
				window.opener.location.reload(); // 부모 창 새로고침
				window.close(); // 팝업창 닫기
			}
        },
        error: function() {
            alert("모임 나가기에 실패했습니다.");
        }
    }); // ajax() end
	
} // submitGroupQuit() end

// 모임 계속 버튼 클릭 시 창닫기
function cancelGroupQuit() {
	window.close();
}