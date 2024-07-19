//로그인 후 - 메인페이지 내 모임 목록 보여주기
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: '/mygroupdetail',
        success: function(response){
			//alert(response[0].groupName);
            if(response && response.length > 0){
                $('#groupDetailContainer').empty(); // 기존 내용 지우기
                $.each(response, function(index, myGroupDetails){					
                    if(index <= 7){ 
                        var myGroupHtml = 
                        	'<div class="col-3">' +
                            '<a href="#">' +
                                '<img class="my-group-image" src="' + myGroupDetails.groupImage + '" alt="모임 대표 사진">' +
                                '<h5>' + myGroupDetails.groupName + '</h5>' +
                                '<div>'+
	                                '<div>' + myGroupDetails.groupType + '</div>' +
	                                '<div>' + myGroupDetails.regionName + ' ' + myGroupDetails.districtName + '</div>' +
                                '<div>' +
                            '</a>' +
                        '</div>';
                        $('#myGroupDetailContainer').append(myGroupHtml);
                    }
                });
            } else {
				var noneGroupHtml = 
					`<div>
						<img src="/images/letsGo.jpg" alt="이모티콘" style="width: 250px; height: 250px;">
						<a href="#">지금 모임 둘러보기</a>
					</div>`;
                $('#myGroupDetailContainer').empty().append(noneGroupHtml);
                $('#go-to-my-group-list').hide();
            }
        },
        error: function(xhr, status, error){
            console.error('AJAX 요청 실패: ' + status, error);
            $('#myGroupDetailContainer').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
        }
    });
});

//메인페이지 - 관심사별 목록 보여주기
$(document).ready(function(){
    
    loadGroupsByInterest(1);

    $('.interest-nav').click(function(event){
        event.preventDefault(); // 기본 동작 방지
        var interestId = $(this).data('interest-id');
        
        loadGroupsByInterest(interestId);
    });

    function loadGroupsByInterest(interestId) {
        $.ajax({
            type: 'GET',
            url: '/groupDetailsByInterest',
            data: {interestId: interestId},
            success: function(response){
                if(response && response.length > 0){
                    $('#groupDeatilsByInterest').empty();
                    
                    $.each(response, function(index, groupDetailsByInterest){					
                        if (groupDetailsByInterest.regionName !== "온라인" && groupDetailsByInterest.districtName !== "온라인"){				
	                        if(index <= 7){ 
	                            var myGroupHtml = 
	                                '<div class="col-3">' +
	                                '<a href="#">' +
	                                    '<img class="my-group-image" src="' + groupDetailsByInterest.groupImage + '" alt="모임 대표 사진">' +
	                                    '<h5>' + groupDetailsByInterest.groupName + '</h5>' +
	                                    '<div>'+
	                                        '<div>' + groupDetailsByInterest.groupType + '</div>' +
	                                        '<div>' + groupDetailsByInterest.regionName + ' ' + groupDetailsByInterest.districtName + '</div>' +
	                                    '</div>' +
	                                '</a>' +
	                            '</div>';
	                            $('#groupDeatilsByInterest').append(myGroupHtml);
	                        }//inner if
                        } else{
							 var myGroupHtml = 
	                                '<div class="col-3">' +
	                                '<a href="#">' +
	                                    '<img class="my-group-image" src="' + groupDetailsByInterest.groupImage + '" alt="모임 대표 사진">' +
	                                    '<h5>' + groupDetailsByInterest.groupName + '</h5>' +
	                                    '<div>'+
	                                        '<div>' + groupDetailsByInterest.groupType + '</div>' +
	                                        '<div></div>' +
	                                    '</div>' +
	                                '</a>' +
	                            '</div>';
	                            $('#groupDeatilsByInterest').append(myGroupHtml);
						}//iner else
                    });//each
                } else {
                    $('#groupDeatilsByInterest').html(
						 '<div class="no-groups-message">' +
                            '<img src="/images/thumsUp.png" alt="모임 없음" class="no-groups-message-img">' +
                            '<p>더 많은 모임이 등록될 예정이에요.</p>' +
                        '</div>'
					);
                }//else
            },
            error: function(xhr, status, error){
                console.error('AJAX 요청 실패: ' + status, error);
                $('#groupDeatilsByInterest').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
            }
        });
    }
});


