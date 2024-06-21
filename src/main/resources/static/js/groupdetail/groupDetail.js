/**
 * 모임 상세페이지 js
 */

$(document).ready(function() {

	// 사용자 권한 확인(비회원/회원/모임원/모임장)
	checkUserAuthority(); 
	// 회원 찜 상태 확인
	checkUserWishlist();

	// 모임 상세페이지에서 각 탭 클릭 시 이벤트 처리
    $(".tapBtn").click(function() {
        loadContent($(this).val());
    });
    
    // 모임 상세페이지에서 '찜(♡)' 버튼 클릭 시 이벤트 처리
    $('#groupWishBtn').click(function() {
        switchWishlistBtn();
    });
    
    // 모임 상세페이지에서 groupOptionBtn 버튼 클릭 시 이벤트 처리
    $('#groupOptionBtn').click(function() {
        groupOptionProcess($(this).val());
    });
    
}); // ready() end


// 모임 상세페이지에서 각 탭 클릭 시 section 불러오기
function loadContent(tab) {

    var urlMap = {
        'info': '/groupdetail/info',
        'event': '/groupdetail/event',
        'photo': '/groupdetail/photo',
        'chat': '/groupdetail/chat'
    };

    $.ajax({
        url: urlMap[tab],
        method: "POST",
        data: { groupId: groupId},
        success: function(data) {
            $("#tapPageSection").html(data);
        },
        error: function() {
            alert("탭 콘텐츠를 불러오는데 실패했습니다.");
        }
    }); // ajax() end
    
} // loadContent() end

// 모임 상세페이지에 회원의 해당 모임 찜 여부 보이기
function checkUserWishlist() {
	
	// 로그인 상태 판별
	if(userId == 0) { // 비회원
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
	if(userId == 0) { // 비회원
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

// 사용자 권한 확인(비회원/회원/모임원/모임장)
function checkUserAuthority() {
	
	$.ajax({
        url: "/groupdetail/authority",
        method: "POST",
        data: { userId: userId, groupId: groupId },
        success: function(auth) {
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
	}
}

// 사용자 권한에 따라 groupOptionBtn(가입/나가기/설정) 버튼 속성 설정 함수
function setGroupOptionBtn(auth) {
    if(auth === "nonuser") {
		$("#groupOptionBtn").val("signup");
		$("#groupOptionBtn").html("모임 가입");
	} else if (auth === "user") {
        $("#groupOptionBtn").val("join");
        $("#groupOptionBtn").html("모임 가입"); 
    } else if(auth === "member") {
        $("#groupOptionBtn").val("quit");
        $("#groupOptionBtn").html("모임 나가기");
    } else if(auth === "leader") {
        $("#groupOptionBtn").val("set");
        $("#groupOptionBtn").html("모임 설정");	
	}
}

// groupOptionBtn 클릭 시 사용자별 기능
function groupOptionProcess(value) {
	if(value === "signup") {
		alert("로그인 후 이용해주세요.");
		/* 로그인 페이지로 이동 */
	} else if (value === "join") {
		openGroupJoinPopup(userId, groupId);
    } else if(value === "quit") {
		openGroupQuitPopup(userId, groupId);
    } else if(value === "set") {
			
	}
}

// 모임 가입 팝업창 열기 함수
function openGroupJoinPopup(userId, groupId) {
    var popupWidth = 600;
    var popupHeight = 600;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

    window.open('/groupdetail/groupjoin?userId=' + userId + '&groupId=' + groupId, 'groupJoinPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);
}

// 모임 나가기 팝업창 열기 함수
function openGroupQuitPopup(userId, groupId) {
    var popupWidth = 600;
    var popupHeight = 600;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

    window.open('/groupdetail/groupquit?userId=' + userId + '&groupId=' + groupId, 'groupJoinPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left);
}