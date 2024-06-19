$(document).ready(function() {
    // 활동 방식 선택에 따른 지역 선택 영역 표시/숨기기
    $('#offlineButton').on('click', function() {
        $('#regionSelect').hide();
    });

    $('#onlineButton').on('click', function() {
        $('#regionSelect').show();
    });

    // 신청 방식 선택에 따른 질문 입력란 표시/숨기기
    $('.approval-type').on('click', function() {
        var value = $(this).data('value');
        $('.approval-system').toggle(value === '가입제');
    });

    // 이미지 추가 버튼 클릭 시 파일 선택 이벤트 트리거
    $('#addImageButton').on('click', function() {
        $('#groupImage').click();
    });

    // 이미지 선택 시 미리보기 표시
    $('#groupImage').on('change', function(event) {
        var reader = new FileReader();
        reader.onload = function(){
            $('#preview').attr('src', reader.result).show();
            $('.plus-icon').hide();
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // 참가인원에 숫자만 입력 가능하도록 설정
    $('#maxParticipants').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // 숫자 이외의 입력 제거
        if (parseInt(this.value) > 300) {
            this.value = '300'; // 최대값 제한
        }
    });
});
