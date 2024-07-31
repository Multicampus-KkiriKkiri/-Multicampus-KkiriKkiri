//mainHeader.jsp
//지역정보 가져오기 - MainUserController에서 처리
$(document).ready(function() {
    // 모든 지역 정보를 가져와서 "city" 셀렉트 박스에 추가
    $.ajax({
        url: '/regions',
        method: 'GET',
        success: function(data) {
            let citySelect = $('#search-userRegion'); 
            
            //'대한민국 전체' 옵션 추가
            citySelect.append('<option value="0">대한민국 전체</option>');
            
            // 첫 번째 옵션(공백) 삭제
            citySelect.find('option:first').remove();

            data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                .forEach(region => {                    
                    citySelect.append('<option value="' + region.regionId + '"' + '>' + region.regionName + '</option>');
                });                    
        },
        error: function(error) {
            console.log("Error fetching regions:", error);
        }
    });//ajax
});//ready 

//상단바 로그인, 회원가입 버튼 누를 시 모달창
let loginButton = document.getElementById("login-button");
let signupButton = document.getElementById("signup-button");
let loginModal = document.getElementById("login-modal");
let signupModal = document.getElementById("signup-modal");
let loginModalClose = document.getElementById("login-modal-close");
let signupModalClose = document.getElementById("signup-modal-close");
let createAccountBtn = document.getElementById("creat-account-btn");
let openLoginModal1 = document.getElementById("open-login-modal1");
let openLoginModal2 = document.getElementById("open-login-modal2");
let emailSignupModal = document.getElementById("email-signup-modal");
//let signupModalClose = signupModal.getElementsByClassName("modal-close")[0];
let loginModalButton = document.getElementById("login-modal-button");
let modalOverlay = document.getElementById("modal-overlay");

function openModal(modal){
	modal.classList.remove('fade-out');
	modal.classList.add('fade-in');			
	modal.style.display = "block";
	document.body.classList.add('modal-open');	
	document.body.style.overflow = 'hidden'; //위 코드와 중복 -> 필요함	
	
	//상단 고정바 로그인, 회원가입 버튼 클릭 시 비활성화 시키기
	modalOverlay.style.display = "block"; 
    document.querySelector('header').classList.add('disabled'); 
    document.querySelector('form').classList.add('disabled'); // 폼 비활성화	
}


//헤더 활성화 시킬시 애니메이션 없애기 추가
function closeModal(modal) {
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
    
    // 모달의 애니메이션이 완료된 후에 헤더와 폼의 상태를 변경
    modal.addEventListener('animationend', () => {
        modal.style.display = "none";
        let inputs = modal.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = "";
        }

        // 모든 모달이 닫힐 때 스크롤 복구
        if (![loginModal, signupModal, emailSignupModal].some(m => m.style.display === "block")) {
            document.body.style.overflow = 'auto';
            modalOverlay.style.display = "none";
            document.querySelector('header').classList.remove('disabled'); // 헤더 활성화
            document.querySelector('form').classList.remove('disabled'); // 폼 활성화
        }        
    }, { once: true }); // 한번만 이벤트 리스너 실행
}

loginButton.addEventListener('click', ()=> openModal(loginModal));
signupButton.addEventListener('click', ()=> openModal(signupModal));
loginModalClose.addEventListener('click', ()=> closeModal(loginModal));
signupModalClose.addEventListener('click', ()=> closeModal(signupModal));

createAccountBtn.addEventListener('click', ()=> {
    openModal(signupModal);
    closeModal(loginModal);
});

openLoginModal1.addEventListener('click', ()=> {
    openModal(loginModal);
    closeModal(signupModal);
});

openLoginModal2.addEventListener('click', ()=> {
    openModal(loginModal);
    closeModal(emailSignupModal);
});

//'이메일로 회원가입' 누를 시 넘어가는 모달창  
let openEmailSignupModal = document.getElementById("open-email-signup-modal");
openEmailSignupModal.addEventListener ('click', ()=> {
	openModal(emailSignupModal);
	closeModal(signupModal);
});

/*
//'이메일로 회원가입' 누를 시 넘어가는 모달창 
//- js로 한 코드가 안될 경우 이 코드 사용 + openLoginModal2.addEventListener 삭제
$('#open-email-signup-modal').click(function(){	
	$('#signup-modal').css('display', 'none');	
	$('#email-signup-modal').css('display', 'block');
	$('body').css('overflow', 'hidden');	
}); //#open-email-signup-modal click 
*/

