//관심사 수정
let interests = [];
$(document).ready(function(){				         
    // 모든 관심사 체크박스에 대한 공통 이벤트 핸들러
    $("input[type='checkbox'].interest-list").change(function() {
        let labelText = $(this).next("label").text();
        let isChecked = $(this).is(":checked");

        if (isChecked) {
            interests.push(labelText);
        } else {
            interests = interests.filter(item => item !== labelText);
        }
        console.log(interests); 
    });

    $("#modify-interest-btn").click(function(){
	console.log(interests.length);
			$.ajax({
			type: 'POST',
			url: '/modifyInterestId',
			data: {interests : interests},
			success : function(response){
				if (response != null) {
                    $('#user-interests').empty(); 
                    response.forEach(function(interest) {
                        $('#user-interests').append('<div>' + interest + '</div>');
                    });
				}else{
					alert("실패");
				}
			},//success
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}		
		});//ajax			
	});//#modify-interest-btn.click   
});//ready  

//관심사 수정 버튼 클릭 시 수정창 보여주고 닫기
$('#show-modify-interest-btn').click(function(){
	$('#interest-list-area').slideDown();
});

$('#modify-interest-btn').click(function(){
	$('#interest-list-area').slideUp();
});


//내 일정 보여주기
$(document).ready(function() {
    $('#my-event-area').click(function() {
		$('#my-groups').hide();
        $.ajax({
            type: 'GET',
            url: '/showmygroupeventlist',
            success: function(response) {
                if (response.error) {
                    $('#my-event-content').html(response.error);
                    $('#my-event-content').show();
                } else {
                    let groupedEvents = response.groupedEvents;
                    let eventListHtml = '';
                    let previousYear = null;

                    $.each(groupedEvents, function(date, events) {
						let dateObj = new Date(date);
                        let year = dateObj.getFullYear();
                        let formattedDate = formatDate(dateObj);

                        if (year !== previousYear) {
                            eventListHtml += '<div class="event-year-group">';
                            eventListHtml += '<div>일정 연도: ' + year + '</div>';
                            eventListHtml += '</div>';
                            previousYear = year;
                        }

                        eventListHtml += '<div class="event-date-group">';
                        eventListHtml += '<div>일정 날짜: ' + formattedDate + '</div>';
                        
                        $.each(events, function(index, event) {
                            eventListHtml += '<div class="event-item">';
                            eventListHtml += '<img src="' + event.eventImage + '" alt="일정 사진">';
                            eventListHtml += '<div>일정위치: ' + event.eventLocation + '</div>';
                            eventListHtml += '<div>일정이름: ' + event.eventName + '</div>';
                            eventListHtml += '<div>모임이름: ' + event.groupName + '</div>';
                            eventListHtml += '</div>';
                        });
                        eventListHtml += '</div>';
                    });

                    $('#my-event-content').html(eventListHtml);
                    $('#my-event-content').show();
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX 요청 실패: ' + status, error);
            }
        });
    });
});

// 날짜 형식을 변경하는 함수 추가
function formatDate(date) {
    const options = { month: 'long', day: 'numeric', weekday: 'short' };
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const parts = formatter.formatToParts(date);

    let formattedDate = '';
    parts.forEach((part) => {
        if (part.type === 'month') {
            formattedDate += part.value + ' ';
        } else if (part.type === 'day') {
            formattedDate += part.value + '일 ';
        } else if (part.type === 'weekday') {
            formattedDate += '(' + part.value + ')';
        }
    });

    return formattedDate;
}

//'내 모임' 누르면 선택 사항 보여주기
$('#my-group-area').click(function(){
	$('#my-groups').show();
	$('#my-event-content').hide();
});

//'내 모임' -> '모임원' 모임 목록 보여주기
$(document).ready(function(){
	$('#as-member').click(function(){
	    $.ajax({
		    type: 'GET',
		    url: '/mygroupdetail',
		    success: function(response){
				//alert(response[0].groupName);
		        if(response && response.length > 0){
		            $('#my-group-content').empty();
		            $.each(response, function(index, myGroupDetails){					
		                if(index <= 7){  //이부분 무한 스크롤링 구현하면 수정 필요
		                    var myGroupHtml = 
		                    	'<div class="col-3">' +
		                        '<a href="#">' +
		                            '<img class="my-group-image" style="width:300px; height:300px;" src="' + myGroupDetails.groupImage + '" alt="모임 대표 사진">' +
		                            '<h5>' + myGroupDetails.groupName + '</h5>' +
		                            '<div>'+
		                                '<div>' + myGroupDetails.groupType + '</div>' +
		                                '<div>' + myGroupDetails.regionName + ' ' + myGroupDetails.districtName + '</div>' +
		                            '<div>' +
		                        '</a>' +
		                    '</div>';
		                    $('#my-group-content').append(myGroupHtml);
		                }
		            });
		        } else {
					var noneGroupHtml = 
						`<div>
							<img src="/images/letsGo.jpg" alt="이모티콘" style="width: 250px; height: 250px;">
							<a href="#">지금 모임 둘러보기</a>
						</div>`;
		            $('#my-group-content').empty().append(noneGroupHtml);
		            //$('#go-to-my-group-list').hide();
		        }
		    },
		    error: function(xhr, status, error){
		        console.error('AJAX 요청 실패: ' + status, error);
		        $('#my-group-content').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
		    }
		});//ajax		
	});//as-member click
});//ready


//'내 모임' -> '모임장' 모임 목록 보여주기
$(document).ready(function(){
	$('#as-leader').click(function(){
	    $.ajax({
		    type: 'GET',
		    url: '/mygroupasleader',
		    success: function(response){
				//alert(response[0].groupName);
		        if(response && response.length > 0){
		            $('#my-group-content').empty();
		            $.each(response, function(index, myGroupDetails){					
		                if(index <= 10){    //이부분 무한 스크롤링 구현하면 수정 필요
		                    var myGroupHtml = 
		                    	'<div class="col-3">' +
		                        '<a href="#">' +
		                            '<img class="my-group-image" style="width:300px; height:300px;" src="' + myGroupDetails.groupImage + '" alt="모임 대표 사진">' +
		                            '<h5>' + myGroupDetails.groupName + '</h5>' +
		                            '<div>'+
		                                '<div>' + myGroupDetails.groupType + '</div>' +
		                                '<div>' + myGroupDetails.regionName + ' ' + myGroupDetails.districtName + '</div>' +
		                            '<div>' +
		                        '</a>' +
		                    '</div>';
		                    $('#my-group-content').append(myGroupHtml);
		                }
		            });
		        } else {
					var noneGroupHtml = 
						`<div>
							<img src="/images/letsGo.jpg" alt="이모티콘" style="width: 250px; height: 250px;">
							<a href="#">지금 모임 둘러보기</a>
						</div>`;
		            $('#my-group-content').empty().append(noneGroupHtml);
		            //$('#go-to-my-group-list').hide();
		        }
		    },
		    error: function(xhr, status, error){
		        console.error('AJAX 요청 실패: ' + status, error);
		        $('#my-group-content').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
		    }
		});//ajax		
	});//as-leader click
});//ready

















    