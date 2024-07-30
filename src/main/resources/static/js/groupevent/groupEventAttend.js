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
		// 체크박스 체크 여부 확인
		if($("#checkbox").is(":checked")) { // 체크됨
	        submitAttendApplyToEvent();		
		} else { // 체크 안됨
			Swal.fire({
	            title: '안내사항을 확인해주세요.',
	            text: '',
	            icon: 'warning',
            	confirmButtonText: '확인'
        	});
		}
    });
    
}); // ready() end

// 일정 참여 신청하는 함수
function submitAttendApplyToEvent() {
	
	$.ajax({
        url: "/groupevent/eventattend",
        method: "POST",
        data: { 
			userId: userId,
        	groupId: groupId,
        	eventId: eventId
        },
        success: function(data) {
			if(data == 1) {
				Swal.fire({
			            title: '참여 신청이 완료되었습니다.',
			            text: '',
			            icon: 'success',
			            confirmButtonText: '확인'
			    }).then((result) => {
				        if (result.isConfirmed) {
				            if (window.opener && !window.opener.closed) {
								window.opener.loadTabContent("event"); // tabSection 새로고침
							}
							window.close(); // 팝업창 닫기
				        } else if (result.dismiss === Swal.DismissReason.cancel) {
				            // '아니오'를 클릭 시 바로 종료
				        }
				});
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

