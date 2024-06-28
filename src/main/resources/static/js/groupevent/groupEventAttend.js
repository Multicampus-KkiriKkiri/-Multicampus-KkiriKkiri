/**
 * 일정 참여 신청 팝업창 js
 */

 $(document).ready(function() {
	
	// '신청 취소' 버튼 눌렀을때 이벤트 처리
    $('#cancelAttendBtn').click(function() {
        cancelEventAttend();
    });
	
	// '참여 신청' 버튼 눌렀을때 이벤트 처리
    $('#eventAttendBtn').click(function() {
        submitAttendApplyToEvent();
    });
    
}); // ready() end

// 일정 참여 신청하는 함수
function submitAttendApplyToEvent() {
	
	$.ajax({
        url: "/groupdetail/eventattend",
        method: "POST",
        data: { 
			userId: userId,
        	groupId: groupId,
        	eventId: eventId
        },
        success: function(data) {
			if(data == 1) {
				alert("일정 참여 신청 완료");
				if (window.opener && !window.opener.closed) {
					window.opener.loadTabContent("event"); // tabSection 새로고침
				}
				window.close(); // 팝업창 닫기
			}
        },
        error: function() {
            alert("일정 참여 신청에 실패했습니다.");
        }
    }); // ajax() end
    
} // submitAttendApplyToEvent() end

// '신청 취소' 버튼 클릭 시 창 닫기
function cancelEventAttend() {
	window.close();
} // cancelEventAttend() end

