$(document).ready(function () {
    function loadInitialData() {
        // 지역 데이터 로드
        $.ajax({
            url: '/settings/regions',
            type: 'GET',
            success: function (regions) {
                const regionSelect = $('#groupRegionId');
                regionSelect.empty();

                // '온라인' 지역을 제외한 지역만 추가
                regions.filter(region => region.regionName !== "온라인")
                       .forEach(region => {
                           regionSelect.append(new Option(region.regionName, region.regionId));
                       });

                // 초기 지역 및 구 설정
                const initialRegionId = regionSelect.data('initial-region-id');
                if (initialRegionId) {
                    regionSelect.val(initialRegionId);
                    loadDistricts(initialRegionId).done(function () {
                        const initialDistrictId = $('#groupDistrictId').data('initial-district-id');
                        if (initialDistrictId) {
                            $('#groupDistrictId').val(initialDistrictId);
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Failed to load regions:', error);
            }
        });
    }

    function loadDistricts(regionId) {
        var deferred = $.Deferred();
        $.ajax({
            url: `/settings/regions/${regionId}`,
            type: 'GET',
            success: function (districts) {
                const districtSelect = $('#groupDistrictId');
                districtSelect.empty();
                
                // '온라인' 지역 구 제외
                if (regionId !== '17') {
                    districts.forEach(district => {
                        districtSelect.append(new Option(district.districtName, district.districtId));
                    });
                } else {
                    // 온라인 지역의 구는 고정된 값으로 설정
                    districtSelect.append(new Option("온라인 구", '304'));
                }

                deferred.resolve();
            },
            error: function (xhr, status, error) {
                console.error('Failed to load districts:', error);
                deferred.reject();
            }
        });
        return deferred.promise();
    }

    // 활동 방식 선택에 따른 지역 선택 영역 표시/숨기기
    $('#offlineButton').on('click', function () {
        $('#regionSelect').show(500);
        loadDistricts($('#groupRegionId').val()); // 지역에 따른 구 로드
    });

    $('#onlineButton').on('click', function () {
        $('#regionSelect').hide(500);

        // 온라인 지역을 추가
        const onlineRegionId = '17';
        const onlineRegionName = '온라인';

        $.ajax({
            url: '/settings/regions',
            type: 'GET',
            success: function (data) {
                const regionSelect = $('#groupRegionId');
                regionSelect.empty();

                data.filter(region => region.regionName !== onlineRegionName && region.regionId !== parseInt(onlineRegionId))
                    .forEach(region => {
                        regionSelect.append(new Option(region.regionName, region.regionId));
                    });

                // 온라인 지역을 추가
                regionSelect.append(new Option(onlineRegionName, onlineRegionId));

                // 온라인 지역 ID를 설정하고 구를 로드
                $('#groupRegionId').val(onlineRegionId);
                loadDistricts(onlineRegionId).done(function () {
                    $('#groupDistrictId').val('304'); // 온라인 지역에 대한 기본 구 설정
                });
            },
            error: function (xhr, status, error) {
                console.error('Failed to load regions:', error);
            }
        });
    });

    // 지역 선택 시 구를 불러오는 함수 호출
    $('#groupRegionId').on('change', function () {
        const regionId = $(this).val();
        if (regionId) {
            loadDistricts(regionId);
        } else {
            $('#groupDistrictId').empty();
        }
    });

    // 승인제와 선착순 버튼 클릭 이벤트 처리
    $('.approval-type').on('click', function () {
        var value = $(this).data('value');
        $('.approval-type').removeClass('active');
        $(this).addClass('active');
        if (value === '승인제') {
            $('.first-come-first-served').hide(500);
            $('.approval-system').show(500);
        } else {
            $('.approval-system').hide(500);
            $('.first-come-first-served').show(500);
        }
    });

    $('.approval-type[data-value="선착순"]').addClass('active');

    // 이미지 업로드 버튼 클릭 시 파일 입력 클릭
    $('#addImageButton').on('click', function () {
        $('#groupImage').click();
    });

    // 이미지 파일 선택 시 미리보기 표시
    $('#groupImage').on('change', function (event) {
        var reader = new FileReader();
        reader.onload = function () {
            $('#preview').show().attr('src', reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // 참가인원 필드 초기값 설정
    $('#groupMaximum').val(2);

    // 참가인원 필드의 값이 변경될 때마다 확인
    $('#groupMaximum').on('blur', function () {
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

    // 저장 버튼 클릭 시
    $('#saveGroupButton').on('click', function (event) {
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
        if (!groupName || !groupDetail || !groupRegionId || !groupDistrictId || !groupMaximum || !groupInterestId ||
            (groupSignUpType === '승인제' && !groupSignUpQuestion)) {
            alert("모임 가입에 필요한 요소를 채워주세요.");
            return;
        }

        // 금칙어 체크
        checkForbiddenWords(groupName, groupDetail).done(function (hasForbiddenWords) {
            if (hasForbiddenWords) {
                return; // 금칙어가 발견되면 등록을 하지 않음
            }

            // 그룹 이름 중복 체크
            checkGroupName(groupName).done(function (exists) {
                if (exists) {
                    alert("이미 존재하는 모임 이름입니다. 다른 이름을 입력하세요.");
                } else {
                    // 폼 제출
                    var formData = new FormData($('#groupForm')[0]);
                    if (!groupImage) {
                        if (confirm("이미지를 등록하지 않았습니다. 등록 하시겠습니까?")) {
                            formData.append('groupRegisterImage', new Blob([], { type: 'image/png' })); // 빈 이미지 파일 추가
                            submitForm(formData);
                        }
                    } else {
                        formData.append('groupRegisterImage', groupImage); // 이미지 추가
                        submitForm(formData);
                    }
                }
            });
        });
    });

    function submitForm(formData) {
        $.ajax({
            url: '/settings/updateGroup',
            type: 'POST',
            data: formData,
            encType: "multipart/form-data",
            processData: false,
            contentType: false,
            success: function (response) {
                if (response && response.groupId) {
                    window.location.href = "/groupdetail/info?groupId=" + response.groupId;
                } else {
                    alert("등록된 그룹 정보를 찾을 수 없습니다.");
                }
            },
            error: function (xhr, status, error) {
                console.error('Error submitting form:', error);
                alert('모임 등록에 실패했습니다. 다시 시도해 주세요.');
            }
        });
    }

    function checkForbiddenWords(groupName, groupDetail) {
        // 금칙어 리스트
        var forbiddenWords = ["금칙어1", "금칙어2", "금칙어3"]; // 실제 금칙어 리스트로 교체

        var checkContent = groupName + " " + groupDetail;
        return $.Deferred(function (deferred) {
            var hasForbiddenWords = forbiddenWords.some(word => checkContent.includes(word));
            deferred.resolve(hasForbiddenWords);
        }).promise();
    }

    function checkGroupName(groupName) {
        return $.ajax({
            url: '/settings/checkGroupName',
            type: 'GET',
            data: { groupName: groupName }
        });
    }

    // 페이지 로드 시 데이터 초기화
    loadInitialData();
});
