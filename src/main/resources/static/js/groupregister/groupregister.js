$(document).ready(function() {
    // 활동 방식 선택에 따른 지역 선택 영역 표시/숨기기
    $('#offlineButton').on('click', function() {
        $('#regionSelect').show(500);
    });

    $('#onlineButton').on('click', function() {
        $('#regionSelect').hide(500);
    });

    // 지역 정보 불러오기
    $.ajax({
        url: '/group/regions',
        type: 'GET',
        success: function(data) {
            const regionSelect = $('#region');
            regionSelect.empty();
            data.forEach(region => {
                regionSelect.append(new Option(region.regionName, region.regionId));
            });

            // 최초 로드 시 첫 번째 지역의 구 정보 불러오기
            if (data.length > 0) {
                loadDistricts(data[0].regionId);
            }
        }
    });

    // 지역 선택 시 구 정보 불러오기
    $('#region').on('change', function() {
        const regionId = $(this).val();
        loadDistricts(regionId);
    });

    function loadDistricts(regionId) {
        $.ajax({
            url: `/group/regions/${regionId}`,
            type: 'GET',
            success: function(data) {
                const districtSelect = $('#district');
                districtSelect.empty();
                data.forEach(district => {
                    districtSelect.append(new Option(district.districtName, district.districtId));
                });
            }
        });
    }

    // 신청 방식 선택에 따른 질문 입력란 표시/숨기기
    $('.approval-type').on('click', function() {
        var value = $(this).data('value');
        $('.approval-type').removeClass('active');
        $(this).addClass('active');
        if (value === '가입제') {
            $('.first-come-first-served').hide(500);
            $('.approval-system').show(500);
            $('#questionBox').show(500);
        } else {
            $('.approval-system').hide(500);
            $('.first-come-first-served').show(500);
            $('#questionBox').hide(500);
        }
    });

    // 기본적으로 선착순 버튼이 눌러져 있도록 설정
    $('.approval-type[data-value="선착순"]').addClass('active');
    $('#questionBox').hide(500);

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
        } else if (parseInt(this.value) < 1) {
            this.value = '1'; // 최소값 제한
        }
    });
});
