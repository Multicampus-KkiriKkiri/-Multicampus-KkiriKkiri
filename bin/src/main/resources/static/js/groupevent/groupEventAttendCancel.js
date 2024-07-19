/**
 * 일정 참여 취소 팝업창 js
 */

 $(document).ready(function() {
	
	// '일정 참여' 버튼 눌렀을때 이벤트 처리
    $('#eventAttendBtn').click(function() {
        eventAttend();
    });
	
	// '참여 취소' 버튼 눌렀을때 이벤트 처리
    $('#eventAttendCancelBtn').click(function() {
        cancelAttendApplyToEvent();
    });
    
}); // ready() end

// 일정 참여 신청 취소하는 함수
function cancelAttendApplyToEvent() {
	
	$.ajax({
        url: "/groupevent/eventattendcancel",
        method: "POST",
        data: { 
			userId: userId,
        	eventId: eventId
        },
        success: function(data) {
			if(data == 1) {
				alert("일정 참여 취소 완료");
				if (window.opener && !window.opener.closed) {
					window.opener.loadTabContent("event"); // tabSection 새로고침
				}
				window.close(); // 팝업창 닫기
			}
        },
        error: function() {
            alert("일정 참여 취소에 실패했습니다.");
        }
    }); // ajax() end
    
} // cancelAttendApplyToEvent() end

// '일정 참여' 버튼 클릭 시 창 닫기
function eventAttend() {
	window.close();
} // eventAttend() end

