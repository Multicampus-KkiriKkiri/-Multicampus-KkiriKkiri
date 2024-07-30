/**
 * 모임 상세페이지 js
 */

var auth = null; // 전역변수(사용자 권한)

$(document).ready(function() {
	
	adjustFontSize();
	
	// 사용자 권한 확인(비회원/회원/모임원/모임장)
	checkUserAuthority();
	
	// 멤버 목록 불러오기
    loadGroupMembers();
	
	// 회원 찜 상태 확인
	checkUserWishlist();
	
	// 모임 카테고리 확인 후 아이콘 설정
	setGroupCatgoryIcon();
	
	// 모임 온/오프라인 확인 후 아이콘 설정
	setGroupTypeIcon();

	// 모임 상세페이지에서 각 탭 클릭 시 이벤트 처리
    $(".groupDetailTapBtn").click(function() {
		// 각 버튼 클릭된 효과 설정
		setTapBtnColor($(this).val());
		// 각 탭 section 불러오기
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
    
    // 클립보드에 URL 복사 기능 추가
    $('#groupShareBtn').click(function() {
        copyPageUrlToClipboard();
    });
    
}); // ready() end

// 모임 상세페이지에서 모임 카테고리 아이콘 설정
function setGroupCatgoryIcon() {
	if (groupInterestId == '1') {
		$("#groupCategoryIconSpan").html('<i class="fa-solid fa-masks-theater" style="color:#558257;"></i>');
	} else if (groupInterestId == '2') {
		$("#groupCategoryIconSpan").html('<i class="fa-solid fa-person-running" style="color:#e15c31;"></i>');
	} else if (groupInterestId == '3') {
		$("#groupCategoryIconSpan").html('<i class="fa-solid fa-utensils" style="color:#ffdf00;"></i>');
	} else if (groupInterestId == '4') {
		$("#groupCategoryIconSpan").html('<i class="fa-solid fa-building-columns" style="color:#e15c31;"></i>');
	} else if (groupInterestId == '5') {
		$("#groupCategoryIconSpan").html('<i class="fa-brands fa-sketch" style="color:#558257;"></i>');
	}
} // setGroupCatgoryIcon() end

// 모임 상세페이지에서 모임 온/오프라인 아이콘 설정
function setGroupTypeIcon() {
	if (groupType === '온라인') {
		$("#groupTypeIconSpan").html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>');
	} else if (groupType === '오프라인') {
		$("#groupTypeIconSpan").html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7d7d7d"><path d="m280-80 160-300-320-40 480-460h80L520-580l320 40L360-80h-80Z"/></svg>');
	}
} // setGroupTypeIcon() end

// 탭 버튼 클릭된 효과 설정
function setTapBtnColor(tab) {
	$("#groupTapNavDiv button").each(function() {
        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
        }
    });
	
	$("#" + tab + "TapBtn").addClass('clicked');
} // setTapBtnColor() end

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
            
            // 탭 페이지 로드 시 스크롤 제일 위로 올리기
			window.scrollTo(0, 0);
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
			setchatTapBtn(auth);
            setGroupOptionBtn(auth);
        },
        error: function() {
            alert("사용자 권한을 확인하는데 실패했습니다.");
        }
    }); // ajax() end
	
} // checkUserAuthority() end

// 사용자 권한에 따라 chatTapBtn(모임 채팅) 버튼 숨기기
function setchatTapBtn(auth) {
	if(auth === "member" || auth === "leader") { // 비회원 또는 일반회원의 경우 모임채팅 안보임
		$("#chatTapBtn").show();
	} // if end
} // setchatTapBtn() end

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
		$("#groupOptionBtn").html("신청 취소");
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
		Swal.fire({
            title: "최대 가입 인원이 초과되어 가입이 불가합니다.",
            text: '',
            icon: 'error',
            confirmButtonText: '확인'
        });
	} else if(btnValue === "signup") {
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
		groupJoinProcessByType();
    } else if(btnValue === "standby") {
		Swal.fire({
	        title: '가입 신청을 취소하시겠어요?',
	        icon: 'warning',
	        showCancelButton: true,
	        confirmButtonText: '예',
	        cancelButtonText: '아니오'
	    }).then((result) => {
	        if (result.isConfirmed) {
	            // '예'를 클릭했을 때 실행할 코드
	            openGroupQuitPopup(); // 대기 취소(모임 나가기 팝업창 열림)
	        } else if (result.dismiss === Swal.DismissReason.cancel) {
	            // '아니오'를 클릭 시 바로 종료
	        }
	    });
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
    var popupWidth = 650;
    var popupHeight = 650;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

    window.open('/groupdetail/groupjoin?userId=' + userId + '&groupId=' + groupId , 'groupJoinPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);
} // openGroupJoinPopup() end

// 모임 나가기 팝업창 열기 함수
function openGroupQuitPopup() {
    var popupWidth = 600;
    var popupHeight = 550;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

    window.open('/groupdetail/groupquit?userId=' + userId + '&groupId=' + groupId, 'groupQuitPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);
} // openGroupQuitPopup() end

// 모임 설정 페이지 열기 함수
function openGroupSettingPage() {
	// 새 탭으로 모임 설정 페이지 열기
	window.open('/settings/main?groupId=' + groupId, '_blank');
	//groupset--> settings/main
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
					// 버튼 '펼치기'로 설정
                    $('#toggleMembersBtn').show().html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>');
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
                            $(this).html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>'); // 버튼 텍스트 변경
                        } else {
							// 숨겨진 멤버를 제거
                            $('.hiddenMember').remove();
                            // 버튼 '펼치기'로 변경
		                    $(this).html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>');
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
	
} // switchWishlistBtn() end

// 모임 찜 버튼 상태 설정 함수
function setWishlistBtn(status) {
    if (status) {
        $("#groupWishBtn").val("on");    
        $("#groupWishBtn").html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>');
    } else {
        $("#groupWishBtn").val("off");
    	$("#groupWishBtn").html('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3B5F3E"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>');
    }
} // setWishlistBtn() end

// 클립보드에 URL 복사 함수
function copyPageUrlToClipboard() {
    var url = window.location.href;
    
	navigator.clipboard.writeText(url).then(function() {
		Swal.fire({
			title: '성공!',
			text: '모임 URL이 클립보드에 복사되었습니다.',
			icon: 'success',
			confirmButtonText: '확인'
		});
	}, function(err) {
		Swal.fire({
			title: '오류!',
			text: '모임 URL을 클립보드에 복사하는데 실패했습니다.',
			icon: 'error',
			confirmButtonText: '확인'
		});
	});
} // copyPageUrlToClipboard() end

// 모임 이름 길어지는 경우 글자 크기 조정하는 함수
function adjustFontSize() {
	const groupNameDiv = document.getElementById('groupNameDiv');
	const maxHeight = 150; // 고정된 세로 크기
	let fontSize = 50; // 초기 글자 크기
	groupNameDiv.style.fontSize = `${fontSize}px`;

	// 글자 크기를 줄이면서 내용이 div 내에 모두 표시될 때까지 반복
	while (groupNameDiv.scrollHeight > maxHeight && fontSize > 10) {
		fontSize -= 5;
		groupNameDiv.style.fontSize = `${fontSize}px`;
	}
}