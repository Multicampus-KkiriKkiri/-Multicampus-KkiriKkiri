/**
 * 모임 사진 게시물 상세페이지 js
 */

 $(document).ready(function() {
	
	// 모임 사진 게시물 업로드 날짜 형식 변경 후 보여주기
	loadUploadDateTime();
    
}); // ready() end

function loadUploadDateTime() {
	
	// postUploadDateTimeSpan에 내용을 추가
	$("#postUploadDateTimeSpan").html(formatDateTime(uploadDateTime));
	
} // loadUploadDateTime() end

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