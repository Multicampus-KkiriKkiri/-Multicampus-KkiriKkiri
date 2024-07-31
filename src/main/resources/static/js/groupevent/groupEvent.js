/**
 * 모임 일정 페이지 js
 */

$(document).ready(function() {
	
	// 사용자 권한에 따라 groupEventOptionBtn 버튼 속성 설정
	setEventOptionBtn();
	
	// 일정 별 참여 신청한 모임원 목록 보여주기
	setAttendMemberListByEventID();
	
	// 모임 일정페이지에서 '달력으로 보기' 버튼 눌렀을때 이벤트 처리
    $('#eventCalenderBtn').click(function() {
		// 안내 모달 창 보여주기
        Swal.fire({
            title: '준비중입니다',
            text: '',
            icon: 'info',
            confirmButtonText: '확인'
        });
    });

	// 모임 일정페이지에서 '예정된 일정' 버튼 눌렀을때 이벤트 처리
    $('#upcomingEventBtn').click(function() {
		// 버튼 글자 색 변경 위한 클래스 삭제/추가
		$("#pastEventBtn").removeClass('clicked');
		$(this).addClass('clicked');
		
		// 예정된 일정 목록 보여주기
        showUpcomingEvents();
    });
    
    // 모임 일정페이지에서 '지난 일정' 버튼 눌렀을때 이벤트 처리
    $('#pastEventBtn').click(function() {
		// 버튼 글자 색 변경 위한 클래스 삭제/추가
		$("#upcomingEventBtn").removeClass('clicked');
		$(this).addClass('clicked');
		
		// 지난 일정 목록 보여주기
        showPastEvents();
    });
    
    // 모임 일정페이지에서 '참여 신청' 버튼 눌렀을때 이벤트 처리
    $('.groupEventOptionBtn').click(function() {
        eventOptionProcess(parseInt($(this).data('eventid')), $(this).val());
    });
    
}); // ready() end

// 사용자 권한에 따라 groupEventOptionBtn(참여 신청/참여 취소/일정 설정) 버튼 속성 설정 함수
function setEventOptionBtn() {
	
    if(auth === "nonuser") {
		$(".groupEventOptionBtn").val("signup");
		$(".groupEventOptionBtn").html("참여 신청");
	} else if (auth === "user") {
        $(".groupEventOptionBtn").val("join");
        $(".groupEventOptionBtn").html("참여 신청"); 
    } else if(auth === "member") {
		checkEventSubmitHistoryAndSetOptionBtn();
    } else if(auth === "leader") {
        $(".groupEventOptionBtn").val("set");
        $(".groupEventOptionBtn").html("일정 설정");	
	} // if end
	
	// 일정 최대 참여 인원 수 확인 후 버튼 재설정
	checkEventMaximumMember();
	
} // setGroupOptionBtn() end

// 현재 로그인한 회원의 모임 내 일정 참여 신청 내역 확인 후 eventOptionBtn 버튼 속성 설정하는 함수
function checkEventSubmitHistoryAndSetOptionBtn() {
	
	$.ajax({
        url: '/groupevent/eventattendapplyhistory',
        type: 'POST',
        data: { userId: userId, groupId: groupId },
        success: function(data) {
            $('.groupEventOptionBtn').each(function() {
                var eventId = parseInt($(this).data('eventid'));
                // 서버에서 받아온 데이터에 eventId가 포함되어 있는지 확인
			    if (data.includes(eventId)) { // 해당 일정에 이미 참여 신청을 함
			        $(this).val("cancel");
			        $(this).html("참여 취소");
			    } else { // 해당 일정에 참여 신청 안함
			        $(this).val("attend");
			        $(this).html("참여 신청");
			    }
			});
        },
        error: function() {
            alert("일정 참여 신청 내역을 가져오는 데 실패했습니다.");
        }
    });
	
} // checkEventSubmitHistoryAndSetOptionBtn() end

// 이벤트 최대 참여 인원 수와 현재 참여 인원 수를 가져와서 비교 후 eventOptionBtn 버튼 속성 설정하는 함수
function checkEventMaximumMember() {
	
	$.ajax({
        url: '/groupevent/checkeventmaxmember',
        type: 'POST',
        data: { groupId: groupId },
        success: function(data) {
            $('.groupEventOptionBtn').each(function() {
                var eventId = parseInt($(this).data('eventid'));
                var eventData = data.find(event => event.eventId === eventId);
                
                if (eventData.currentMemberCnt === eventData.maximumMemberCnt) {
                    if (auth !== "leader") { // 모임장이 아닌 경우에만 신청 마감 처리
                        $(this).val("close");
                        $(this).html("신청 마감");
                    }
                }
            });
        },
        error: function() {
            alert("일정 참여 최대인원 수를 가져오는데 실패했습니다.");
        }
    });
	
} // checkEventMaximumMember() end

