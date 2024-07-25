/**
 * 모임 상세페이지 js
 */

var auth = null; // 전역변수(사용자 권한)

$(document).ready(function() {
	
	// 사용자 권한 확인(비회원/회원/모임원/모임장)
	checkUserAuthority();
	
	// 멤버 목록 불러오기
    loadGroupMembers();
	
	// 회원 찜 상태 확인
	checkUserWishlist();

	// 모임 상세페이지에서 각 탭 클릭 시 이벤트 처리
    $(".tapBtn").click(function() {
		loadTabContent($(this).val());
    });
    
    // 모임 상세페이지에서 '찜(♡)' 버튼 클릭 시 이벤트 처리
    $('#groupWishBtn').click(function() {
        switchWishlistBtn();
    });
    
    // 모임 상세페이지에서 groupOptionBtn 버튼 클릭 시 이벤트 처리(모임가입/모임나가기/모임설정)
    $('#groupOptionBtn').click(function() {
        groupOptionProcess($(this).val());
    });
    
}); // ready() end


// 모임 상세페이지에서 각 탭 클릭 시 section 불러오기
function loadTabContent(tab) {

    var urlMap = {
        'info': '/groupdetail/info',
        'event': '/groupevent/event',
        'photo': '/groupphoto/photo',
        'chat': '/groupchat/chat'
    };

    $.ajax({
        url: urlMap[tab],
        method: "POST",
        data: { groupId: groupId},
        success: function(data) {
            $("#groupTapPageSection").html(data);
            
            // 모임설명&가입멤버 탭일 경우, 모임원 목록 다시 로드
            if (tab === 'info') {
                loadGroupMembers();
            }
        },
        error: function() {
            alert("탭 콘텐츠를 불러오는데 실패했습니다.");
        }
    }); // ajax() end
    
} // loadContent() end

// 사용자 권한 확인(비회원/회원/모임원/모임장)
function checkUserAuthority() {
	
	$.ajax({
        url: "/groupdetail/authority",
        method: "POST",
        data: { userId: userId, groupId: groupId },
        success: function(data) {
			auth = data;
			setChatBtn(auth);
            setGroupOptionBtn(auth);
        },
        error: function() {
            alert("사용자 권한을 확인하는데 실패했습니다.");
        }
    }); // ajax() end
	
} // checkUserAuthority() end

// 사용자 권한에 따라 chatBtn(모임 채팅) 버튼 숨기기
function setChatBtn(auth) {
	if(auth === "member" || auth === "leader") { // 비회원 또는 일반회원의 경우 모임채팅 안보임
		$("#chatBtn").show();
	} // if end
} // setChatBtn() end

// groupOptionBtn(가입/나가기/설정) 버튼 속성 설정 함수
function setGroupOptionBtn(auth) {
	// 사용자 권한에 따라 버튼 속성 설정
	if (auth === "nonuser") {
		// 모임 최대인원이 다 찼을때
		if (groupMemberCnt === groupMaximumMemberCnt) {
			$("#groupOptionBtn").val("interrupted");
			$("#groupOptionBtn").html("가입 불가");
		} else { // 모임 자리 남았을때
			$("#groupOptionBtn").val("signup");
			$("#groupOptionBtn").html("모임 가입");
		}
	} else if (auth === "user") {
		// 모임 최대인원이 다 찼을때
		if (groupMemberCnt === groupMaximumMemberCnt) {
			$("#groupOptionBtn").val("interrupted");
			$("#groupOptionBtn").html("가입 불가");
		} else { // 모임 자리 남았을때
			$("#groupOptionBtn").val("join");
			$("#groupOptionBtn").html("모임 가입");
		}
	} else if (auth === "stanby") {
		$("#groupOptionBtn").val("standby");
		$("#groupOptionBtn").html("가입 신청 취소");
	} else if (auth === "member") {
		$("#groupOptionBtn").val("quit");
		$("#groupOptionBtn").html("모임 나가기");
	} else if (auth === "leader") {
		$("#groupOptionBtn").val("set");
		$("#groupOptionBtn").html("모임 설정");
	} else if (auth == "blacklist") {
		$("#groupOptionBtn").val("");
		$("#groupOptionBtn").html("가입 불가");
	} // if end

} // setGroupOptionBtn() end

// groupOptionBtn 클릭 시 권한 별 기능
function groupOptionProcess(btnValue) {
	if(btnValue === "interrupted") {
		alert("최대 가입 인원이 초과되어 가입이 불가합니다.");
	} else if(btnValue === "signup") {
		alert("로그인 후 이용해주세요.");
		/* 로그인 페이지로 이동 */
	} else if (btnValue === "join") {
		groupJoinProcessByType();
    } else if(btnValue === "standby") {
		var userConfirm = confirm("가입 신청을 취소하시겠어요?");
		if(userConfirm) {
			openGroupQuitPopup(); // 대기 취소(모임 나가기 팝업창 열림)
		}
	} else if(btnValue === "quit") {
		openGroupQuitPopup();
    } else if(btnValue === "set") {
		openGroupSettingPage();
	} // if end
} // groupOptionProcess() end

// 모임 가입 선착순/승인제 진행 함수
function groupJoinProcessByType() {
	if(groupSignUpType === "선착순") {
		submitGroupJoin("선착순"); // 바로 가입 신청 함수 실행(groupJoin.js 파일에 있는 함수)
	} else if(groupSignUpType === "승인제") {
		openGroupJoinPopup(); // 가입질문 작성하는 팝업창 열기		
	} // if end
} // groupJoinProcessByType() end

