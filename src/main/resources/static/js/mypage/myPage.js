//관심사 수정 - 상단에 위치시키기
let interests = [];

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

//관심사 수정 버튼 클릭 시 수정창 보여주고 닫기
$('#show-modify-interest-btn').click(function(){
    $('#interest-list-area').slideToggle();
});


//모임 목록 상단 메뉴탭 - 메뉴탭 클릭 후에도 hover 효과 유지
document.addEventListener('DOMContentLoaded', function(){
	const buttons = document.querySelectorAll('#my-page-nav button');
	
	buttons.forEach(button => {
		button.addEventListener('click',function(){
			buttons.forEach(btn=> btn.classList.remove('clicked'));
			
			this.classList.add('clicked');
		});
	});
});//addEventListener


// 메뉴탭 하단 메뉴 슬라이딩 메뉴
const groupNavLine = document.getElementById('my-group-nav-underline');
const eventNavLine = document.getElementById('my-event-nav-underline');
const myGroupBottomNavBtns = document.getElementsByClassName('my-group-bottom-nav');
const myEventBottomNavBtns = document.getElementsByClassName('my-event-bottom-nav');

Array.from(myGroupBottomNavBtns).forEach(menu => menu.addEventListener('click', (e) => {
	underlineIndicator(e, 'group');
	hideEventNavLine(); 
}));
Array.from(myEventBottomNavBtns).forEach(menu => menu.addEventListener('click', (e) => {
    underlineIndicator(e, 'event');
    hideGroupNavLine(); 
}));    
    
function underlineIndicator(e, type) {
    const target = e.currentTarget;
    if (type === 'group') {
        groupNavLine.style.left = target.offsetLeft + "px";
        groupNavLine.style.width = target.offsetWidth + "px";
        groupNavLine.style.top = target.offsetTop + target.offsetHeight + "px";
        groupNavLine.style.display = 'block'; 
    } else if (type === 'event') {
        eventNavLine.style.left = target.offsetLeft + "px";
        eventNavLine.style.width = target.offsetWidth + "px";
        eventNavLine.style.top = target.offsetTop + target.offsetHeight + "px";
        eventNavLine.style.display = 'block'; 
    }
}
function hideGroupNavLine() {
    groupNavLine.style.display = 'none'; 
}

function hideEventNavLine() {
    eventNavLine.style.display = 'none'; 
}


