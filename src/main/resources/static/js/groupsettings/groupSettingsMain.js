var isChanged = false; // Global variable to track if there are unsaved changes
var groupId = $("#groupId").val(); // 그룹 ID를 폼에서 가져오기

$(document).ready(function () {
	 // Debugging: check the value of groupId
	
    //console.log("groupId on document ready: " + groupId);
    // 탭 클릭 시 페이지 내용 로드
    $(".tapBtn").click(function(event) {
        if (isChanged) {
            event.preventDefault();
            if (confirm("변경된 사항이 있습니다. 탭을 변경하시겠습니까?")) {
                isChanged = false; // Reset change flag
                loadTabContent($(this).data('tab'));
            }
        } else {
            loadTabContent($(this).data('tab'));
        }
    });

    // 기본 탭 로드
    loadTabContent('group');
});

// 각 탭 클릭 시 section 불러오기
function loadTabContent(tab) {
    var urlMap = {
        'group': '/settings/group',
        'member': '/settings/member',
        'event': '/settings/event',
        'photo': '/settings/photo'
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

// 입력 필드 변경 시 호출
function markAsChanged() {
    isChanged = true;
}

// 저장 버튼 클릭 시 호출
function saveChanges() {
    // 저장 로직 추가
    isChanged = false;
}
