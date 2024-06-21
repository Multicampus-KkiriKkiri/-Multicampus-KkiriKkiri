/**
 * 모임 가입 팝업창 js
 */

$(document).ready(function() {

	// 모입 가입 신청 버튼 클릭 시 이벤트 처리
    $("#joinApplyBtn").click(function(e) {
		e.preventDefault(); // 버튼 클릭 시 폼 제출을 막음
        submitJoinApply();
    });

}); // ready() end

// 모임 가입 신청 과정
function submitJoinApply() {
	
	$.ajax({
        url: "/groupdetail/groupjoin",
        method: "POST",
        data: { 
			userId: userId,
        	groupId: groupId, 
        	groupSignUpType: "승인제",
        	signUpAnswerTxt: $("#signUpAnswerTxt").val()
        },
        success: function(data) {
			if(data == 1) {
				alert("가입 신청 완료");
				window.opener.location.reload(); // 부모 창 새로고침
				window.close(); // 팝업창 닫기
			}
        },
        error: function() {
            alert("모임 가입 신청서 저장에 실패했습니다.");
        }
    }); // ajax() end
	
} // submitApply() end