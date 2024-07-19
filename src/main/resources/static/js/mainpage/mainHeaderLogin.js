//로그인 후 상단 고정바 오른쪽 드랍다운 보여주기
$(document).ready(function() {	
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
    
/* 깃허브 합친 후 드랍다운 토글 작동 안될 시 아래 코드 레디 함수에 넣고 테스트
	let mainHeaderLoginDropDowonMenu = $('#main-header-login-dropdown-menuuu');
	$('#main-header-login-dropdown-btnnn').click(function(event){
		console.log(mainHeaderLoginDropDowonMenu.hasClass("show"));
		if(mainHeaderLoginDropDowonMenu.hasClass("show")){
			mainHeaderLoginDropDowonMenu.removeClass('show');
		}
		else{
			mainHeaderLoginDropDowonMenu.addClass('show');
		}
		event.stopPropagation();	
	});    
*/







