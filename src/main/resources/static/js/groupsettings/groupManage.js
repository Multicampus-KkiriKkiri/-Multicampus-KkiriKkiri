$(document).ready(function () {
    let isOnlineMode = false;

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

    function updateRegionOptions(isOnline) {
        $.ajax({
            url: '/settings/regions',
            type: 'GET',
            success: function (regions) {
                const regionSelect = $('#groupRegionId');
                regionSelect.empty();

                if (isOnline) {
                    regionSelect.append(new Option('온라인', '17'));
                    $('#groupDistrictId').empty().append(new Option('온라인 구', '304'));
                } else {
                    regions.filter(region => region.regionName !== "온라인")
                        .forEach(region => {
                            regionSelect.append(new Option(region.regionName, region.regionId));
                        });

                    const currentRegionId = regionSelect.val();
                    if (currentRegionId) {
                        loadDistricts(currentRegionId);
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error('Failed to load regions:', error);
            }
        });
    }

    // '온라인' 버튼 클릭 시 동작
    $('#onlineButton').on('click', function () {
        isOnlineMode = true;
        $('#regionSelect').hide(500);
        updateRegionOptions(true);
    });

    // '오프라인' 버튼 클릭 시 동작
    $('#offlineButton').on('click', function () {
        isOnlineMode = false;
        $('#regionSelect').show(500);
        updateRegionOptions(false);
    });

    // 지역 선택 시 구를 불러오는 함수 호출
    $('#groupRegionId').on('change', function () {
        const regionId = $(this).val();
        if (regionId && !isOnlineMode) {
            loadDistricts(regionId);
        } else if (isOnlineMode) {
            $('#groupDistrictId').val('304'); // 온라인 모드에서 구는 항상 '온라인 구'
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

    // 삭제 버튼 클릭 시
    $('#deleteGroupButton').on('click', function () {
        var groupId = $('#groupId').val();
    
        if (confirm('정말로 이 모임을 삭제하시겠습니까?')) {
            $.ajax({
                url: '/settings/deleteGroup',
                type: 'POST',
                data: { groupId: groupId },
                success: function (response) {
                    window.location.href = '/mypage'; // 삭제 후 리다이렉션
                },
                error: function (xhr, status, error) {
                    console.error('Error deleting group:', error);
                    alert('그룹 삭제에 실패했습니다. 다시 시도해 주세요.');
                }
            });
        }
    });

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
        if (!groupName || !groupDetail || !groupInterestId ||
            (groupSignUpType === '승인제' && !groupSignUpQuestion)) {
            alert("모임 가입에 필요한 요소를 채워주세요.");
            return;
        }

        // 금칙어 체크
        checkForbiddenWords(groupName, groupDetail).done(function (hasForbiddenWords) {
            if (hasForbiddenWords) {
                alert("금칙어가 포함되어 있습니다. 다시 확인해 주세요.");
                return; // 금칙어가 발견되면 등록을 하지 않음
            }

            // 그룹 이름 중복 체크
            checkGroupName(groupName).done(function (exists) {
                if (exists) {
                    alert("이미 존재하는 모임 이름입니다. 다른 이름을 입력하세요.");
                } else {
                    // 폼 제출
                    var formData = new FormData($('#groupForm')[0]);
                    formData.append('groupRegionId', isOnlineMode ? '17' : groupRegionId); // 온라인 모드일 때 온라인 지역 ID 전송
                    formData.append('groupDistrictId', isOnlineMode ? '304' : groupDistrictId); // 온라인 모드일 때 온라인 구 ID 전송
                    
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
                    window.location.href = "/settings/main?groupId=" + response.groupId;
                } else {
                    alert("등록된 그룹 정보를 찾을 수 없습니다.sumbitform");
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
        return $.Deferred(function (def) {
            var hasForbiddenWords = forbiddenWords.some(word => checkContent.includes(word));
            def.resolve(hasForbiddenWords);
        }).promise();
    }

    function checkGroupName(groupName) {
        return $.ajax({
            url: '/settings/checkGroupName',
            type: 'GET',
            data: { groupName: groupName },
            success: function (response) {
                return response.exists;
            },
            error: function (xhr, status, error) {
                console.error('Error checking group name:', error);
                return false;
            }
        });
    }

    // 초기 데이터 로드
    loadInitialData();
});
