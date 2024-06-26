/**
 * 모임 일정페이지 js
 */

 $(document).ready(function() {

	// 모임 일정페이지에서 '예정된 일정' 버튼 눌렀을때 이벤트 처리
    $('#futureEventBtn').click(function() {
        showUpcomingEvents();
    });
    
    // 모임 일정페이지에서 '지난 일정' 버튼 눌렀을때 이벤트 처리
    $('#pastEventBtn').click(function() {
        showPastEvents();
    });
    
}); // ready() end

// 예정된 일정 보이게 하는 함수
function showUpcomingEvents() {
            document.getElementById('futureEventsDiv').style.display = 'block';
            document.getElementById('pastEventsDiv').style.display = 'none';
}

// 지난 일정 보이게 하는 함수
function showPastEvents() {
	document.getElementById('futureEventsDiv').style.display = 'none';
	document.getElementById('pastEventsDiv').style.display = 'block';
}