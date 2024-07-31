/**
 * 모임 탈퇴 모달창 js
 */

// 모임 탈퇴 모달창 보여주는 함수
function openGroupQuitModal() {
	
	Swal.fire({
	    html: `
	    	<h3>모임을 나가기 전 꼭 확인해주세요!</h3>
			<div id="groupQuitGuideDiv">
				<ul>
					<li>모임 일정에 참여하고 있는 경우 모임을 나갈 수 없습니다.</li>
					<li>모임 채팅방에서도 나가게되며 다시 입장할 수 없습니다.</li>
					<li>모임 내 회원님의 정보는 모두 삭제됩니다.</li>
				</ul>
			</div>
			<label for="agree" class="swal2-checkbox-label">
	            <input type="checkbox" id="agree"> 위 안내사항을 모두 확인했습니다.
	        </label>
	    `,
	    icon: 'warning',
	    showCancelButton: true,
	    confirmButtonText: '모임 나가기',
	    cancelButtonText: '모임 계속',
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
	        submitGroupQuit();
	    }
	}); // Swal.fire() end
	
} // openGroupQuitModal();

// 모임 탈퇴 과정
function submitGroupQuit() {
	
	// 모임 내 다가올 일정에 참여 신청 내역 있으면 탈퇴 불가
	if(userEventAttendApplyHistory === "일정 신청 내역 있음") {
		Swal.fire({
		    icon: 'error',
			title: '모임 나가기 실패',
			html: '모임 내 예정된 일정에 참여 신청 내역이 있습니다.<br>신청 취소 후 다시 시도해주세요.',
		    confirmButtonText: '확인',
		});
	} else {
		// 모임 탈퇴 진행
		$.ajax({
	        url: "/groupdetail/groupquit",
	        method: "POST",
	        data: { 
				userId: userId,
	        	groupId: groupId
	        },
	        success: function(data) {
				if(data == 1) {
					Swal.fire({
				            title: '모임 나가기가 완료되었습니다.',
				            text: '',
				            icon: 'success',
				            confirmButtonText: '확인'
				        }).then((result) => {
					        if (result.isConfirmed) {
					            location.reload(); // 현재 창 새로고침
					        }
					});
				}
	        },
	        error: function() {
	            alert("모임 나가기에 실패했습니다.");
	        }
	    }); // ajax() end
	} // if end
	
} // submitGroupQuit() end