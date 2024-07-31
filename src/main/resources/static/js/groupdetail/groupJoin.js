/**
 * 모임 가입 모달창 js
 */

// 모임 가입 선착순/승인제 진행 함수
function groupJoinProcessByType() {
	if(groupSignUpType === "선착순") {
		submitGroupJoin("선착순"); // 바로 가입 신청 함수 실행
	} else if(groupSignUpType === "승인제") {
		openGroupJoinModal(); // 가입질문 작성하는 모달창 열기
	} // if end
} // groupJoinProcessByType() end

// 모임 가입 신청 과정
function submitGroupJoin(groupSignUpType, signUpAnswerTxt) {
	
	$.ajax({
        url: "/groupdetail/groupjoin",
        method: "POST",
        data: { 
			userId: userId,
        	groupId: groupId, 
        	groupSignUpType: groupSignUpType,
        	signUpAnswerTxt: signUpAnswerTxt
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
				            location.reload(); // 현재 창 새로고침
				        }
				    });
				}
			}
        },
        error: function() {
            alert("모임 가입 신청서 저장에 실패했습니다.");
        }
    }); // ajax() end
	
} // submitGroupJoin() end

// 모임 가입 신청 모달창 보여주는 함수
function openGroupJoinModal() {
	Swal.fire({
	    html: `
	    	<h4>모임장의 질문에 답변을 작성해 주세요.</h4>
			<div id="questionDiv">
	        	<div id="leaderInfoDiv">
	            	<div id="leaderImgDiv">
	                	<img src="/upload/${leaderProfileImg}" alt="${leaderName}">
	                </div>
	                <div id="leaderNameDiv">
	                	${leaderName}
	                </div>
				</div>
	            <div id="signUpQuestionDiv">
	                    ${groupSignUpQuestion}
	            </div>
	        </div>    	
	    	<textarea id="signUpAnswerTxt" placeholder="5글자 이상 답변을 작성해주세요."></textarea>
	    	<p>작성하신 답변은 모임장에게만 공개돼요.</p>
	    `,
	    imageUrl: 'https://img.icons8.com/?size=100&id=ziUp6TDCK8We&format=png&color=e15c31',
	    focusConfirm: true,
	    confirmButtonText: '가입 신청',
	    showCancelButton: true,
	    cancelButtonText: '신청 취소',
	    customClass: {
            popup: 'groupJoin-wide-modal'
        },
	    preConfirm: () => {
			// signUpAnswerTxt 길이 체크
	        const answerTxt = document.getElementById('signUpAnswerTxt').value;
	
	        if (answerTxt.length < 5) { // 5글자 미만 입력 시
	            Swal.showValidationMessage('5글자 이상 입력해주세요.');
	            return false;
	        } else { // 5글자 이상 입력시
				return answerTxt;
			}
	    }
	}).then((result) => {
	    if (result.isConfirmed) {
	        const answer = result.value;
	        
	        // 모임 가입 신청 과정 함수 호출
	        submitGroupJoin("승인제", answer);
	    }
	});
} // openGroupJoinModal();