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
        url: '/groupregister/regions',
        type: 'GET',
        success: function(data) {
            const regionSelect = $('#groupRegionId');
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
    $('#groupRegionId').on('change', function() {
        const regionId = $(this).val();
        loadDistricts(regionId);
    });

    function loadDistricts(regionId) {
        $.ajax({
            url: `/groupregister/regions/${regionId}`,
            type: 'GET',
            success: function(data) {
                const districtSelect = $('#groupDistrictId');
                districtSelect.empty();
                data.forEach(district => {
                    districtSelect.append(new Option(district.districtName, district.districtId));
                });
            }
        });
    }
    
    // 승인제 선택 시 질문 입력란 표시/숨기기 및 호스트 질문 로드
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

    // 이미지 선택, 미리보기 보여주기
    $('#groupImage').on('change', function(event) {
        var reader = new FileReader();
        reader.onload = function(){
            var img = new Image();
            img.onload = function() {
                // 이미지 크기 조정
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var MAX_WIDTH = 200;
                var MAX_HEIGHT = 200;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                $('#preview').attr('src', canvas.toDataURL('image/jpeg')).show();
                $('.plus-icon').hide();
            }
            img.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // 참가인원에 숫자만 입력 가능하도록 설정
    $('#groupMaximum').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // 숫자 이외의 입력 제거
        if (parseInt(this.value) > 300) {
            this.value = '300'; // 최대값 제한
        } else if (parseInt(this.value) < 1) {
            this.value = '1'; // 최소값 제한
        }
    });

    // 금칙어 설정 단어 넣기
    const forbiddenWords = ["금칙어1", "금칙어2", "금칙어3"];

    $('#register_submit').on('click', function(event) {
        var groupName = $('#groupName').val();
        var groupDetail = $('#groupDetail').val();

        for (let word of forbiddenWords) {
            if (groupName.includes(word) || groupDetail.includes(word)) {
                alert("모임 이름이나 설명에 금칙어가 포함되어 있습니다.");
                event.preventDefault();
                return;
            }
        }
    });
});