window.addEventListener('click', (event) => {        
        let target = event.target;
    	//setTimeout(() => {
        if (target == loginModal) {
            closeModal(loginModal);
        }
        if (target == signupModal) {
            closeModal(signupModal);
        }
    //}, 3000);//기존 모달 닫히는 속도 늦추는 코드 - 상단 오버레이 생기면서 삭제 
});

// 로그인 버튼 Enter 키 입력 
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        loginModalButton.click();
    }
}

let emailInput = document.getElementById("userEmail");
let passwordInput = document.getElementById("userPw");

emailInput.addEventListener('keydown', handleEnterKey);
passwordInput.addEventListener('keydown', handleEnterKey);


//로그인 모달창 - 로그인 기능 구현
$(document).ready(function(){
	$('#login-modal-button').click(function(){
		let userEmail = $('#userEmail').val();
        let userPw = $('#userPw').val();
        //로그인 바로 직전 페이지 저장
        let redirectUrl = encodeURIComponent(window.location.href);
        
        $.ajax({
			type: 'POST',
            url: '/main',
            data: {
                userEmail: userEmail,
                userPw: userPw,
                redirectUrl: redirectUrl
            },
            success: function(response){
				if(response === 'success'){					
					// 현재 URL에서 '/kkirikkiri'를 비교
                    let currentPath = window.location.pathname; // URL 경로만 추출
                    if (currentPath === '/kkirikkiri') {
                        window.location.href = '/mainLogin';
                    } else {
                        // 다른 URL일 경우 저장된 원래 페이지로 리다이렉트
                        window.location.href = decodeURIComponent(redirectUrl);
                    }
				} else{
					$('#errorMessage').text('아이디 혹은 비밀번호가 다릅니다.');
				}//else
			},
			error: function(xhr,status, error){
				console.error('AJAX 요청 실패: ' + status, error);
			}			
		}); //ajax
	}); //login-modal-button	
	
	// 입력 필드에 마우스 클릭 또는 키보드 입력 생길 시 오류 메시지 제거
    $('#userEmail, #userPw').on('input focus', function() {
        $('#errorMessage').text('');
    });
    // 모달 닫기 버튼 클릭 시 오류 메시지 제거
    $('.modal-close').click(function(){
        $('#errorMessage').text('');
    });
    // 모달 외부 클릭 시 오류 메시지 제거
    $(window).click(function(event){
        if($(event.target).hasClass('modal')){
            $('#errorMessage').text('');
        }
    }); 	
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
});//.password-input-container i
    
//이메일 회원가입 모달 닫을 때 비밀번호 입력 내용 없애기
$('#email-signup-modal-close').click(function(){
	$("#email-signup-modal-userPw-confirm-result").text("");
	$('#email-signup-modal-userPw').val(''); 
    $('#email-signup-modal-userPw-confirm').val(''); 
	$('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
    $('.password-input-container input').attr('type', 'password')
    
    //상단 고정바 활성화
    $('header').removeClass('disabled');
    $('form').removeClass('disabled');
});//modal-close

$(window).click(function(event){
	if ($(event.target).hasClass('modal')) {
        $("#email-signup-modal-userPw-confirm-result").text("");
        $('#email-signup-modal-userPw').val(''); 
    	$('#email-signup-modal-userPw-confirm').val('');
        $('.password-input-container i').removeClass('fa fa-eye').addClass('fa-regular fa-eye-slash');
        $('.password-input-container input').attr('type', 'password'); 
        
        //상단 고정바 활성화
   		$('header').removeClass('disabled');
   		$('form').removeClass('disabled');   
	}//if
});//window

//비밀번호가 텍스트로 보이는 상태에서 input창에 커서를 놓으면 다시 비밀번호 형태로 자동 변환
$('.password-input-container input').on('focus', function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
               .attr('type', 'password');
        $(this).next('i').attr('class', "fa-regular fa-eye-slash");
    }
});//.password-input-container input
		

