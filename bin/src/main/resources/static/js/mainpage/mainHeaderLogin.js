//로그인 후 - 내 프로필 사진 보여주기
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
