$(document).ready(function() {
    // 초기 상태 설정
    $('#regionSelect').hide(); // 초기 로딩 시 지역 선택 영역 숨김
    $('#groupRegionId').val(''); // 기본값 설정
    $('#groupDistrictId').val(''); // 기본값 설정

    // '온라인' 버튼 클릭 시 동작
    $('#onlineButton').on('change', function() {
        if ($(this).is(':checked')) {
            $('#regionSelect').hide(500);
            $('#groupRegionId').val('17');
            $('#groupDistrictId').val('304');

            // 온라인 지역 선택 시 지역 선택 옵션에서 '온라인' 추가
            $.ajax({
                url: '/groupregister/regions',
                type: 'GET',
                success: function(data) {
                    const regionSelect = $('#groupRegionId');
                    regionSelect.empty();

                    data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                        .forEach(region => {
                            regionSelect.append(new Option(region.regionName, region.regionId));
                        });

                    // 온라인 지역을 추가
                    regionSelect.append(new Option("온라인", 17));

                    // 온라인 지역 ID를 설정하고 구를 로드
                    $('#groupRegionId').val('17');
                    loadDistricts('17').done(function() {
                        if ($('#groupDistrictId').find('option[value="304"]').length > 0) {
                            $('#groupDistrictId').val('304');
                        } else {
                            console.error('District ID 304 not found in the select options.');
                        }
                    });
                }
            });
        }
    });

    // '오프라인' 버튼 클릭 시 동작
    $('#offlineButton').on('change', function() {
        if ($(this).is(':checked')) {
            $('#regionSelect').show(500);
            $('#groupRegionId').val('1'); // 오프라인일 때 기본값 설정
            $('#groupDistrictId').val(''); // 구 선택 초기화
            loadDistricts($('#groupRegionId').val()); // 지역에 따른 구 로드

            // 지역 정보 불러오기
            $.ajax({
                url: '/groupregister/regions',
                type: 'GET',
                success: function(data) {
                    const regionSelect = $('#groupRegionId');
                    regionSelect.empty();

                    data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                        .forEach(region => {
                            regionSelect.append(new Option(region.regionName, region.regionId));
                        });
                }
            });
        }
    });

    // 페이지 로드 시 지역 정보 불러오기
    $.ajax({
        url: '/groupregister/regions',
        type: 'GET',
        success: function(data) {
            const regionSelect = $('#groupRegionId');
            regionSelect.empty();

            data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                .forEach(region => {
                    regionSelect.append(new Option(region.regionName, region.regionId));
                });

            if (data.length > 0) {
                loadDistricts(data[0].regionId);
            }
        }
    });

    // 지역 선택 시 구를 불러오는 함수 호출
    $('#groupRegionId').on('change', function() {
        const regionId = $(this).val();
        loadDistricts(regionId);
    });

    function loadDistricts(regionId) {
        var deferred = $.Deferred();
        $.ajax({
            url: `/groupregister/regions/${regionId}`,
            type: 'GET',
            success: function(data) {
                const districtSelect = $('#groupDistrictId');
                districtSelect.empty();
                data.forEach(district => {
                    districtSelect.append(new Option(district.districtName, district.districtId));
                });
                deferred.resolve(); // 성공적으로 로드된 후 resolve
            },
            error: function() {
                deferred.reject(); // 오류가 발생한 경우 reject
            }
        });
        return deferred.promise();
    }

    // 승인제와 선착순 버튼 클릭 이벤트 처리
    $('input[name="groupSignUpType"]').on('change', function() {
        var value = $(this).val();
        $('.approval-type').removeClass('active');
        $(this).parent().addClass('active');
        if (value === '승인제') {
            $('.first-come-first-served').hide(500);
            $('.approval-system').show(500);
        } else {
            $('.approval-system').hide(500);
            $('.first-come-first-served').show(500);
        }
    });
    // 기본적으로 '선착순' 버튼 활성화
    $('input[name="groupSignUpType"][value="선착순"]').prop('checked', true).trigger('change');

    // 이미지 업로드 버튼 클릭 시 파일 입력 클릭
    $('#addImageButton').on('click', function() {
        $('#groupImage').click();
    });

    // 이미지 파일 선택 시 미리보기 표시
    $('#groupImage').on('change', function(event) {
        var reader = new FileReader();
        reader.onload = function() {
            $('#preview').removeClass('d-none').attr('src', reader.result); // d-none 클래스를 제거하여 이미지 표시
        };
        if (event.target.files[0]) { // 파일이 선택되었는지 확인
            reader.readAsDataURL(event.target.files[0]);
        }
    });

    // 참가인원 필드 초기값 설정
    $('#groupMaximum').val(2);

    // 참가인원 필드의 값이 변경될 때마다 확인
    $('#groupMaximum').on('blur', function() {
        var value = $(this).val();
        
        // 빈 값이나 0은 허용
        if (value === '' || value === '0') {
            return;
        }

        // 숫자로 변환
        value = parseInt(value);

        if (value > 300) {
            $(this).val(300);
        } else if (value < 2) {
            $(this).val(2);
        }
    });

    // 참가인원 필드의 최대값 설정
    $('#groupMaximum').attr('max', 300);

    // 등록 버튼 클릭 시
    $('#register_submit').on('click', function(event) {
        event.preventDefault(); // 기본 폼 제출 방지

        var groupName = $('#groupName').val();
        var groupDetail = $('#groupDetail').val();
        var groupSignUpType = $('input[name="groupSignUpType"]:checked').val();
        var groupImage = $('#groupImage')[0].files[0];
        var groupSignUpQuestion = $('#groupSignUpQuestion').val();
        var groupRegionId = $('#groupRegionId').val();
        var groupDistrictId = $('#groupDistrictId').val();
        var groupMaximum = $('#groupMaximum').val();
        var groupInterestId = $('#groupInterestId').val();

        // 참가인원 유효성 검사
        if (!groupName || !groupDetail || !groupInterestId || !groupMaximum ||
            (groupSignUpType === '승인제' && !groupSignUpQuestion)) {
            alert("모임 가입에 필요한 요소를 채워주세요.");
            return;
        }

        // 금칙어 체크
        checkForbiddenWords(groupName, groupDetail).done(function(hasForbiddenWords) {
            if (hasForbiddenWords) {
                return; // 금칙어가 발견되면 등록을 하지 않음
            }

            // 그룹 이름 중복 체크
            checkGroupName(groupName).done(function(exists) {
                if (exists) {
                    alert("이미 존재하는 모임 이름입니다. 다른 이름을 입력하세요.");
                } else {
                    // 폼 제출
                    var formData = new FormData($('#groupForm')[0]);

                    // 활동 방식에 따라 지역 및 구 값 설정
                    if ($('#onlineButton').is(':checked')) {
                        formData.append('groupRegionId', '17');
                        formData.append('groupDistrictId', '304');
                    } else {
                        formData.append('groupRegionId', $('#groupRegionId').val());
                        formData.append('groupDistrictId', $('#groupDistrictId').val());
                    }

                    if (!groupImage) {
                        if (confirm("이미지를 등록하지 않았습니다. 등록 하시겠습니까?")) {
                            formData.append('groupRegisterImage', new Blob([], {type: 'image/png'})); // 빈 이미지 파일 추가
                            submitForm(formData);
                        }
                    } else {
                        formData.append('groupRegisterImage', groupImage); // 이미지 추가
                        submitForm(formData);
                    }
                }
            }).fail(function() {
                alert("모임 이름 중복 체크에 실패했습니다. 다시 시도해 주세요.");
            });
        });
    });

    function submitForm(formData) {
        $.ajax({
            url: '/groupregister/register',
            type: 'POST',
            data: formData,
            encType: "multipart/form-data",
            processData: false,
            contentType: false,
            success: function(response) {
                if (response && response.groupId) {
                    window.location.href = "/groupdetail/info?groupId=" + response.groupId; // 서버에서 반환된 그룹 ID로 리디렉션
                } else {
                    alert("등록된 그룹 정보를 찾을 수 없습니다.");
                }
            },
            error: function() {
                alert("모임 등록에 실패했습니다.");
            }
        });
    }

    function checkGroupName(groupName) {
        return $.ajax({
            url: '/groupregister/checkGroupName',
            type: 'POST',
            data: { groupName: groupName },
            dataType: 'json'
        });
    }

    function checkForbiddenWords(groupName, groupDetail) {
        // 금칙어 리스트
        var forbiddenWords = ["금칙어1", "금칙어2", "금칙어3"]; // 실제 금칙어로 교체

        // 금칙어가 포함되어 있는지 검사
        var hasForbiddenWords = forbiddenWords.some(word => {
            return groupName.includes(word) || groupDetail.includes(word);
        });

        if (hasForbiddenWords) {
            var message = forbiddenWords.find(word => groupName.includes(word))
                ? "그룹 이름에 금칙어가 포함되어있습니다! 다른 이름으로 설정해주세요."
                : "그룹 설명에 금칙어가 포함되어있습니다! 다른 설명으로 설정해주세요.";

            alert(message);
        }

        return $.Deferred().resolve(hasForbiddenWords);
    }
});
