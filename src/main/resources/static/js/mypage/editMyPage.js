//지역정보 가져오기 - MainUserController에서 처리
$(document).ready(function() {
	
	let userOriginalRegion = $('#userRegion').val();
	let userOriginaldDistrict = $('#userDistrict').val();
	
    // 모든 지역 정보를 가져와서 "city" 셀렉트 박스에 추가
    $.ajax({
        url: '/regions',
        method: 'GET',
        success: function(data) {
            let citySelect = $('#userRegion');   
     
            // 기존 옵션 태그 내용 제거
            citySelect.find('option').remove();

            data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                .forEach(region => {
                    let isSelected = (region.regionName === userOriginalRegion) ? ' selected' : '';
                    citySelect.append('<option value="' + region.regionId + '"' + isSelected + '>' + region.regionName + '</option>');
                });

            //기존 사용자 지역에 대해 district를 자동 로드
            if (userOriginalRegion) {
                citySelect.val(data.find(region => region.regionName === userOriginalRegion).regionId).change();
            }
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

                data.forEach(function(district) {
                    let isSelected = (district.districtName === userOriginaldDistrict) ? ' selected' : '';
                    districtSelect.append('<option value="' + district.districtId + '"' + isSelected + '>' + district.districtName + '</option>');
                });
            },
            error: function(error) {
                console.log("Error fetching districts:", error);
            }
        });
    });
});


//내 프로필 사진 수정용 업로드
function loadFile(input) {
	let file = input.files[0];
    let uploadedImage = document.getElementById("edit-mypage-uploadedImage");

    if (file) {
        uploadedImage.src = URL.createObjectURL(file);
        uploadedImage.style.width = "300px";
        uploadedImage.style.height = "350px";
        //uploadedImage.style.objectFit = "cover";
    }
}

//내 프로필 수정
//글자 수 제한(별명, 자기소개)
document.addEventListener('DOMContentLoaded', function () {
		
	function updateCountNum(inputElement, maxLength, countElement, confirmElement, errorMessage){
		inputElement.addEventListener('input', function(){
			const currentLength = inputElement.value.length;
			const remainingLength = maxLength - currentLength-1;		
			
			countElement.textContent = remainingLength;		
			
			if(remainingLength < 0){
				confirmElement.textContent = errorMessage;
			}else{
				confirmElement.textContent = '';
			}
		});
	}//updateCountNum

	//별명 글자 제한
	const myPageNicknameInput = document.getElementById('userNickname');
    const myPageNicknameCount = document.getElementById('mypage-nickName-count-num');
    const myPageNicknameCountConfirm = document.getElementById('nickname-confirm-result');
    updateCountNum(myPageNicknameInput, 26, myPageNicknameCount, myPageNicknameCountConfirm, '최대 25자까지 입력 가능합니다.');
 
 	//자기소개 글자 수 제한
	const myPageProfileIntroInput = document.getElementById('profileIntro');
	const myPageProfileIntroCount = document.getElementById('mypage-profile-intro-count-num');
	const myPageProfileCountConfirm = document.getElementById('mypage-profile-intro-count-result');
	updateCountNum(myPageProfileIntroInput, 201, myPageProfileIntroCount, myPageProfileCountConfirm, '최대 200자까지 입력 가능합니다.');
});


