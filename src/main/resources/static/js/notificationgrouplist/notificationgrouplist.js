$(document).ready(function() {
    var page = 0;
    var size = 10;
    var loading = false;
    var noMoreNotifications = false; // 더 이상 알림이 없는지 여부를 저장할 변수

    function loadNotifications(page, size) {
        $.ajax({
            url: '/api/notificationgrouplist',
            type: 'GET',
            data: { page: page, size: size },
            success: function(response) {
                console.log("Loaded notifications: ", response);
                if (response.length === 0) {
                    if (page === 0 && $("#initial-notifications").children().length === 0 && $("#ajax-notifications").children().length === 0) {
                        $("#ajax-notifications").html('<div id="no-notifications">알림이 없습니다.</div><br>');
                    }
                    // 더 이상 알림이 없으므로 무한 스크롤 중단
                    noMoreNotifications = true;
                    loading = false;
                } else {
                    if ($("#no-notifications").length) {
                        $("#no-notifications").remove(); // 기존 "알림이 없습니다" 메시지 제거
                    }
                    appendNotifications(response);
                    loading = false;
                }
            },
            error: function(xhr, status, error) {
                console.log("Error loading notifications: ", error);
                loading = false;
            }
        });
    }

    function appendNotifications(notification) {
        var container = $("#ajax-notifications");
        notification.forEach(function(dto) {
            if ($("div[data-id='" + dto.notificationId + "']").length === 0) { // 중복 추가 방지
                var notificationItem = `
                    <div class="notification-item" data-id="${dto.notificationId}">
                        <div>${dto.notificationTime}</div>
                        <div>${dto.notificationText}</div>
                        <div>
                            <form class="delete-form">
                                <input type="hidden" name="notificationId" value="${dto.notificationId}">
                                <button type="button" class="delete-button">삭제</button>
                            </form>
                        </div>
                    </div>
                `;
                container.append(notificationItem);
            }
        });
    }

    $(document).on("click", ".delete-button", function(event) {
        event.preventDefault();

        var form = $(this).closest(".delete-form");
        var notificationId = form.find("input[name='notificationId']").val();

        console.log("Notification ID: " + notificationId);

        $.ajax({
            url: '/deleteNotification',
            type: 'POST',
            data: { notificationId: notificationId },
            success: function(response) {
                console.log("Response: ", response);
                $("div[data-id='" + notificationId + "']").remove();
            },
            error: function(xhr, status, error) {
                console.log("Error: ", error);
                alert('알림 삭제에 실패했습니다.');
            }
        });
    });

    // 스크롤 이벤트를 디바운스하여 너무 자주 호출되지 않도록 합니다.
    var debounce = function(func, wait) {
        var timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    };

    var handleScroll = debounce(function() {
        if (!loading && !noMoreNotifications && $(window).scrollTop() + $(window).height() >= $(document).height() - 10) {
            loading = true;
            page++;
            loadNotifications(page, size);
        }
    }, 100);

    $(window).scroll(handleScroll);

    // 초기 알림 로드
    loadNotifications(page, size);

    // 일정 시간마다 알림을 새로고침
    setInterval(function() {
        if (!loading && !noMoreNotifications) {
            $("#ajax-notifications").empty(); // 기존 알림 제거
            page = 0; // 페이지 리셋
            loadNotifications(page, size); // 첫 페이지의 최신 알림 로드
        }
    }, 60000); // 60초마다 새로고침
});
