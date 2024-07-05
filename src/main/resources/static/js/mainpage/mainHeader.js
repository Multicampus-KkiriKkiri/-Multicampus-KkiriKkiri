//mainHeader.jsp
//상단바 로그인, 회원가입 버튼 누를 시 모달창 + 이메일로 회원 가입 모달창 + 회원가입 버튼 누른 후 내정보설정 모달창
let loginButton = document.getElementById("login-button");
let signupButton = document.getElementById("signup-button");
let loginModal = document.getElementById("login-modal");
let signupModal = document.getElementById("signup-modal");
let loginModalClose = loginModal.getElementsByClassName("modal-close")[0];
let signupModalClose = signupModal.getElementsByClassName("modal-close")[0];

//'이메일로 회원가입' 누를 시 넘어가는 모달창
let emailSignupButton = document.getElementById("open-email-signup-modal");
let emailSignupModal = document.getElementById("email-signup-modal");
let emailSignupModalClose = emailSignupModal.getElementsByClassName("modal-close")[0];





/*
//'회원가입' 누른 후 내정보설정 모달창
let finalSignupButton = document.getElementById("open-signup-set-myprofile-modal");
let signupSetMyProfileModal = document.getElementById("signup-set-myprofile-modal");
let signupSetMyProfileModalClose = signupSetMyProfileModal.getElementsByClassName("modal-close")[0];
*/





//회원가입 내정보설정 모달 내 프로필 사진 업로드
let signupMyprofileShowImg = document.getElementById("signup-myprofile-show-img");
let fileUploadInput = document.getElementById("file-upload");

function openModal(modal){
	modal.classList.remove('fade-out');
	modal.classList.add('fade-in');		
		
	modal.style.display = "block";
	document.body.classList.add('modal-open');
}

function openModal2(modal){
	modal.classList.remove('fade-out');
	modal.classList.add('fade-in');		
		
	modal.style.display = "block";
	document.body.classList.add('modal-open2');
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
    }, 300);
}

function closeModal2(modal){
	modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.style.display = "none";
        let inputs = modal.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = "";
        }      
        
        //회원가입 내정보설정 모달 내 프로필 사진 업로드 초기화
        fileUploadInput.value = ""; 
        signupMyprofileShowImg.innerHTML = "";
              
        document.body.classList.remove('modal-open2'); 
        //document.body.style.overflow = 'auto';          
    }, 300);
}

loginButton.addEventListener('click', ()=> openModal(loginModal));
signupButton.addEventListener('click', ()=> openModal(signupModal));
loginModalClose.addEventListener('click', ()=> closeModal(loginModal));
signupModalClose.addEventListener('click', ()=> closeModal(signupModal));

//'이메일로 회원가입' 누를 시 넘어가는 모달창
emailSignupButton.addEventListener('click', () => {
    closeModal2(signupModal);
    openModal2(emailSignupModal);
});
emailSignupModalClose.addEventListener('click', () => closeModal2(emailSignupModal));










/*
//'회원가입' 누른 후 내정보설정 모달창

finalSignupButton.addEventListener('click', ()=>{
	
	/*
	let userEmail = $('#email-signup-modal-userEmail').val();
    let userPw = $('#email-signup-modal-userPw').val();
	let warningMessage = document.querySelectorAll('.warning').innerHTML;
	
	
    if (userEmail.trim() === '' || userPw.trim() === '' || warningMessage !== '') {
        // 입력이 비어있으면 클릭 이벤트 무시
        return;
    }
   
		
	closeModal2(emailSignupModal);
	openModal2(signupSetMyProfileModal);
	
	
});
 */

//signupSetMyProfileModalClose.addEventListener('click', () => closeModal2(signupSetMyProfileModal));

window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            closeModal(loginModal);
        }
        if (event.target == signupModal) {
            closeModal(signupModal);
        }
        if (event.target == emailSignupModal) {
            closeModal(emailSignupModal);
        }
        /*
        if (event.target === signupSetMyProfileModal) {
            closeModal2(signupSetMyProfileModal);
        }*/
});

















//회원가입 내정보설정 모달 내 프로필 사진 업로드
function loadFile(input){
	let file = input.files[0];
	let newSignupProfileImg = document.createElement("img");
	
	newSignupProfileImg.src = URL.createObjectURL(file);
	newSignupProfileImg.id = "img-id";
	newSignupProfileImg.style.width = "100%";
	newSignupProfileImg.style.height = "100%";
	newSignupProfileImg.style.objectFit = "cover";	
	
	signupMyprofileShowImg.innerHTML = ""; 
	signupMyprofileShowImg.appendChild(newSignupProfileImg);	
}

//로그인 모달창 - 로그인 기능 구현
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


