/**
 * 일정 참여 신청 모달창 js
 */

// 일정 참여 신청 모달창 보여주는 함수
function openEventAttendModal(eventId) {
	
	Swal.fire({
	    html: `
	    	<h3>즐거운 모임이 될 수 있도록 꼭 확인해주세요!</h3>
			<div id="eventAttendGuideDiv">
				<ul>
					<li>모임 시작 전 부득이하게 참여가 어려워진 경우, 반드시 모임장에게 미리 알려주시기 바랍니다.</li>
					<li>무단으로 불참하거나, 함께하는 모임원들에게 피해를 주는 경우 모임 이용에 대하여 제재를 받을 수 있습니다.</li>
				</ul>
			</div>
			<label for="agree" class="swal2-checkbox-label">
	            <input type="checkbox" id="agree"> 일정 참여 규칙을 모두 확인했습니다.
	        </label>
	    `,
	    icon: 'warning',
	    showCancelButton: true,
	    confirmButtonText: '일정 신청',
	    cancelButtonText: '신청 취소',
	    customClass: {
            popup: 'eventAttend-wide-modal',
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
	        submitAttendApplyToEvent(eventId);
	    }
	}); // Swal.fire() end
	
} // openEventAttendModal() end

// 일정 참여 신청하는 함수
function submitAttendApplyToEvent(eventId) {
	
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
						loadTabContent("event"); // tabSection 새로고침
					}
				});
			}
        },
        error: function() {
            alert("일정 참여 신청에 실패했습니다.");
        }
    }); // ajax() end
    
} // submitAttendApplyToEvent() end