$(document).ready(function(){
    // 별명 중복 검사 - MainUserController에서 처리
    $('#nickname-confirm-btn').click(function(event){
        event.preventDefault();
        let userNickname = $('#userNickname').val();
        
        if(userNickname == ''){
			$('#nickname-confirm-result').text('별명을 입력해 주세요.').css("color","red");
		}else{
	        $.ajax({
	            type: 'POST',
	            url: '/editmynickname',
	            data: {
	                userNickname: userNickname 
	            },
	            success: function(response){         
	                if(response === 'success'){
	                    $('#nickname-confirm-result').text('사용 가능한 별명입니다.').css("color","#3b5f3e");
	                } else if(response === 'same'){
	                    $('#nickname-confirm-result').text('기존 별명과 동일합니다.').css("color","#3b5f3e");
	                } else {
	                    $('#nickname-confirm-result').text('사용 불가능한 별명입니다.').css("color","red");                  
	                }
	            },
	            error: function(xhr, status, error){
	                console.error('AJAX 요청 실패: ' + status, error);
	            }           
	        }); // ajax			
		}//else        
    }); // #nickname-confirm-btn.click
    
    // 별명 창에 포커스 갈 때 별명 중복 확인 창 비우기
    $('#userNickname').focus(function(){
        $('#nickname-confirm-result').text('');
        $('#mypage-confirm-result-before-edit').text('');
    });
    
    // 사용자 입력 정보 모두 받아오기 
    $('#edit-my-profile-btn').click(function(){                
        let newProfileImage = $('#file-upload')[0].files[0];
        let originalProfileImage = $('#edit-mypage-uploadedImage').attr('src');
        let userNickname = $('#userNickname').val();
        let userDistrictId = $('#userDistrict').val();
        let userRegionId = $('#userRegion').val();
        let profileIntro = $('#profileIntro').val();
        
        let formData = new FormData();
        
        //프로필 이미지 기존/새로운 이미지 구분
        if(newProfileImage !== null && newProfileImage !== undefined){
            formData.append('profileImage', newProfileImage);
        } else {
            formData.append('profileImage', originalProfileImage);
        }
        
        //별명 사용자 입력 공백 검사
        if(userNickname == ''){
			$('#mypage-confirm-result-before-edit').text('별명 입력은 필수입니다.').css("color","red");
		}else{
			formData.append('userNickname', userNickname);
		}       
       
        formData.append('userDistrictId', userDistrictId);
        formData.append('userRegionId', userRegionId);
        formData.append('profileIntro', profileIntro);

        $.ajax({
            type: 'POST',
            url: '/editmyprofile',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {				
				try {
	                // JSON 응답을 파싱
	                let jsonResponse = JSON.parse(response);                    
	                      
	                if (jsonResponse.status === 'success') {
	                   //자바스크립트 변수를 jstl 형태로 보내기
	                   //console.log($("#uploadedImage").attr("src"));
	                   //$("#uploadedImage").attr("src", "/upload/"+jsonResponse.profileImage);
	                   $("#uploadedImage").attr("src", jsonResponse.profileImage);
	                   
					   //상단 검색창에 변경된 지역 업데이트
					   let regionSelect = $('#search-userRegion');
					   
					   //기존의 선택된 옵션을 제거
					   regionSelect.find('option').removeAttr('selected');
					
					   let userRegion = jsonResponse.userRegion;
					
					   //모든 옵션을 검사하여 일치하는 항목을 선택
					   regionSelect.find('option').each(function() {
					       if ($(this).text() === userRegion) {
					           $(this).attr('selected', 'selected');
					       }
					   });                
	                   
	                   $('#edit-my-profile-confirm-message-modal').css('display', 'block');
	                    
	                   setTimeout(function() {
	                       $('#edit-my-profile-confirm-message-modal').css('display', 'none');
	                   }, 1100);	   
	                }else {
	                    console.log("실패response:" + response);
	                }               
               } catch (e) {
                console.error('응답 파싱 실패:', e);
               }            
            },//success
            error: function(xhr, status, error) {
                console.error('AJAX 요청 실패: ' + status, error);
                console.error('응답 상태 코드: ' + xhr.status);
                console.error('응답 텍스트: ' + xhr.responseText);
            },//error
            cache: false
        }); // ajax
    }); // #edit-my-profile-btn.click
}); // ready


/*모달창 열고 닫기*/
let openModifyPwModal = document.getElementById("open-modify-pw-btn");
let modifyPwModal = document.getElementById("modify-pw-modal");
let closeModifyPwModal = document.getElementById("modify-pw-modal-close");

let openDeleteAccountModal = document.getElementById("open-delete-modal-btn");
let deleteAcoountModal = document.getElementById("delete-account-modal");
let closeDeleteAccountModal = document.getElementById("delete-account-modal-close");

function openModal(modal){
	modal.classList.remove('fade-out');
	modal.classList.add('fade-in');		
		
	modal.style.display = "block";
	document.body.classList.add('modal-open');	
	document.body.style.overflow = 'hidden';
}

function closeModal(modal){
	modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.style.display = "none";
        let inputs = modal.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = "";
        }
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
    }, 300);
}

window.addEventListener('click', (event) => {
		//모달창 열린 상태에서 윈도우 클릭시 닫히는 속도 늦추기 - 이메일 회원가입 모달창부터 재설정 필요        
        let target = event.target;
    	setTimeout(() => {
        if (target == modifyPwModal) {
            closeModal(modifyPwModal);
        }
        if (target == deleteAcoountModal) {
            closeModal(deleteAcoountModal);
        }
    }, 300);        
});

