//관심사 수정 - 상단에 위치시키기
let interests = [];

/*모임목록 보여주기 + 무한 스크롤*/
let page = 0;
let pageSize = 12;
let isLoading = false;
let hasMoreData = true;
let currentLoadFunction = () => loadMoreGroups('/mygroupdetailasmember'); // 초기값 설정

$(document).ready(function() {
    // 페이지가 로드되었을 때 '내 모임', '모임원' 버튼 클릭된 상태로 보여주기
    $('#my-group-area').trigger('click').css('color', 'red');
    $('#as-member').trigger('click').css('color', 'red');
    $('#my-group-content').show();

    $('#my-group-area').click(function() {
        $('#my-groups').show();
        $('#as-member').trigger('click').css('color', 'red');
        $('#my-group-content').show();
        $('#my-event-content').hide();
    });

    // '내 모임' -> '모임원' 모임 목록 페이지 로드되자마자 보여주기
    loadMoreGroups('/mygroupdetailasmember');

    // 공통 스크롤 이벤트 핸들러
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && !isLoading && hasMoreData) {
            //console.log('Triggering loadMoreGroups'); 
            currentLoadFunction();
        }
    });

    $('#as-member').click(function() {
        resetPagination();
        $('#my-group-content').empty();
        currentLoadFunction = () => loadMoreGroups('/mygroupdetailasmember');
        loadMoreGroups('/mygroupdetailasmember');
    });

    $('#as-leader').click(function() {
        resetPagination();
        $('#my-group-content').empty();
        currentLoadFunction = () => loadMoreGroups('/mygroupasleader');
        loadMoreGroups('/mygroupasleader');
    });
});

function resetPagination() {
    page = 0;
    isLoading = false;
    hasMoreData = true;
}

function loadMoreGroups(url) {	
	if (isLoading) return;
	//console.log(`Loading page ${page} from ${url}`); 	
    isLoading = true;
    
    $.ajax({
        type: 'GET',
        url: url,
        data: {
            page: page,
            size: pageSize
        },
        success: function(response) {
            if (response && response.length > 0) {
                $.each(response, function(index, myGroupDetails) {
                    var myGroupHtml =
                        '<div class="col-sm-3 my-group-detail" style="margin-top: 2rem;">' +
                            '<a href="/groupdetail/info?groupId=' + myGroupDetails.groupId + '">' +
                                '<div class="my-group-image-name">' +
                                    '<img class="my-group-image" src="' + myGroupDetails.groupImage + '" alt="모임 대표 사진">' +
                                    '<p class="my-group-name">' + myGroupDetails.groupName + '</p>' +
                                '</div>' +
                            '</a>' +
                        '</div>';
                    $('#my-group-content').append(myGroupHtml);
                });
                page++;
                isLoading = false;
            } else {
                if (page === 0) {
                    var noneGroupHtml =
                        '<div>' +
                            '<img src="/images/letsGo.jpg" alt="이모티콘" style="width: 250px; height: 250px;">' +
                            '<a href="#">지금 모임 둘러보기</a>' +
                        '</div>';
                    $('#my-group-content').empty().append(noneGroupHtml);
                }
                isLoading = false;
                hasMoreData = false;
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX 요청 실패: ' + status, error);
            $('#my-group-content').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
            isLoading = false;
            hasMoreData = false;
        }
    });
}


//'내 모임' -> '신청대기' 모임 목록 보여주기
//$(document).ready(function(){
	$('#waiting-lists').click(function(){
	    $.ajax({
		    type: 'GET',
		    url: '/mypendinggroupdetail',
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
//});//ready

//'내 모임' -> '쨈' 모임 목록 보여주기
//$(document).ready(function(){
	$('#wishlists').click(function(){
	    $.ajax({
		    type: 'GET',
		    url: '/mywishlistgroupdetail',
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
//});//ready

				         
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
    
    //관심사가 한 개 이상 선택 안돼 안내 메시지 나간후 다시 클릭하면 안내메시지 안보이기
    $('.interest-list').on('change', function() {
        $('#my-page-interest-warning').text('').css('color', '');
    });   

    $("#modify-interest-btn").click(function(){
	console.log(interests.length);
			$.ajax({
			type: 'POST',
			url: '/modifyInterestId',
			data: {interests : interests},
			success : function(response){					
				if (response != '') {
                    $('#user-interests').empty(); 
                    response.forEach(function(interest) {
                        $('#user-interests').append(
							'<div class="my-page-show-interest-area">'+
								'<i class="fa-solid fa-paper-plane"></i>'+
								'<div>' + interest + '</div>'+
							'</div>'
						);
					$('#interest-list-area').slideUp();
                    });
				}else{
					$('#my-page-interest-warning').text('한 개 이상 반드시 선택해주세요.').css('color','red');
				}
			},//success
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}		
		});//ajax			
	});//#modify-interest-btn.click   
//});//ready  

//관심사 수정 버튼 클릭 시 수정창 보여주고 닫기
$('#show-modify-interest-btn').click(function(){
    $('#interest-list-area').slideToggle();
});


//내 일정 보여주기
//$(document).ready(function() {	
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
//});

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

    