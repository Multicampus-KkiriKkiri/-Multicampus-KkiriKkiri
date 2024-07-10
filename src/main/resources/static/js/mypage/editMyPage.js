//지역정보 가져오기 - MainUserController에서 처리
$(document).ready(function() {
    // 모든 지역 정보를 가져와서 "city" 셀렉트 박스에 추가
    $.ajax({
        url: '/regions',
        method: 'GET',
        success: function(data) {
            let citySelect = $('#userRegion');
            data.forEach(function(region) {
                citySelect.append('<option value="' + region.regionId + '">' + region.regionName + '</option>');
            });
        },
        error: function(error) {
            console.log("Error fetching regions:", error);
        }
    });

    // 특정 지역이 선택되었을 때 해당 지역의 구/군 정보를 가져와서 "district" 셀렉트 박스에 추가
    $('#userRegion').change(function() {
        var regionId = $(this).val();
        $.ajax({
            url: '/regions/' + regionId,
            method: 'GET',
            success: function(data) {
                var districtSelect = $('#userDistrict');
                districtSelect.empty();
                districtSelect.append('<option value="" disabled selected>구/동 선택</option>');
                data.forEach(function(district) {
                    districtSelect.append('<option value="' + district.districtId + '">' + district.districtName + '</option>');
                });
            },
            error: function(error) {
                console.log("Error fetching districts:", error);
            }
        });
    });
});

//내 프로필 사진 업로드
function loadFile(input) {	
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#uploadedImage')
                .attr('src', e.target.result)
                .width(300)
                .height(350);
        };
        reader.readAsDataURL(input.files[0]);
    }
}




//내 프로필 수정
$(document).ready(function(){
	//별명 중복 검사 - MainUserController에서 처리
	$('#nickname-confirm-btn').click(function(event){
		event.preventDefault();
		let userNickname = $('#userNickname').val();		
		  $.ajax({
			type: 'POST',
            url: '/nicknameconfirm',
            data: {
                userNickname:userNickname 
            },
            success: function(response){				
				if(response === 'success'){
					$('#nickname-confirm-result').text('사용 가능한 별명입니다.').css("color","#3b5f3e");
				/*}else if(response === 'same'){
					$('#nickname-confirm-result').text('기존 별명과 동일합니다.').css("color","#3b5f3e");*/
				}else{
					$('#nickname-confirm-result').text('사용 불가능한 별명입니다.').css("color","red");					
				}//else
			},
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}			
		}); //ajax
	});	//#nickname-confirm-btn.click
	//별명창에 포커스 갈때 별명 중복 확인창 비우기
	//$('#userNickname').focus(function(){
    //$('#nickname-confirm-result').text('');
//});
	
	//사용자 입력 정보 모두 받아오기
	$('#edit-my-profile-btn').click(function(){
		let profileImage = $('#file-upload').val();
		let userNickname = $('#userNickname').val();
        let userDistrictId = $('#userDistrict').val();
        let userRegionId = $('#userRegion').val();
        let profileIntro = $('#profileIntro').val();   
        
	      $.ajax({
				type: 'POST',
	            url: '/editmyprofile',
	            data: {   
					profileImage : profileImage,
	        		userNickname : userNickname,
	         		userDistrictId : userDistrictId,
	        		userRegionId : userRegionId,
	    			profileIntro  : profileIntro	    			
	            },
	            success: function(response){
					if(response === 'success'){
						alert("수정 성공");
					} else{
						console.log(response);					
					}//else
				},
				error: function(xhr,status, error){
					console.error('AJAX 요청 실패: ' + status, error);
				}			
			}); //ajax						
	}); //#edit-my-profile-btn.click	
});//ready



let openModifyPwModal = document.getElementById("open-modify-pw-btn");
let modifyPwModal = document.getElementById("modify-pw-modal");
let closeModifyPwModal = document.getElementById("modify-pw-modal-close");

openModifyPwModal.addEventListener('click', function(){
	modifyPwModal.style.display = "block";
})


closeModifyPwModal.addEventListener('click', function(){
	modifyPwModal.style.display = "none";
})




