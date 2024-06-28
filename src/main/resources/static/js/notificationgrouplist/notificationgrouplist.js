$(document).ready(function() {
    $(".delete-button").click(function() {
        var form = $(this).closest(".delete-form");
        var notificationId = form.find("input[name='notificationId']").val();
        var userId = form.find("input[name='userId']").val();
        var groupId = form.find("input[name='groupId']").val();
        
        $.ajax({
            url: 'deleteNotification',
            type: 'DELETE',
            data: { notificationId: notificationId, userId: userId, groupId: groupId },
            success: function(response) {
                // 성공적으로 삭제된 경우 최신 알림 목록으로 업데이트
                updateNotification(response);
            },
            error: function(xhr, status, error) {
                // 에러 처리
                alert('알림 삭제에 실패했습니다.');
            }
        });
    });
});

function updateNotification(notificationList) {
    var container = $("#notification-container");
    container.empty();
    
    if (notificationList.length === 0) {
        container.append('<div>알림이 없습니다.</div><br>');
    } else {
        notificationList.forEach(function(dto) {
            var notificationItem = `
                <div class="notification-item">
                    <div>${dto.notificationTime}</div><br>
                    <div>${dto.notificationText} 입니다.</div><br>
                    <div>
                        <form class="delete-form">
                            <input type="hidden" name="notificationId" value="${dto.notificationId}" />
                            <input type="hidden" name="userId" value="${dto.userId}" />
                            <input type="hidden" name="groupId" value="${dto.groupId}" />
                            <button type="button" class="delete-button">삭제</button>
                        </form>
                    </div>
                </div>
            `;
            container.append(notificationItem);
        });
    }
}