// 일정 별 참여 신청한 모임원 목록 보여주는 함수
function setAttendMemberListByEventID() {
	$('.groupEventAttendMembersDiv').each(function() {
        var eventId = parseInt($(this).data('eventid'));
        
        // this를 jQuery 객체로 변환하여 $this 변수에 저장
    	var $this = $(this);
    
        $.ajax({
	        url: '/groupevent/eventattendmemberlist',
	        type: 'POST',
	        data: { eventId: eventId, groupId: groupId },
	        success: function(data) {
	            var eventAttendMemberList = '<div class="eventAttendMembersListDiv">';
	            
	            // 각 일정 별 신청 인원이 10명이 안넘으면 목록 전부 보여짐
	            if(data.length < 10) {
					data.forEach(function(member) {
		                eventAttendMemberList += '<div class="eventAttendMemberItemDiv">';
		                eventAttendMemberList += '<img src="/upload/' + member.profileImage + '" alt="' + member.userNickname + '">';
		                eventAttendMemberList += '<p>' + member.userNickname + '</p>';
		                eventAttendMemberList += '</div>';
		            });
				} else { // 신청 인원이 10명 넘으면 '더보기' 만들고 생략
		            var additionalMembers = 0;
					data.forEach(function(member, index) {
	                    if (index < 8) {
	                        eventAttendMemberList += '<div class="eventAttendMemberItemDiv">';
	                        eventAttendMemberList += '<img src="/upload/' + member.profileImage + '" alt="' + member.userNickname + '">';
	                        eventAttendMemberList += '<p>' + member.userNickname + '</p>';
	                        eventAttendMemberList += '</div>';
	                    } else {
	                        additionalMembers++;
	                    }
	                });
	                if (additionalMembers > 0) {
	                    eventAttendMemberList += '<div class="eventAttendMemberItemDiv">';
	                    eventAttendMemberList += '<div class="additionalMembersCntDiv">+' + additionalMembers + '명</div>';
	                    eventAttendMemberList += '</div>';
	                }
				}
	            
	            eventAttendMemberList += '</div>';
	            
	            $this.html(eventAttendMemberList);
	        },
	        error: function() {
	            alert("멤버 목록을 가져오는 데 실패했습니다.");
	        }
	    });
    });
}

// 예정된 일정 보이게 하는 함수
function showUpcomingEvents() {
	$('#upcomingEventsDiv').show();
    $('#pastEventsDiv').hide();
}

// 지난 일정 보이게 하는 함수
function showPastEvents() {
	$('#upcomingEventsDiv').hide();
    $('#pastEventsDiv').show();
}

// groupOptionBtn 클릭 시 권한 별 기능
function eventOptionProcess(eventId, btnValue) {
	if(btnValue === "signup") {
		Swal.fire({
            title: "로그인 후 이용해주세요.",
            text: '',
            icon: 'info',
            confirmButtonText: '확인'
        }).then((result) => {
			if (result.isConfirmed) {
				// 로그인 버튼 자동 클릭되어 로그인 모달창 보임
				document.getElementById('login-button').click();
			}
		});
	} else if (btnValue === "join") {
		Swal.fire({
			title: '',
			html: '모임 가입 후 일정 참여가 가능합니다.<br>모임에 가입하시겠습니까?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: '예',
			cancelButtonText: '아니오'
		}).then((result) => {
			if (result.isConfirmed) {
				if(checkGroupMemberCnt === "가입 가능") {
					groupJoinProcessByType(); // 모임 가입 과정 함수 실행(groupDetail.js 파일 내 함수)					
				} else {
					Swal.fire({
			            title: "최대 가입 인원이 초과되어 가입이 불가합니다.",
			            text: '',
			            icon: 'error',
			            confirmButtonText: '확인'
			        });
				}
			}
		});
    } else if(btnValue === "attend") {
		openEventAttendModal(eventId); // 일정 참여 신청 모달창 열기 함수 호출(groupEventAttend.js 파일 내 함수)
	} else if(btnValue === "cancel") {
		openEventAttendCancleModal(eventId); // 일정 참여 신청 취소 모달창 열기 함수 호출(groupEventAttendCancel.js 파일 내 함수)
	} else if(btnValue === "set") {
		/* 일정 설정 페이지로 이동 */
	} // if end
} // groupOptionProcess() end