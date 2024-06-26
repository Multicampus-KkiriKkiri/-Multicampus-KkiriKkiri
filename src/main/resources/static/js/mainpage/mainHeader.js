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

//'회원가입' 누른 후 내정보설정 모달창
let finalSignupButton = document.getElementById("open-signup-set-myprofile-modal");
let signupSetMyProfileModal = document.getElementById("signup-set-myprofile-modal");
let signupSetMyProfileModalClose = signupSetMyProfileModal.getElementsByClassName("modal-close")[0];

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
	closeModal2(emailSignupModal);
	openModal2(signupSetMyProfileModal);
});
signupSetMyProfileModalClose.addEventListener('click', () => closeModal2(signupSetMyProfileModal));
*/
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
        if (event.target === signupSetMyProfileModal) {
            closeModal2(signupSetMyProfileModal);
        }
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
        
        const userEmailReg = /^[0-9a-zA-Z!@#\$%]{4,16}$/;
        const userPwReg = /^[0-9A-Za-z]{1,}@[0-9A-Za-z]{1,8}(.com|.net|.ac.kr)$/;
        
        if(userEmailReg.test(userEmail) && userPwReg.test(userPw)){
	        $.ajax({
				type: 'POST',
	            url: '/signup',
	            data: {
	                userEmail: userEmail,
	                userPw: userPw
	            },
	            success: function(response){
					if(response === 'success'){
						window.location.href = "/signup";
						
					    //모달 창 보이기
			            $('#signup-set-myprofile-modal').modal('show');      
					
					} else{
						$('#email-signup-modal-form-result').text('이메일 혹은 비밀번호를 재확인해주세요.');
						$('.modal-close').click(function(){
							$('#errorMessage#email-signup-modal-form-result').text('');
						}); //modal-close
						$(window).click(function(event){
							if($(event.target).hasClass('modal')){
								$('#errorMessage#email-signup-modal-form-result').text('');
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
			$('#email-signup-modal-form-result').text('이메일 혹은 비밀번호를 재확인해주세요.');
		}
		
		
		
	}); //login-modal-button	
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