//이메일 회원가입 모달 내 - 비밀번호 보이고 숨기기
$('.password-input-container i').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye")
            .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa-regular fa-eye-slash")
            .prev('input').attr('type','password');
        }
        $('.modal-close').click(function(){
			$("#email-signup-modal-userPw-confirm-result").text("");
			$('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
	        $('.password-input-container input').attr('type', 'password')
		}); //modal-close
		$(window).click(function(event){
			if ($(event.target).hasClass('modal')) {
		        $("#email-signup-modal-userPw-confirm-result").text("");
		        $('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
		        $('.password-input-container input').attr('type', 'password');    
			}//if
		}); //window
    });

//이메일 회원가입 모달 내 - 비밀번호 일치 확인
 $("#email-signup-modal-userPw-confirm").on("input", function() {
        let password = $("#email-signup-modal-userPw").val();
        let confirmPassword = $(this).val();

        if (password === confirmPassword) {
            $("#email-signup-modal-userPw-confirm-result").text("");
        } else {
            $("#email-signup-modal-userPw-confirm-result").text("비밀번호가 일치하지 않습니다.").css("color", "red");
        }
        $('.modal-close').click(function(){
			$("#email-signup-modal-userPw-confirm-result").text("");
		}); //modal-close
		$(window).click(function(event){
			if($(event.target).hasClass('modal')){
				$("#email-signup-modal-userPw-confirm-result").text("");
			}//if
		}); //window
});

