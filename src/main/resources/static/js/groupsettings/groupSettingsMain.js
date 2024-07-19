var groupId; // 전역 변수로 선언

$(document).ready(function() {
    // HTML에서 그룹 ID 가져오기
    groupId = $('#groupId').val();

    // 모임 상세페이지에서 각 탭 클릭 시 이벤트 처리
    $(".tapBtn").click(function() {
        loadTabContent($(this).val());
    });

    // 기본 탭 로드
    loadTabContent('group');
});

// 각 탭 클릭 시 section 불러오기
function loadTabContent(tab) {
    var urlMap = {
        'group': '/groupsettings/group',
        'member': '/groupsettings/member',
        'event': '/groupsettings/event',
        'photo': '/groupsettings/photo'
    };

    $.ajax({
        url: urlMap[tab],
        method: "POST",
        data: { groupId: groupId },
        success: function(data) {
            $("#groupSettingTapPageSection").html(data);
        },
        error: function() {
            alert("탭 콘텐츠를 불러오는데 실패했습니다.");
        }
    });
}