//비밀번호 수정 모달
$(document).ready(function(){
	$('#login-modal-button').click(function(){
		let userEmail = $('#userEmail').val();
        let userPw = $('#userPw').val();
        //alert(userEmail +":"+userPw);
        
        $.ajax({
			type: 'POST',
            url: '/main',
            data: {
                userEmail: userEmail,
                userPw: userPw
            },
            success: function(response){
				if(response === 'success'){
					window.location.href = "/mainLogin";
				} else{
					$('#errorMessage').text('아이디 혹은 비밀번호가 다릅니다.');
					$('#userPw').focus(function(){
			            $('#errorMessage').text('');
			        });
			        $('#userEmail').focus(function(){
			            $('#errorMessage').text('');
			        });
					$('.modal-close').click(function(){
						$('#errorMessage').text('');
					}); //modal-close
					$(window).click(function(event){
						if($(event.target).hasClass('modal')){
							$('#errorMessage').text('');
						}//if
					}); //window
				}//else
			},
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}			
		}); //ajax
	}); //login-modal-button	
});//ready


//비밀번호 수정 모달 내 - 비밀번호 보이고 숨기기
$('.password-input-container i').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye")
            .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa-regular fa-eye-slash")
            .prev('input').attr('type','password');
        }
        $('#modify-pw-modal-close').click(function(){
			$("#modify-pw-modal-original-userPw-confirm").text("");
			$("#modify-pw-modal-new-userPw-confirm-result").text("");
			$('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
	        $('.password-input-container input').attr('type', 'password')
		}); //modal-close
		$(window).click(function(event){
			if ($(event.target).hasClass('modal')) {
		        $("#modify-pw-modal-original-userPw-confirm").text("");
				$("#modify-pw-modal-new-userPw-confirm-result").text("");
		        $('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
		        $('.password-input-container input').attr('type', 'password');    
			}//if
		}); //window
    });//.password-input-container i
    
//비밀번호가 텍스트로 보이는 상태에서 input창에 커서를 놓으면 다시 비밀번호 형태로 자동 변환
$('.password-input-container input').on('focus', function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
               .attr('type', 'password');
        $(this).next('i').attr('class', "fa-regular fa-eye-slash");
    }
});//.password-input-container input
    
//비밀번호 수정 모달 내 - 비밀번호 일치 확인
 $("#modify-pw-modal-new-userPw-confirm").on("input", function() {
        let password = $("#modify-pw-modal-new-userPw").val();
        let confirmPassword = $(this).val();

        if (password === confirmPassword) {
            $("#modify-pw-modal-new-userPw-confirm-result").text("");
        } else {
            $("#modify-pw-modal-new-userPw-confirm-result").text("비밀번호가 일치하지 않습니다.").css("color", "red");
        }
        
        $('#modify-pw-modal-close').click(function(){
			$("#modify-pw-modal-new-userPw-confirm-result").text("");
		}); //modal-close
		
		$(window).click(function(event) {
			if ($(event.target).closest('#modify-pw-modal').length === 0) {       
		        $('#modify-pw-modal-original-userPw').val(''); 
		        $('#modify-pw-modal-new-userPw').val(''); 
		        $('#modify-pw-modal-new-userPw-confirm').val(''); 
		        $('#modify-pw-modal-original-userPw-confirm').text(''); 
		        $('#modify-pw-modal-new-userPw-confirm-result').text(''); 		    }
		});		
});//#email-signup-modal-userPw-confirm


//비밀번호 수정 모달 내 - 기존 비밀번호 확인
$(document).ready(function(){
	$('#modify-pw-modal-original-userPw').on("input", function(){
		let userPw = $(this).val();
		
		// 입력 필드가 비어있을 경우 메시지를 지우기
        if (userPw === '') {
            $('#modify-pw-modal-original-userPw-confirm').text('');
            return; // 입력 필드가 비어있으면 AJAX 요청을 보내지 않음
        }		
		
		$.ajax({
			type: 'POST',
			url: '/confirmpw',
			data: {
				userPw: userPw
			},
			success: function(response){
				if(response=== 'success'){
					$('#modify-pw-modal-original-userPw-confirm').text('');
				}else{
					$('#modify-pw-modal-original-userPw-confirm').text('비밀번호를 재확인해 주세요.');					
				}
			},//success
			error: function(xhr,status, error){
					console.error('AJAX 요청 실패: ' + status, error);
			}//error
		});//ajax		
	});//#modify-pw-modal-original-userPw.on	
});//ready

