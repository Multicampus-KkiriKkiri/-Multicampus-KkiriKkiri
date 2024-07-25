//지역정보 가져오기 - MainUserController에서 처리
$(document).ready(function() {
	
	let userOriginalRegionInSearch = $('#search-userRegion').val();
	
    // 모든 지역 정보를 가져와서 "city" 셀렉트 박스에 추가
    $.ajax({
        url: '/regions',
        method: 'GET',
        success: function(data) {
            let citySelect = $('#search-userRegion');   

            citySelect.find('option').remove();
            
            //'대한민국 전체' 옵션 추가
            citySelect.append('<option value="0">대한민국 전체</option>');

            data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                .forEach(region => {
                    let isSelected = (region.regionName === userOriginalRegionInSearch) ? ' selected' : '';
                    citySelect.append('<option value="' + region.regionId + '"' + isSelected + '>' + region.regionName + '</option>');
                });                    
        },
        error: function(error) {
            console.log("Error fetching regions:", error);
        }
    });
    

	//로그인 후 상단 고정바 오른쪽 드랍다운 보여주기
	$('#main-header-login-dropdown-btn').click(function(event){
		 event.stopPropagation();
		$('#main-header-login-dropdown-menu').toggle();
	});	
	
	//드랍다운 바깥쪽 클릭해도 toggle
	$(window).click(function(){
		$('#main-header-login-dropdown-menu').hide();
    });

    // 드롭다운 메뉴 내부를 클릭했을 때도 이벤트 전파 중단
    $('#main-header-login-dropdown-menu').click(function(event){
        event.stopPropagation();
    });
});//ready    
    