//이메일 회원가입 모달 내 - 비밀번호 일치 확인
 $("#email-signup-modal-userPw-confirm").on("input", function() {
        let password = $("#email-signup-modal-userPw").val();
        let confirmPassword = $(this).val();

        if (password === confirmPassword) {
            $("#email-signup-modal-userPw-confirm-result").text("");
        } else {
            $("#email-signup-modal-userPw-confirm-result").text("비밀번호가 일치하지 않습니다.").css("color", "red");
        }
        
        $('#email-signup-modal-close').click(function(){
			$("#email-signup-modal-userPw-confirm-result").text("");	
		}); //modal-close
		
		$(window).click(function(event) {
			if ($(event.target).closest('#email-signup-modal').length === 0) {       
		        $('#email-signup-modal-userEmail').val(''); 
		        $('#email-signup-modal-userPw').val(''); 
		        $('#email-signup-modal-userPw-confirm').val(''); 
		        $('#email-signup-modal-userEmail-confirm').text(''); 
		        $('#email-signup-modal-userPw-confirm-result').text(''); 
		        $('#age-check-box-result').text(''); 		
		        
		        if ($('#age-check-box').is(':checked')) {
		            $('#age-check-box').prop('checked', false); 
		        }
		    }
		});		
});//#email-signup-modal-userPw-confirm

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
		const ageCheckbox = $('#age-check-box');		
		 if (!ageCheckbox.is(':checked')) {
            $('#age-check-box-result').text('나이를 확인해주세요.').css("color", "red");
            return; 
        }
          
       // alert(userEmailReg.test(userEmail));
       // alert(userPwReg.test(userPw));
        
        if(userEmailReg.test(userEmail) && userPwReg.test(userPw)){
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
						$('#email-signup-modal').css('display', 'none');	
						$('#signup-set-myprofile-modal').css('display', 'block');
						disableScroll();			
					} else{ 
						$('#email-signup-modal-userEmail-confirm').text('이미 가입된 이메일입니다.').css('color','red');
						$('#email-signup-modal-userEmail').focus(function(){
							$('#email-signup-modal-userEmail-confirm').text('');
						});//focus function
						
						$('#email-signup-modal-close').click(function(){
							$('input').val('');
						})
						$(window).click(function(event) {
						    if (!$(event.target).closest('#email-signup-modal').length) {
						        $('input').val('');
						    }
						});	
					}//else
				}, //success
				error: function(xhr,status, error){
					console.error('AJAX 요청 실패: ' + status, error);
				}			
			}); //ajax
		}//if
		else{
			$('#email-signup-modal-form-result').text('이메일 또는 비밀번호를 재확인해주세요.').css("color", "red");
			$('#email-signup-modal-form input').focus(function() {
			    $('#email-signup-modal-form-result').text('');
			});
		}//else		    
	});//login-modal-button	
	
	// 나이 체크박스 클릭 이벤트 - 위쪽에 두면 작동안함
    $('#age-check-box').click(function(){
        if (!$(this).is(':checked')) {
            $('#age-check-box-result').text('나이를 확인해주세요.').css("color", "red");
        } else {
            $('#age-check-box-result').text('');
        }
    });	
});//ready

//이메일 회원가입 모달창 닫기
$('#email-signup-modal-close').click(function(){
						$('#email-signup-modal-form-result').text('');
						$('#email-signup-modal').css('display', 'none');	
						$('.modal-backdrop').remove(); // backdrop 제거 - 작동이 안되는 것 같음	
						$('body').css('overflow', 'auto'); // body 스크롤 복구
}); //modal-close
$(window).click(function(event){
	if($(event.target).hasClass('modal')){
		$('#email-signup-modal-form-result').text('');
		$('#email-signup-modal').css('display', 'none');	
		$('.modal-backdrop').remove(); // backdrop 제거 - 작동이 안되는 것 같음	
		$('body').css('overflow', 'auto'); // body 스크롤 복구
	}//if
}); //window

// 스크롤 비활성화 함수
function disableScroll() {
    $('body').css({
        'overflow': 'hidden',
        'position': 'fixed',
        'width': '100%'
    });
}


