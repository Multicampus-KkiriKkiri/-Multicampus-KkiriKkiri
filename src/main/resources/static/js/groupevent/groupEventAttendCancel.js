/**
 * 일정 참여 취소 모달창 js
 */

// 일정 참여 신청 취소하는 모달창 보여주는 함수
function openEventAttendCancleModal(eventId) {
	
	Swal.fire({
	    html: `
	    	<h3>일정 참여 취소 전 꼭 확인해주세요!</h3>
			<div id="eventAttendCancelGuideDiv">
				<ul>
					<li>모임 시작 전 부득이하게 참여가 어려워진 경우, 반드시 모임장에게 미리 알려주시기 바랍니다.</li>
					<li>무단으로 불참하거나, 일정 진행일에 임박하여 취소하는 경우 모임 이용에 대하여 제재를 받을 수 있습니다.</li>
				</ul>
			</div>
			<label for="agree" class="swal2-checkbox-label">
	            <input type="checkbox" id="agree"> 위 안내사항을 모두 확인했습니다.
	        </label>
	    `,
	    icon: 'warning',
	    showCancelButton: true,
	    confirmButtonText: '참여 취소',
	    cancelButtonText: '일정 참여',
	    reverseButtons: true, // confirmButton과 cancelButton의 위치를 반대로 설정
	    customClass: {
            popup: 'groupQuit-wide-modal',
            confirmButton: 'groupQuit-custom-confirm-button',
        	cancelButton: 'groupQuit-custom-cancel-button'
        },
	    preConfirm: () => {
			// 체크박스 확인
			const agree = document.getElementById('agree').checked;
			if(!agree) {
				Swal.showValidationMessage('안내사항을 확인해주세요.');
				return false;
			}
	    }
	}).then((result) => {
	    if (result.isConfirmed) {
	        cancelAttendApplyToEvent(eventId);
	    }
	}); // Swal.fire() end
	
}

// 일정 참여 신청 취소하는 함수
function cancelAttendApplyToEvent(eventId) {
	
	$.ajax({
        url: "/groupevent/eventattendcancel",
        method: "POST",
        data: { 
			userId: userId,
        	eventId: eventId
        },
        success: function(data) {
			if(data == 1) {
				Swal.fire({
			            title: '신청 취소가 완료되었습니다.',
			            text: '',
			            icon: 'success',
			            confirmButtonText: '확인'
			    }).then((result) => {
				        if (result.isConfirmed) {
				            if (result.isConfirmed) {
								loadTabContent("event"); // tabSection 새로고침
							}
				        }
				});
			}
        },
        error: function() {
            alert("일정 참여 취소에 실패했습니다.");
        }
    }); // ajax() end
    
} // cancelAttendApplyToEvent() end

