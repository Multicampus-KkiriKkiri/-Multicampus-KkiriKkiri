
//로그인 전 - 메인페이지 신상 모임 보여주기
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: '/getNewestGroup',
        success: function(response){
			//alert(response[0].groupName);
            if(response && response.length > 0){
                $('#newestGroupDetailContainer').empty(); // 기존 내용 지우기
                $.each(response, function(index, newestGroupDetails2){					
                    if(index <= 7){ 
                        var newestGroupHtml = 
                        	'<div class="col-3">' +
                            '<a href="#">' +
                                '<img class="my-group-image" src="' + newestGroupDetails2.groupImage + '" alt="모임 대표 사진">' +
                                '<h5>' + newestGroupDetails2.groupName + '</h5>' +
                                '<div>'+
	                                '<div>' + newestGroupDetails2.groupType + '</div>' +
	                                '<div>' + newestGroupDetails2.regionName + ' ' + newestGroupDetails2.districtName + '</div>' +
                                '<div>' +
                            '</a>' +
                        '</div>';
                        $('#newestGroupDetailContainer').append(newestGroupHtml);
                    }
                });
            } else {
                $('#newestGroupDetailContainer').html('<p>내 모임 정보를 가져오는 데 실패했습니다.</p>');
            }
        },
        error: function(xhr, status, error){
            console.error('AJAX 요청 실패: ' + status, error);
            $('#newestGroupDetailContainer').html('<p>서버와의 통신에 문제가 발생했습니다.</p>');
        }
    });
});


//메인페이지 - 관심사별 목록 보여주기
$(document).ready(function(){
    
    // 처음에 interestId1인 그룹을 불러오는 AJAX 요청
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