//이메일 회원가입 모달창
$(document).ready(function(){
	$('#open-signup-set-myprofile-modal').click(function(){
		let userEmail = $('#email-signup-modal-userEmail').val();
        let userPw = $('#email-signup-modal-userPw').val();
        //alert(userEmail +":"+userPw);    
        
        //이메일, 비밀번호 정규식 검사
        const userEmailReg = /^[0-9A-Za-z]{1,}@[0-9A-Za-z]{1,8}(.com|.net|.ac.kr)$/;
        const userPwReg = /^[0-9a-zA-Z!@#\$%]{4,16}$/; 
        
        //나이 체크박스
		//const ageCheckbox = $('#age-check-box');
        $('#age-check-box').click(function(){
	        if (!ageCheckbox.prop('checked')) {
	            $('#age-check-box-result').text('나이를 확인해주세요.').css("color", "red");
	            return; 
	        }else{				
				$('#age-check-box-result').text('');							
	        } //else
        }); //click - function
        
        $('.modal-close').click(function(){
			$('#age-check-box-result').text('');
			$('#email-signup-modal-form-result').text('');
			$('#age-check-box').prop('checked', false);
		}); //modal-close
		$(window).click(function(event){
			if($(event.target).hasClass('modal')){
				$('#age-check-box-result').text('');
				$('#email-signup-modal-form-result').text('');
				$('#age-check-box').prop('checked', false);
			}//if
		}); //window  
            
       // alert(userEmailReg.test(userEmail));
       // alert(userPwReg.test(userPw));
        
        if(userEmailReg.test(userEmail) && userPwReg.test(userPw)){
			//$('#email-signup-modal-form-result').text('ajax 요청가능')
	        $.ajax({
				type: 'POST',
	            url: '/signup',
	            data: {
	                userEmail: userEmail,
	                userPw: userPw
	            },
	            success: function(response){
					//alert(response);
					if(response === 'success'){
						//window.location.href = "/signup";	현재 페이지에 있으면 되기 때문에 필요없음					
						
						
						$('#email-signup-modal').modal('hide');
						$('#signup-set-myprofile-modal').modal('show');
						
						
						
						
						/*
						//ajax와 부트스트랩 충돌로 작동 안됨 -> js 위쪽에 따로 구현
					    //'내 정보 설정' 모달창 보이기
					    //alert("success");  
					    //$('#email-signup-modal').modal('hide');
			            //$('#signup-set-myprofile-modal').modal('show');        
			             // window 클릭 시 모달 닫기
					    $(window).click(function(event) {
					        if ($(event.target).hasClass('modal')) {
					            $('#login-modal').modal('hide');
					        }
					    });
					
					    // 모달 내 닫기 버튼 클릭 시 모달 닫기
					    $('.modal-close').click(function() {
					        $('#login-modal').modal('hide');
					    });
			            */       
				
					} else{
						//alert("fail"); 
						$('#email-signup-modal-userEmail-confirm').text('이미 가입된 이메일입니다.').css('color','red');
						
						/*
						$('#email-signup-modal-userEmail').focus(function() {
					        $('#email-signup-modal-userEmail').val(''); 
					        $('#email-signup-modal-userEmail-confirm').text(''); 
					        
					        $('#email-signup-modal-userPw').val(''); 
					        $('#email-signup-modal-userPw-confirm').val(''); 
					        
					        
					    });
						*/
						
						$('.modal-close').click(function(){
							$('#email-signup-modal-userEmail-confirm').text('');
						}); //modal-close
						$(window).click(function(event){
							if($(event.target).hasClass('modal')){
								$('#email-signup-modal-userEmail-confirm').text('');
							}//if
						}); //window
					}//else
				},
				error: function(xhr,status, error){
					console.error('AJAX 요청 실패: ' + status, error);
				}			
			}); //ajax
		}//if
		else{
			$('#email-signup-modal-form-result').text('이메일 또는 비밀번호를 재확인해주세요.').css("color", "red");
			$('.modal-close').click(function(){
						$('#email-signup-modal-form-result').text('');
			}); //modal-close
			$(window).click(function(event){
				if($(event.target).hasClass('modal')){
					$('#email-signup-modal-form-result').text('');
				}//if
			}); //window
		}//else		    
	}); //login-modal-button	
});//ready


//내정보 설정 모달 내 - 지역정보 가져오기
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


//회원가입 직후 내정보 설정 모달 내
$(document).ready(function(){
	//별명 중복 검사
	$('#nickname-confirm-btn').click(function(){
		//alert("중복검사시");
		let userNickname = $('#userNickname').val();
		//alert(userNickname);
		  $.ajax({
			type: 'POST',
            url: '/nicknameconfirm',
            data: {
                userNickname:userNickname 
            },
            success: function(response){				
				if(response == 'success'){
					//alert('올바르다');
					$('#nickname-confirm-result').text('사용 가능한 별명입니다.').css("color","#3b5f3e");
				} else{
					$('#nickname-confirm-result').text('사용 불가능한 별명입니다.').css("color","red");					
				}//else
			},
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}			
		}); //ajax
	});	//#nickname-confirm-btn.click
	
	//사용자 입력 정보 모두 받아오기
	$('#signup-set-myprofile-modal-btn').click(function(){
		let profileImage = $('#file-upload').val();
        let userNickname = $('#userNickname').val();
        let userDistrictId = $('#userDistrict').val();
        let userRegionId = $('#userRegion').val();
        let profileIntro = $('#profileIntro').val();
        let interests = [];
        
        //관심사 항목 체크되는 것들만 배열로 저장
        $("input:checked").each(function(){
			interests.push($(this).val())
		});        
        //alert(interests);
        
        $.ajax({
			type: 'POST',
            url: '/signupprofile',
            data: {   
				profileImage : profileImage,
        		userNickname : userNickname,
         		userDistrictId : userDistrictId,
        		userRegionId : userRegionId,
    			profileIntro  : profileIntro,
             	interests : interests
            },
            success: function(response){
				if(response === 'success'){
					window.location.href = "/mainLogin";
				} else{
					alert(response);
					$('#signup-set-myprofile-result').text("'사진 업로드'와 '내 소개'를 제외한 모든 정보를 입력해주세요.");
					$(window).click(function(event){
						if($(event.target).hasClass('modal')){
							$('#signup-set-myprofile-result').text('');							
						}//if
					}); //window
				}//else
			},
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}			
		}); //ajax
	}); //#signup-set-myprofile-modal-btn.click	
});//ready



























/*
//카카오톡 로그인
Kakao.init('484a99e3aad2bffe282526dfe5263856'); //발급받은 키 중 javascript키를 사용
console.log(Kakao.isInitialized()); // sdk초기화여부판단
function kakaoLogin() {
    Kakao.Auth.login({
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
        	  console.log(response)
          },
          fail: function (error) {
            console.log(error)
          },
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }  

//구글 로그인 
//처음 실행하는 함수
function init() {
	gapi.load('auth2', function() {
		gapi.auth2.init();
		options = new gapi.auth2.SigninOptionsBuilder();
		options.setPrompt('select_account');
        // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
		options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
        // 인스턴스의 함수 호출 - element에 로그인 기능 추가
        // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
		gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
	})
}

function onSignIn(googleUser) {
	var access_token = googleUser.getAuthResponse().access_token
	$.ajax({
    	// people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
		url: 'https://people.googleapis.com/v1/people/me'
        // key=API 키
		, data: {personFields:'birthdays', key:'AIzaSyDjLnl1d8zphnvq1OTfG3bVBhIfh1HbR_g', 'access_token': access_token}
		, method:'GET'
	})
	.done(function(e){
        //프로필을 가져온다.
		var profile = googleUser.getBasicProfile();
		console.log(profile)
	})
	.fail(function(e){
		console.log(e);
	})
}
function onSignInFailure(t){		
	console.log(t);
}

*/