//내정보 설정 모달 내 - 지역정보 가져오기
$(document).ready(function() {
            // 모든 지역 정보를 가져와서 "city" 셀렉트 박스에 추가
            $.ajax({
                url: '/regions',
                method: 'GET',
                success: function(data) {
                    let citySelect = $('#userRegion');
                    data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
		                .forEach(region => {
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
                        districtSelect.append('<option value="" readOnly selected>구/동 선택</option>');
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

//회원가입 내정보설정 모달 내 프로필 사진 업로드
function loadFile(input){
	let file = input.files[0];
	let newSignupProfileImg = document.createElement("img");
	
	newSignupProfileImg.src = URL.createObjectURL(file);
	newSignupProfileImg.id = "img-id";
	newSignupProfileImg.style.width = "100%";
	newSignupProfileImg.style.height = "100%";
	newSignupProfileImg.style.objectFit = "cover";	
	
	//추가된부분
	let signupMyprofileShowImg = document.getElementById("signup-myprofile-show-img");
	
	signupMyprofileShowImg.innerHTML = ""; 
	signupMyprofileShowImg.appendChild(newSignupProfileImg);	
}

//회원가입 직후 내정보 설정 모달 내
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
	const signupUserNicknameInput = document.getElementById('userNickname');
    const signupNicknameCount = document.getElementById('signup-nickName-count-number');
    const nicknameCountConfirm = document.getElementById('nickname-count-confirm-result');
    updateCountNum(signupUserNicknameInput, 26, signupNicknameCount, nicknameCountConfirm, '최대 25자까지 입력 가능합니다.');
 
 	//자기소개 글자 수 제한
	const signupProfileIntroInput = document.getElementById('profileIntro');
	const signupProfileIntroCount = document.getElementById('signup-profile-intro-count-num');
	const signupProfileCountConfirm = document.getElementById('signup-profile-intro-count-result');
	updateCountNum(signupProfileIntroInput, 201, signupProfileIntroCount, signupProfileCountConfirm, '최대 200자까지 입력 가능합니다.');
});

$(document).ready(function(){
    // 별명 중복 검사
    $('#nickname-confirm-btn').click(function(event){
        event.preventDefault();
        let userNickname = $('#userNickname').val();      
        
        if(userNickname == ''){
			$('#nickname-confirm-result').text('별명을 입력해 주세요.').css("color","red");
		}else{	
	        $.ajax({
	            type: 'POST',
	            url: '/nicknameconfirm',
	            data: {
	                userNickname: userNickname 
	            },
	            success: function(response){ 
					
					console.log("response: ", response);
					               
	                if(response === 'success'){
	                    $('#nickname-confirm-result').text('사용 가능한 별명입니다.').css("color","#3b5f3e");
	                } else {
	                    $('#nickname-confirm-result').text('사용 불가능한 별명입니다.').css("color","red");                    
	                }
	            },
	            error: function(xhr, status, error){
	                console.error('AJAX 요청 실패: ' + status, error);
	            }           
	        }); // ajax			
		}//else       
    });// #nickname-confirm-btn.click
    
    // 별명창에 포커스 갈 때 별명 중복 확인창 비우기
    $('#userNickname').focus(function(){
        $('#nickname-confirm-result').text('');
    });  
    
    // 사용자 입력 정보 모두 받아오기
    $('#signup-set-myprofile-modal-btn').click(function(){
        let fileInput = $('#file-upload')[0]; // 파일 업로드 input element
        let formData = new FormData(); 
        
        // FormData에 데이터 추가
        formData.append('profileImage', fileInput.files[0]); 
        formData.append('userNickname', $('#userNickname').val()); 
        formData.append('userDistrictId', $('#userDistrict').val()); 
        formData.append('userRegionId', $('#userRegion').val()); 
        formData.append('profileIntro', $('#profileIntro').val()); 
        
        let interests = [];
        // 관심사 항목 체크된 것들만 배열로 저장
        $("input:checked").each(function(){
            interests.push($(this).val());
        });
        formData.append('interests', interests);       
   
        // 유효성 검사 - 필수 입력 항목 체크
        if(formData.get('userNickname') !== '' && interests.length !== 0 && formData.get('userRegionId') !== '' && formData.get('userDistrictId') !== ''){
            $.ajax({
                type: 'POST',
                url: '/signupprofile',
                data: formData,
                processData: false,
                contentType: false,
                enctype: 'multipart/form-data', // 필요에 따라 설정
                success: function(response){
                    if(response === 'success'){
						$('#signup-set-myprofile-result').html("회원가입 성공! 메인페이지로 이동합니다. <br>로그인해 주세요.")
                                                 .css("color", "#3b5f3e");
						setTimeout(function() {
                        	window.location.href = "/kkirikkiri";		    
		                }, 2000);
                    } else {
                        console.log(response);                    
                    }
                },
                error: function(xhr, status, error){
                    console.error('AJAX 요청 실패: ' + status, error);
                    console.error(xhr.status +":"+ xhr.responseText);
                }           
            }); // ajax        
        } else {
            $('#signup-set-myprofile-result').text("사진 업로드와 내 소개를 제외한 모든 정보를 입력해주세요.").css("color", "red");			
			$('#signup-set-myprofile-modal :input').focus(function() {
    			$('#signup-set-myprofile-result').text("");
			});
			
			$('#signup-set-myprofile-modal :checkbox').on('focus change',function() {
    			$('#signup-set-myprofile-result').text("");
			});	
        }       
    }); // #signup-set-myprofile-modal-btn.click
}); // ready




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
        	  console.log("success: ",response)
          },
          fail: function (error) {
            console.log("fail: ", error)
          },
        })
      },
      fail: function (error) {
        console.log("fail down: ",error)
      },
    })
  }  
*/ 

/*
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
		console.log("profile: ", profile);
	})
	.fail(function(e){
		console.log("error: ", e);
	})
}
function onSignInFailure(t){		
	console.log("t: ", t);
}
*/
