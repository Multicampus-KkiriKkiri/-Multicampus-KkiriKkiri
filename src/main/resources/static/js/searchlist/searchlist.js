$(document).ready(function() {
    // 페이지가 로드되면 모든 지역 정보를 가져와서 id = regions 셀렉트 태그에 추가
    $.ajax({
        url: '/regions',
        method: 'GET',
        success: function(data) {
            let citySelect = $('#regions'); 
            
            //'대한민국 전체' 옵션 추가
            citySelect.append('<option value=0>대한민국 전체</option>');
            
            // 첫 번째 옵션(공백) 삭제
            citySelect.find('option:first').remove();

            data.filter(region => region.regionName !== "온라인" && region.regionId !== 17)
                .forEach(region => {                    
                    let isSelected = (region.regionId == selectedRegionId) ? 'selected' : '';
                    citySelect.append('<option value=' + region.regionId + ' ' + isSelected + '>' + region.regionName + '</option>');
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
        $.ajax({
            url: `/regions/${regionId}`,
            type: 'GET',
            success: function(data) {
                const districtSelect = $('#districts');
                districtSelect.empty();
                data.forEach(district => {
                    let isSelected = (district.districtId == selectedDistrictId) ? 'selected' : '';
                    districtSelect.append('<option value=' + district.districtId + ' ' + isSelected + '>' + district.districtName + '</option>');
                });
            }
        });
    });

    // 검색 유형 선택 시 폼 액션 변경
    $('input[name="searchType"]').on('change', function() {
        $('#searchForm').attr('action', $(this).val() + 'searchatlist');
    });

    // 검색 버튼 클릭 시 폼 제출
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        $(this).attr('action', $('input[name="searchType"]:checked').val() + 'searchatlist');
        this.submit();
    });

    // 결과 컨테이너 클릭 시 그룹 상세 페이지로 이동
    $('#resultsContainer').on('click', '.resultContainer', function() {
        const groupId = $(this).data('groupid');
        if (groupId) {
            window.location.href = `/groupdetail/info?groupId=${groupId}`;
        }
    });

    // Truncate details text
    $('.details').each(function() {
        const maxLength = 200;
        const text = $(this).text();
        if (text.length > maxLength) {
            $(this).text(text.substring(0, maxLength) + '...');
        }
    });
});
