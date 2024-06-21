//mainHeader.jsp
//상단바 로그인, 회원가입 버튼 누를 시 모달창 열고 닫기
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

function openModal(modal){
	modal.classList.remove('fade-out');
	modal.classList.add('fade-in');		
		
	modal.style.display = "block";
	document.body.classList.add('modal-open');
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

loginButton.addEventListener('click', ()=> openModal(loginModal));
signupButton.addEventListener('click', ()=> openModal(signupModal));
loginModalClose.addEventListener('click', ()=> closeModal(loginModal));
signupModalClose.addEventListener('click', ()=> closeModal(signupModal));

//'이메일로 회원가입' 누를 시 넘어가는 모달창
emailSignupButton.addEventListener('click', () => {
    closeModal(signupModal);
    openModal(emailSignupModal);
});
emailSignupModalClose.addEventListener('click', () => closeModal(emailSignupModal));

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
});

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







 function togglePasswordVisibility() {
            var passwordInput = document.getElementById('passwordInput');
            var icon = document.querySelector('.toggle-password');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        }























