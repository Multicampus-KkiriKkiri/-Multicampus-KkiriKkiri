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
						//온라인, 오프라인에 따른 아이콘 추가
						var onOfflineIcon = '';
                        var locationIcon = ''; 

                        if(myGroupDetails.groupType === '온라인'){
                            onOfflineIcon = '<i class="fa-solid fa-desktop"></i>';
                            locationIcon = ''; 
                        } else if(myGroupDetails.groupType === '오프라인'){
                            onOfflineIcon = '<i class="fa-solid fa-bolt-lightning"></i>'; 
                            locationIcon = '<i class="fa-solid fa-location-dot"></i>'; 
                        }	
                        //행별 그룹목록 상단 마진 다르게 주기
                        var marginStyle = '';
	                    if(index < 4){ 
	                        marginStyle = 'margin-top: 1.5rem;'; 
	                    } else {
	                        marginStyle = 'margin-top: 4rem;'; 
	                    }							
						
                        var myGroupHtml =                         	
                        	'<div class="col-3 group-detail" style="' + marginStyle + '">' +
	                            '<a href="/groupdetail/info?groupId=' + myGroupDetails.groupId + '">' +
	                                '<div class="group-image-name">' +
	                                	'<img class="group-image" src="' + myGroupDetails.groupImage + '" alt="모임 대표 사진">' +
	                                	'<h5 class="group-name">' + myGroupDetails.groupName + '</h5>' +
	                                '</div>' +
	                                '<div class="group-info">'+
		                                '<div class="group-type">' + onOfflineIcon + ' '+ myGroupDetails.groupType + '</div>' +
		                                '<div>' + locationIcon + ' '+ myGroupDetails.regionName + ' ' + myGroupDetails.districtName + '</div>' +
	                                '</div>' +
	                            '</a>' +
                        	'</div>';
                        $('#myGroupDetailContainer').append(myGroupHtml);
                    }
                });
            } else {
				var noneGroupHtml = 
					`<div class="no-my-group-message">
						<img src="/images/letsGo.jpg" alt="이모티콘"><br>
						<a href="/groupsearch">지금 모임 둘러보기</a>
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
	
    // 관심사 목록 클릭 시 hover 이벤트 유지
    $('.interest-nav').on('click', function() {
        $('.interest-nav').removeClass('continue-hover');        
        $(this).addClass('continue-hover');
    });	
    
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
						//온라인, 오프라인에 따른 아이콘 추가
						var onOfflineIcon = '';
                        var locationIcon = ''; 

                        if(groupDetailsByInterest.groupType === '온라인'){
                            onOfflineIcon = '<i class="fa-solid fa-desktop"></i>';
                            locationIcon = ''; 
                        } else if(groupDetailsByInterest.groupType === '오프라인'){
                            onOfflineIcon = '<i class="fa-solid fa-bolt-lightning"></i>'; 
                            locationIcon = '<i class="fa-solid fa-location-dot"></i>'; 
                        }	
                        //행별 그룹목록 상단 마진 다르게 주기
                        var marginStyle = '';
	                    if(index < 4){ 
	                        marginStyle = 'margin-top: 2.5em;'; 
	                    } else {
	                        marginStyle = 'margin-top: 4em;'; 
	                    }						
						if(index < 8 ){
							if (groupDetailsByInterest.regionName !== "온라인" && groupDetailsByInterest.districtName !== "온라인"){       															
		                            var myGroupHtml = 
		                                '<div class="col-3 group-detail" style="' + marginStyle + '">' +
			                                '<a href="/groupdetail/info?groupId=' + groupDetailsByInterest.groupId + '">' +
			                                	'<div class="group-image-name">' +
				                                    '<img class="group-image" src="' + groupDetailsByInterest.groupImage + '" alt="모임 대표 사진">' +
				                                    '<h5 class="group-name">' + groupDetailsByInterest.groupName + '</h5>' +
			                                    '</div>'+
			                                    '<div class="group-info">'+
			                                        '<div class="group-type">' + onOfflineIcon + ' '+ groupDetailsByInterest.groupType + '</div>' +
			                                        '<div>' + locationIcon + ' '+ groupDetailsByInterest.regionName + ' ' + groupDetailsByInterest.districtName + '</div>' +
			                                    '</div>' +
			                                '</a>' +
			                            '</div>';
		                            $('#groupDeatilsByInterest').append(myGroupHtml);
	                        } else{
								 var myGroupHtml = 
		                                '<div class="col-3 group-detail" style="' + marginStyle + '">' +
			                                '<a href="/groupdetail/info?groupId=' + groupDetailsByInterest.groupId + '">' +
			                                	'<div class="group-image-name">' +
				                                    '<img class="group-image" src="' + groupDetailsByInterest.groupImage + '" alt="모임 대표 사진">' +
				                                    '<h5 class="group-name">' + groupDetailsByInterest.groupName + '</h5>' +
			                                    '</div>'+
			                                    '<div class="group-info">'+
			                                        '<div class="group-type">' + onOfflineIcon + ' '+ groupDetailsByInterest.groupType + '</div>' +
			                                        '<div></div>' +
			                                    '</div>' +
			                                '</a>' +
			                            '</div>';
		                            $('#groupDeatilsByInterest').append(myGroupHtml);                      
							}//iner else
						}//if (index<8)
                    });//each
                } else {
                    $('#groupDeatilsByInterest').html(
						 '<div class="no-group-message">' +
                            '<img src="/images/thumsUp.png" alt="모임 없음" class="no-group-message-img">' +
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

