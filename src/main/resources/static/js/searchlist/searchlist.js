$(document).ready(function() {
    // 페이지가 로드되면 모든 지역 정보를 가져와서 id = regions 셀렉트 태그에 추가
    $.ajax({
        url: '/regions',
        method: 'GET',
        success: function(data) {
            let citySelect = $('#regions'); 
            
            //'대한민국 전체' 옵션 추가
            citySelect.append('<option value="0">대한민국 전체</option>');
            
            // 첫 번째 옵션(공백) 삭제
            citySelect.find('option:first').remove();

            data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                .forEach(region => {                    
                    let isSelected = (region.regionId == selectedRegionId) ? 'selected' : '';
                    citySelect.append('<option value="' + region.regionId + '" ' + isSelected + '>' + region.regionName + '</option>');
                });

            // 지역 선택 시 구를 불러오는 함수 호출
            $('#regions').trigger('change');
        },
        error: function(error) {
            console.log("Error fetching regions:", error);
        }
    });

    // 지역 선택 시 구를 불러오는 함수 호출
    $('#regions').on('change', function() {
        const regionId = $(this).val();
        if (regionId == 0) {
            $('#districts').parent().hide(); // regionId가 0일 때 districts 숨김
            $('#districts').val(''); // districtId 값을 빈 문자열로 설정
        } else {
            $('#districts').parent().show(); // regionId가 0이 아닐 때 districts 보임
            $.ajax({
                url: `/regions/${regionId}`,
                type: 'GET',
                success: function(data) {
                    const districtSelect = $('#districts');
                    districtSelect.empty();
                    data.forEach(district => {
                        let isSelected = (district.districtId == selectedDistrictId) ? 'selected' : '';
                        districtSelect.append('<option value="' + district.districtId + '" ' + isSelected + '>' + district.districtName + '</option>');
                    });
                }
            });
        }
    });

    // 검색 유형 선택 시 폼 액션 변경
    $('input[name="searchType"]').on('change', function() {
        $('#searchForm').attr('action', $(this).val() + 'searchatlist');
    });

    // 검색 버튼 클릭 시 폼 제출
    $('#searchForm').on('submit', function(e) {
        // e.preventDefault(); // 기본 동작 유지하여 폼 제출
        $(this).attr('action', $('input[name="searchType"]:checked').val() + 'searchatlist');

        // 폼 제출 전에 regionId가 0일 때 districtId 값을 빈 문자열로 설정
        if ($('#regions').val() == 0) {
            $('#districts').val('');
        }

        this.submit();
    });

    // 결과 컨테이너 클릭 시 그룹 상세 페이지로 이동
    $('#resultsContainer').on('click', '.resultContainer', function() {
        const groupId = $(this).data('groupid');
        const eventId = $(this).data('eventid');
        if (groupId) {
            window.location.href = `/groupdetail/info?groupId=${groupId}`;
        } else if (eventId) {
            window.location.href = `/eventdetail/info?eventId=${eventId}`;
        }
    });

    // 초기 로드 시 regionId가 0인지 확인하여 districts 숨기기/보이기
    if ($('#regions').val() == 0) {
        $('#districts').parent().hide();
        $('#districts').val('');
    } else {
        $('#districts').parent().show();
    }

    // 그룹 타입이 온라인일 때 지역명과 구명을 숨김
    $('.resultContainer').each(function() {
        const groupType = $(this).find('.infoRow .infoItem:nth-child(2) span').text().trim();
        if (groupType === '온라인') {
            $(this).find('.infoRow .infoItem:nth-child(3)').hide();
        }

        // "전체"가 districtName에 있을 때 regionName 숨김
        const districtText = $(this).find('.infoRow .infoItem:nth-child(3) span').text().trim();
        if (districtText.includes("전체")) {
            const parts = districtText.split(' ');
            if (parts.length > 1) {
                $(this).find('.infoRow .infoItem:nth-child(3) span').text(parts[1]);
            }
        }
    });
});
