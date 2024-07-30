/**
 * 모임 사진 페이지 js
 */

 $(document).ready(function() {
	
	// 페이지 로드 시 스크롤 제일 위로 올리기
	window.scrollTo(0, 0);
	
	// 모임 사진 게시물 불러오기
	loadPhotoBoardList();
	
	// 모임 사진페이지에서 게시글 이미지 클릭 시 이벤트 처리
	// 이벤트 위임을 사용하여 동적으로 생성된 .postImageA 요소에 클릭 이벤트 핸들러를 설정
    $(document).on("click", ".postImageA", function(e) {
		e.preventDefault(); // 기본 동작 방지
		openPostDetailPopup($(this).data("photoboardid"));
    });
	
	// 모임 사진페이지에서 페이지 번호 클릭 시 이벤트 처리
    $(".pageNumBtn").click(function() {
		// 선택된 번호의 사진 페이지 로딩
		loadPagingContent($(this).val());
    });
    
    // 모임 사진페이지에서 '이전' 버튼 클릭 시 이벤트 처리
    $("#previousBtn").click(function() {
		if(pageNum - 1 >= 1) {
			// 이전 페이지 번호 사진 페이지 로딩
			loadPagingContent(pageNum - 1);
		}
    });
    
    // 모임 사진페이지에서 '다음' 버튼 클릭 시 이벤트 처리
    $("#nextBtn").click(function() {
		if(pageNum + 1 <= totalPage)
		// 다음 페이지 번호 사진 페이지 로딩
		loadPagingContent(pageNum + 1);
    });
    
}); // ready() end

// 모임 사진 게시물 불러오기 함수
function loadPhotoBoardList() {
	
	$.ajax({
        url: "/groupphoto/photoboardlist",
        method: "POST",
        data: { 
        	groupId: groupId,
        	pageNum: pageNum
        },
        success: function(boardList) {
			
			if(boardList.length === 0) {
				// groupPhotoBoardDiv에 내용을 추가
			    $("#groupPhotoBoardDiv").html('<div>업로드된 모임 사진이 없습니다.</div>');
			} else {
				// groupPhotoBoardDiv에 내용을 추가하는 코드
			    var groupPhotoBoardDivContent = '<div class="row photoBoardPostRowDiv">';
			
			    // boardList가 존재하는 경우 반복문을 통해 내용을 추가
			    if (boardList && Array.isArray(boardList)) {
			        boardList.forEach(function(dto, index) {
			            // 3개의 항목마다 새로운 행 추가
			            if (index % 3 === 0 && index !== 0) {
			                groupPhotoBoardDivContent += '</div><div class="row photoBoardPostRowDiv">';
			            }
			            
			            // 날짜 형식을 변환
			            var formattedDateTime = formatDateTime(dto.uploadDateTime);
			
			            groupPhotoBoardDivContent += `
			                <div class="photoBoardPostDiv col-md-4 align-items-center" style="width: 300px; padding: 10px;">
								<a class="postImageA d-flex flex-column align-items-center" href="" data-photoBoardId="${dto.photoBoardId}">
									<img class="postImg mb-2" src="/upload/groupphoto/${dto.photoFileName}" alt="${dto.postTitle}">
			                    	<p class="postTilteP text-center mb-2">${dto.postTitle}</p>
			                        <p class="postUploadDateTimeP text-center mb-2">${formattedDateTime}</p>
			                    </a>
			                </div>`;
			        });
			    }
			
			    // 마지막 행 닫기
			    groupPhotoBoardDivContent += '</div>';
			
			    // groupPhotoBoardDiv에 내용을 추가
			    $("#groupPhotoBoardDiv").html(groupPhotoBoardDivContent);
			}
        },
        error: function() {
            alert("모임 사진 게시물을 가져오는데 실패했습니다.");
        }
    }); // ajax() end
	
} // loadPhotoBoardList() end

// 모임 사진 페이지에서 게시글 이미지 클릭 시 해당 게시글 팝업창 열기 함수
function openPostDetailPopup(photoBoardId) {
	
	var popupWidth = 1000;
    var popupHeight = 700;
    var left = (screen.width / 2) - (popupWidth / 2);
    var top = (screen.height / 2) - (popupHeight / 2);

	var popup = window.open('/groupphoto/photopost?photoBoardId=' + photoBoardId, 'photoPostPopup', 'width=' + popupWidth + ', height=' + popupHeight + ', top=' + top + ', left=' + left + ', scrollbars=yes');

    popup.onload = function() {
        var photoContentDiv = popup.document.getElementById('photoContentDiv');
        var contentHeight = photoContentDiv.scrollHeight;

        // 팝업창 높이를 내용의 높이에 맞게 조정
        popup.resizeTo(popupWidth + 100, contentHeight + 300);
    };

} // openPostDetailPopup() end


// 모임 사진 페이지에서 페이지 번호 클릭 시 해당 페이지 불러오기
function loadPagingContent(pageNum) {

    $.ajax({
        url: '/groupphoto/photo',
        method: "POST",
        data: { groupId: groupId, pageNum: pageNum },
        success: function(data) {
            $("#groupTapPageSection").html(data);
        },
        error: function() {
            alert(pageNum + "페이지를 불러오는데 실패했습니다.");
        }
    }); // ajax() end
    
} // loadPagingContent() end

// 게시물 업로드 날짜 형식 변환하는 함수
function formatDateTime(dateTime) {
    // 문자열을 Date 객체로 변환
    const date = new Date(dateTime);

    // 년, 월, 일을 추출
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();

    // 원하는 형식으로 변환
    return `${year}년 ${month}월 ${day}일`;
} // formatDateTime() end