// 모임일정 목록 보여주기 + 무한 스크롤
$(document).ready(function() {
	//모임 목록
    let page = 0;
    let pageSize = 12;
    let isLoading = false;
    let hasMoreData = true;
    let currentLoadFunction = () => loadMoreGroups('/mygroupdetailasmember'); // 초기값 설정

    // '내 모임', '내 모임 일정' 버튼 작동
    $('#my-group-area').click(function() {
        $('#my-groups').show();
        $('#my-events').hide();        
        // 기본적으로 '모임원' 버튼을 클릭한 상태로 설정
        $('#as-member').trigger('click');
    });    

    $('#my-event-area').click(function() {
        $('#my-groups').hide();
        $('#my-events').show();
        // 기본적으로 '진행중 일정' 버튼을 클릭한 상태로 설정
        $('#ongoing-events').trigger('click');
    });  

    function loadMoreGroups(url) {    
        if (isLoading) return;
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
                            '<div class="my-page-no-group-message">' +
                                '<img src="/images/letsGo.jpg" alt="이모티콘">' +
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
        });//ajax
    }//loadMoreGroups    
    
    // '내 모임' -> '모임원' 모임 목록 페이지 로드되자마자 보여주기
    $('#my-group-area').trigger('click');
    loadMoreGroups('/mygroupdetailasmember');
    
    // 모임 목록 무한 스크롤 구현
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
    
    $('#waiting-lists').click(function() {
        resetPagination();
        $('#my-group-content').empty();
        currentLoadFunction = () => loadMoreGroups('/mypendinggroupdetail');
        loadMoreGroups('/mypendinggroupdetail');
    });
    
    $('#wishlists').click(function() {
        resetPagination();
        $('#my-group-content').empty();
        currentLoadFunction = () => loadMoreGroups('/mywishlistgroupdetail');
        loadMoreGroups('/mywishlistgroupdetail');
    });    

    function resetPagination() {
        page = 0;
        isLoading = false;
        hasMoreData = true;
    }
    

    // 내 일정 보여주기
    let eventPage = 0;
    let eventPageSize = 4;
    let eventIsLoading = false;
    let eventType = null;   
    let eventHasMoreData = true;
    let previousYears = new Set();
    let previousDates = new Set(); 

    // 진행중 일정, 지나간 일정 버튼 클릭 시
    $('#ongoing-events').click(function() {
        $('#my-groups').hide();
        eventType = 'ongoing';
        eventPage = 0; 
        $('#my-event-content').empty(); 
        previousYears.clear(); 
        previousDates.clear();
        eventHasMoreData = true;  
        loadEvents(); 
    });

    $('#past-events').click(function() {
        $('#my-groups').hide();
        eventType = 'past';
        eventPage = 0; 
        $('#my-event-content').empty(); 
        previousYears.clear(); 
        previousDates.clear();
        eventHasMoreData = true;
        loadEvents(); 
    });

    function loadEvents() {
        if (eventIsLoading || !eventHasMoreData) return;          
        eventIsLoading = true;         
        
        $.ajax({
            type: 'GET',
            url: '/showmygroupeventlist',            
            data: { eventType: eventType, page: eventPage, size: eventPageSize },
            success: function(response) {
                if (response.error) {
                    $('#my-event-content').html(response.error);
                    $('#my-event-content').show();
                } else {
                    let groupedEvents = response;
                    let eventListHtml = '';  
                    
  	                if (groupedEvents.length === 0) {
						  console.log("groupEvents: ", groupedEvents);
						  
	                    if (eventPage === 0) {
	                        // 일정이 없을 경우 메시지 표시
	                        var noneGroupHtml =
	                            '<div class="my-page-no-group-message">' +
	                                '<img src="/images/letsGo.jpg" alt="이모티콘">' +
	                                '<a href="#">지금 모임 둘러보기</a>' +
	                            '</div>';
	                        $('#my-event-content').empty().append(noneGroupHtml);
	                    }
	                    eventIsLoading = false;
	                    eventHasMoreData = false;
	                    return; 
	                } 		                       

				        $.each(groupedEvents, function(index, event) {
                        let date = new Date(event.eventDate);
                        let year = date.getFullYear();
                        let formattedDate = formatDate(date);        
                        let dateKey = `${year}-${date.getMonth() + 1}-${date.getDate()}`;                       
              
                        // 현재 날짜 확인
                   		let today = new Date();
                   		let todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                   		let isToday = (dateKey === todayKey);
                 
                        //console.log("Current Event Year: ", year);
                  		//console.log("Previous Years: ", previousYears);                       
                        
                        //같은 연도의 일정일 경우 연도를 한 번만 표시
                        if(!previousYears.has(year)){							
							if (previousYears.size > 0) {
	                            eventListHtml += '</div>'; // 이전 연도의 날짜 그룹을 닫음
	                        }       
				            eventListHtml += '<div class="event-year-group">';
                            eventListHtml += '<h4 class="event-year">' + year + '</h4>';
                            eventListHtml += '<div class="event-date-group">';
                            previousYears.add(year);							
						}		
						
	                    // 같은 날짜의 일정일 경우 날짜를 한 번만 표시 + 현재 날짜는 '오늘' 텍스트로 대체
	                    if (!previousDates.has(dateKey)) {
	                        if (isToday) {
	                            eventListHtml += '<h5 class="event-date">오늘</h5>';
	                        } else {
	                            eventListHtml += '<h5 class="event-date">' + formattedDate + '</h5>';
	                        }
	                        eventListHtml += '<div class="event-date-hr"></div>';
	                        previousDates.add(dateKey); 
	                    }
	                                 
                        eventListHtml += '<a class="event-item" href="/groupdetail/info?groupId=' + event.groupId + '">';                       
                        eventListHtml += '<img src="' + event.eventImage + '" alt="일정 사진">';                        
                        eventListHtml += '<div class="event-item-content">';
                        eventListHtml += '<div class="event-item-location">' + event.eventLocation + '</div>';
                        eventListHtml += '<div class="event-item-name">' + event.eventName + '</div>';             
                        eventListHtml += '<div class="event-item-group-name">' + event.groupName + '</div>';                        
                        eventListHtml += '</div>';
                        eventListHtml += '</a>';                        
                    });//each
                    
                  	if (previousYears.size > 0) {
                    	eventListHtml += '</div>'; // 마지막 연도의 날짜 그룹을 닫음
                	}

                    $('#my-event-content').append(eventListHtml);                                        
                    $('#my-event-content').show();
                    eventPage++;
                }//외부 else     
                eventIsLoading = false;           
            },
            error: function(xhr, status, error) {
                console.error('AJAX 요청 실패: ' + status, error);
                $('#my-event-content').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
                eventIsLoading = false;
            }
        });//ajax
    }//loadEvents
   
    // 날짜 형식을 변경하는 함수
    function formatDate(date) {
        const months = [
            '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'
        ];
        const weekdays = [
            '일', '월', '화', '수', '목', '금', '토'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const weekday = weekdays[date.getDay()];

        return `${month} ${day}일(${weekday})`;
    }

    // 모임/일정 무한 스크롤 이벤트 통합
    $(window).on('scroll', function() {
        let scrollTop = $(window).scrollTop();
        let windowHeight = $(window).height();
        let documentHeight = $(document).height();

        if (scrollTop + windowHeight >= documentHeight - 100) {
            if ($('#my-groups').is(':visible') && !isLoading && hasMoreData) {
                currentLoadFunction();
            }

            if ($('#my-events').is(':visible') && !eventIsLoading) {
                loadEvents();
            }
        }
    });//scroll
});//ready


    