(function() {
    // 중복 선언을 피하기 위해 let이나 const 사용
    let searchType = 'group';
    let sortOrder = 'new';

    // 검색 타입 설정 함수
    window.setSearchType = function(type) {
        searchType = type;
        search(); // searchType이 변경될 때 즉시 검색
    }

    // 검색 함수
    window.search = function() {
        const keyword = $('#searchInput').val();
        const region = $('#regions').val();
        const district = $('#districts').val();
        const interest = $('#interests').val();
        const onlineOffline = $('#onlineOffline').val();
        
        loadPage(1, { keyword, region, district, interest, onlineOffline });
    }

    // 정렬 결과 함수
    window.sortResults = function(order) {
        sortOrder = order;
        search(); // 기존 검색 조건으로 다시 검색
    }

    // 페이지 로드 함수
    window.loadPage = function(page, filters = {}) {
        const params = {
            ...filters,
            sortOrder: sortOrder,
            page: page,
            pageSize: 15
        };

        $.ajax({
            url: `/${searchType}search`,
            type: 'GET',
            data: params,
            success: function(response) {
                // 서버에서 헤더와 푸터를 포함한 전체 HTML을 반환할 경우 이를 전체 페이지에 적용
                $('html').html(response);
            },
            error: function(error) {
                console.error('Error:', error);
                $('#resultsContainer').html('<p>오류가 발생했습니다. 다시 시도해 주세요.</p>');
            }
        });
    }

    $(document).ready(function() {
        // 초기 검색 실행
        search();
    });
})();
