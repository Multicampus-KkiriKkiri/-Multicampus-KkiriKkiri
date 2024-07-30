/**
 * 모임 가입 팝업창 js
 */

$(document).ready(function() {

	// 모입 가입 신청 버튼 클릭 시 이벤트 처리
    $("#joinApplyBtn").click(function(e) {
		e.preventDefault(); // 버튼 클릭 시 폼 제출을 막음
		
		// signUpAnswerTxt 길이 체크
        var answerTxt = $("#signUpAnswerTxt").val();
        if (answerTxt.length < 5) { // 5글자 미만 입력 시
	        Swal.fire({
	            title: '5글자 이상 입력해주세요.',
	            text: '',
	            icon: 'info',
	            confirmButtonText: '확인'
	        });
        } else { // 5글자 이상
	        submitGroupJoin("승인제"); // 가입 신청 진행	
		}
    });

}); // ready() end

// 모임 가입 신청 과정
function submitGroupJoin(groupSignUpType) {
	
	$.ajax({
        url: "/groupdetail/groupjoin",
        method: "POST",
        data: { 
			userId: userId,
        	groupId: groupId, 
        	groupSignUpType: groupSignUpType,
        	signUpAnswerTxt: $("#signUpAnswerTxt").val()
        },
        success: function(data) {
			if(data == 1) { // 가입 신청 정보 DB에 정상 저장 시
				if(groupSignUpType === "선착순") { // 선착순
					Swal.fire({
			            title: '모임 가입이 완료되었습니다.',
			            text: '',
			            icon: 'success',
			            confirmButtonText: '확인'
			        }).then((result) => {
				        if (result.isConfirmed) {
				            location.reload(); // 현재 창 새로고침
				        }
				    });
				} else { // 승인제
					Swal.fire({
			            title: '가입 신청이 완료되었습니다.',
			            text: '',
			            icon: 'success',
			            confirmButtonText: '확인'
			        }).then((result) => {
				        if (result.isConfirmed) {
				            window.opener.location.reload(); // 부모 창 새로고침
							window.close(); // 팝업창 닫기
				        }
				    });
				}
			}
        },
        error: function() {
            alert("모임 가입 신청서 저장에 실패했습니다.");
        }
    }); // ajax() end
	
} // submitApply() end