openModifyPwModal.addEventListener('click', ()=> openModal(modifyPwModal));
closeModifyPwModal.addEventListener('click', ()=> closeModal(modifyPwModal));
openDeleteAccountModal.addEventListener('click', ()=> openModal(deleteAcoountModal));
closeDeleteAccountModal.addEventListener('click', ()=> closeModal(deleteAcoountModal));


//비밀번호 수정 모달
//비밀번호 보이고 숨기기
$('.password-input-container-in-modify-modal i').on('click',function(){
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
			$('.password-input-container-in-modify-modal i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
	        $('.password-input-container-in-modify-modalr input').attr('type', 'password')
		}); //modal-close
		$(window).click(function(event){
			if ($(event.target).hasClass('modal')) {
		        $("#modify-pw-modal-original-userPw-confirm").text("");
				$("#modify-pw-modal-new-userPw-confirm-result").text("");
		        $('.password-input-container-in-modify-modal i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
		        $('.password-input-container-in-modify-modal input').attr('type', 'password');    
			}//if
		}); //window
    });//.password-input-container i
    
//비밀번호가 텍스트로 보이는 상태에서 input창에 커서를 놓으면 다시 비밀번호 형태로 자동 변환
$('.password-input-container-in-modify-modal input').on('focus', function() {
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


//기존 비밀번호 확인
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
					$('#modify-pw-modal-original-userPw-confirm').text('비밀번호를 재확인해 주세요.').css("color","red");					
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
							$('#modify-pw-confirm-message-modal').css('display','block');
							$('#modify-pw-modal').css('display', 'none');
						}else{
							$('#modify-pw-modal-final-confirm-result').text('기존 비밀번호와 동일합니다.').css("color","red");
						}
					},//success
					error: function(xhr,status, error){
						console.error('AJAX 요청 실패: ' + status, error);
					}//error	
				});//ajax		
		}else{
			$('#modify-pw-modal-final-confirm-result').text('비밀번호를 재확인해 주세요.').css("color","red");			
		}			
		$('#modify-pw-modal-close').click(function(){
			$("#modify-pw-modal-final-confirm-result").text("");
		}); //modal-close
		
		$(window).click(function(event) {
			if ($(event.target).closest('#modify-pw-modal').length === 0) {  	      
		        $('#modify-pw-modal-final-confirm-result').text(''); 
 		    }
		});//window.click			
	});//#modify-pw-modal-btn.click	
});//ready


//계정 삭제 모달 내 - 비밀번호 보이고 숨기기
$('.password-input-container-in-delete-account-modal i').on('click',function(){	
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
			$('.password-input-container-in-delete-account-modal i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
	        $('.password-input-container-in-delete-account-modal input').attr('type', 'password')
		}); //modal-close
		$(window).click(function(event){
			if ($(event.target).hasClass('modal')) {
		        $("#delete-account-modal-pw-confirm").text("");
		        $('.password-input-container-in-delete-account-modal i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
		        $('.password-input-container-in-delete-account-modal input').attr('type', 'password');    
			}//if
		}); //window
    });//.password-input-container i
    
//비밀번호가 텍스트로 보이는 상태에서 input창에 커서를 놓으면 다시 비밀번호 형태로 자동 변환
$('.password-input-container-in-delete-account-modal input').on('focus', function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
               .attr('type', 'password');
        $(this).next('i').attr('class', "fa-regular fa-eye-slash");
    }
});//.password-input-container input

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
					$('#delete-account-modal').css('display','none');
					$('#delete-account-confirm-message-modal').css('display','block');
				}else{
					$('#delete-account-modal-pw-confirm').text('비밀번호를 재확인해주세요.').css('color','red');
				}
			},//success
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}
		});//ajax	
		$('#delete-account-modal-close').click(function(){
			$("#delete-account-modal-pw-confirm").text("");
			}); //modal-close
		
		$(window).click(function(event) {
			if ($(event.target).closest('#delete-account-modal').length === 0) {  	      
		        $('#delete-account-modal-pw-confirm').text(''); 
 		    }
		});//window.click	
		
		$('#delete-account-modal-userPw').focus(function() {
            $('#delete-account-modal-pw-confirm').text('');
        });
	});//click	
});//ready