// 모임 가입 팝업창 열기 함수
function openGroupJoinPopup() {
    var popupWidth = 600;
    var popupHeight = 600;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

    window.open('/groupdetail/groupjoin?userId=' + userId + '&groupId=' + groupId , 'groupJoinPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);
} // openGroupJoinPopup() end

// 모임 나가기 팝업창 열기 함수
function openGroupQuitPopup() {
    var popupWidth = 600;
    var popupHeight = 600;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

    window.open('/groupdetail/groupquit?userId=' + userId + '&groupId=' + groupId, 'groupQuitPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);
} // openGroupQuitPopup() end

// 모임 설정 페이지 열기 함수
function openGroupSettingPage() {
	// 새 탭으로 모임 설정 페이지 열기
	window.open('/groupset', '_blank');
}

// 모임원 목록 불러오는 함수
function loadGroupMembers() {
    $.ajax({
        url: '/groupdetail/members',
        method: 'GET',
        data: { groupId: groupId },
        success: function(members) {
			$('#memberListDiv').empty(); // 기존 내용을 지움
			
            if (!members || members.length === 0) {
                $('#groupMembersDiv').addClass('no-members'); // 멤버가 없을 경우 클래스 추가
                $('#memberListDiv').html("<div class='memberItemDiv'>가입한 모임원이 아직 없습니다.</div>");
            } else {
				$('#memberListDiv').addClass('is-members'); // 멤버가 있을 경우 클래스 추가
				
				 // 처음에 보여줄 3명의 멤버와 그 외의 숨겨진 멤버 설정
                let visibleMembers = members.slice(0, 6); // 처음에 보여줄 모임원 3명
                let hiddenMembers = members.slice(6); // 숨겨진 모임원

				// 처음에 보여줄 멤버들을 추가
                visibleMembers.forEach(member => {
                    let memberDiv = `
                        <div class="memberItemDiv">
                            <div id="memberImageDiv"><img src="/upload/${member.profileImage}" alt="${member.userNickname}" class="memberProfileImage" /></div>
                            <div class="memberNickname" id="memberNicknameDiv">${member.userNickname}</div>
                        </div>`;
                    $('#memberListDiv').append(memberDiv);
                });

				// 숨겨진 멤버가 있는 경우 펼치기/접기 버튼 설정
                if (hiddenMembers.length > 0) {
                    $('#toggleMembersBtn').show().text("펼치기");
                    let isHidden = true;

					// 버튼 클릭 이벤트 설정
                    $('#toggleMembersBtn').off('click').on('click', function() {
                        if (isHidden) {
							// 숨겨진 멤버를 추가
                            hiddenMembers.forEach(member => {
                                let memberDiv = `
                                    <div class="memberItemDiv hiddenMember">
                                        <div id="memberImageDiv"><img src="/upload/${member.profileImage}" alt="${member.userNickname}" class="memberProfileImage" /></div>
                          	  			<div class="memberNickname" id="memberNicknameDiv">${member.userNickname}</div>
                                    </div>`;
                                $('#memberListDiv').append(memberDiv);
                            });
                            $(this).text("접기"); // 버튼 텍스트 변경
                        } else {
							// 숨겨진 멤버를 제거
                            $('.hiddenMember').remove();
                            $(this).text("펼치기"); // 버튼 텍스트 변경
                        }
                        isHidden = !isHidden; // 상태 변경
                    });
                } else {
                    $('#toggleMembersBtn').hide(); // 숨겨진 멤버가 없으면 버튼 숨기기
                }
            }
        },
        error: function() {
            alert("멤버 목록을 불러오는데 실패했습니다.");
        }
    });
}

// 모임 상세페이지에 회원의 해당 모임 찜 여부 보이기
function checkUserWishlist() {
	
	// 로그인 상태 판별
	if(auth === "nonuser") { // 비회원
		setWishlistBtn(false);
	} else { // 회원
		$.ajax({
	        url: "/wishlist/check",
	        method: "POST",
	        data: { userId: userId, groupId: groupId},
	        success: function(data) {
	            if(data == true) { // 회원이 모임을 찜해놓은 상태
	            	setWishlistBtn(true);					
	            } else { // 찜 안된 상태
	            	setWishlistBtn(false);
				}
	        },
	        error: function() {
	            alert("회원의 찜 목록을 확인하는데 실패했습니다.");
	        }
	    }); // ajax() end
	} // login status check if end
    
} // checkUserWishlist() end

// 모임 상세페이지에서 모임 찜 버튼 클릭 시
function switchWishlistBtn() {
	
	// 로그인 상태 판별
	if(auth === "nonuser") { // 비회원
		alert("로그인 후 이용해주세요.");
	} else { // 회원
		if($("#groupWishBtn").val() == "on") { // 찜해놓은 상태
			// 찜 삭제
			$.ajax({
		        url: "/wishlist/delete",
		        method: "POST",
		        data: { userId: userId, groupId: groupId},
		        success: function(data) {
					if(data == 1) {
						setWishlistBtn(false);	
					}
		        },
		        error: function() {
		            alert("모임을 찜 목록에서 삭제하는데 실패했습니다.");
		        }
		    }); // ajax() end
		} else { // 찜 안된 상태
			// 찜 추가
			$.ajax({
		        url: "/wishlist/add",
		        method: "POST",
		        data: { userId: userId, groupId: groupId},
		        success: function(data) {
					if(data == 1) {
						setWishlistBtn(true);	
					}
		        },
		        error: function() {
		            alert("모임을 찜 목록에 추가하는데 실패했습니다.");
		        }
		    }); // ajax() end
		} // group wish status check if end
	} // login status check if end
	
}

// 모임 찜 버튼 상태 설정 함수
function setWishlistBtn(status) {
    if (status) {
        $("#groupWishBtn").val("on");    
        $("#groupWishBtn").html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>');
    } else {
        $("#groupWishBtn").val("off");
        $("#groupWishBtn").html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>');
    }
}