//비밀번호 수정 모달 내 - 새로운 비밀번호 업데이트
$(document).ready(function(){
	$('#modify-pw-modal-btn').click(function(){
		let userPw = $('#modify-pw-modal-original-userPw').val();
		let newPw = $('#modify-pw-modal-new-userPw').val();
		let newPwConfirm = $('#modify-pw-modal-new-userPw-confirm').val();
		
		const userPwReg = /^[0-9a-zA-Z!@#\$%]{4,16}$/;
		
		if(userPwReg.test(userPw) && newPw == newPwConfirm){			
				$.ajax({
					type: 'POST',
					url: '/updatenewpw',
					data: {
						newPw: newPw
					},
					success: function(response){
						if(response === 'success'){
							//모달창으로 바꾸기
							alert("비빌번호가 수정되었습니다.");
							$('#modify-pw-modal').css('display', 'none');
						}else{
							$('#modify-pw-modal-final-confirm-result').text('기존 비밀번호와 동일합니다.');
						}
					},//success
					error: function(xhr,status, error){
						console.error('AJAX 요청 실패: ' + status, error);
					}//error	
				});//ajax		
		}else{
			$('#modify-pw-modal-final-confirm-result').text('비밀번호를 재확인해 주세요.');			
		}		
	});//#modify-pw-modal-btn.click	
});//ready


//계정 삭제 모달
let openDeleteAccountModal = document.getElementById("open-delete-modal-btn");
let deleteAcoountModal = document.getElementById("delete-account-modal");
let closeDeleteAccountModal = document.getElementById("delete-account-modal-close");

openDeleteAccountModal.addEventListener('click',function(){
	deleteAcoountModal.style.display = 'block';
})


closeDeleteAccountModal.addEventListener('click', function(){
	deleteAcoountModal.style.display = "none";
})

/*
//계정 삭제 모달 내 - 비밀번호 보이고 숨기기 - 위와 같은 내용으로 충돌일어남 -> 클래스 이름등 조정 필요
$('.password-input-container i').on('click',function(){
	
	alert("clcick");
	
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye")
            .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa-regular fa-eye-slash")
            .prev('input').attr('type','password');
        }
        $('#delete-account-modal-close').click(function(){
			$("#delete-account-modal-pw-confirm").text("");
			$('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
	        $('.password-input-container input').attr('type', 'password')
		}); //modal-close
		$(window).click(function(event){
			if ($(event.target).hasClass('modal')) {
		        $("#delete-account-modal-pw-confirm").text("");
		        $('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
		        $('.password-input-container input').attr('type', 'password');    
			}//if
		}); //window
    });//.password-input-container i
    
//비밀번호가 텍스트로 보이는 상태에서 input창에 커서를 놓으면 다시 비밀번호 형태로 자동 변환
$('.password-input-container input').on('focus', function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
               .attr('type', 'password');
        $(this).next('i').attr('class', "fa-regular fa-eye-slash");
    }
});//.password-input-container input

*/

//계정 삭제 모달 
$(document).ready(function(){
	$('#delete-account-modal-btn').click(function(){
		let userPw = $('#delete-account-modal-userPw').val();		
		$.ajax({
			type: 'POST',
			url: '/deleteaccount',
			data: {
				userPw: userPw
			},
			success: function(response){
				if(response === 'success'){
					//모달창 추후 추가
					alert("계정이 삭제되었습니다.")
					window.location.href="/kkirikkiri";
				}else{
					$('#delete-account-modal-pw-confirm').text('비밀번호를 재확인해주세요.')
				}
			},//success
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}
		});//ajax		
	});//click	
});//ready































































