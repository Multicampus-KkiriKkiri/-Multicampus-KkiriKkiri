$(document).ready(function () {
    let lastUpdateTime = null;

    function fetchLatestChats() {
        $.ajax({
            url: '/api/notificationchatlist',
            type: 'GET',
            dataType: 'json',
            data: {
                lastUpdateTime: lastUpdateTime
            },
            success: function (data) {
                if (data.updatedGroups.length === 0) {
                    console.log("No data found");
                } else {
                    updateChatContainer(data.updatedGroups);
                    lastUpdateTime = data.latestUpdateTime;
                }
            },
            error: function () {
                console.error('Failed to fetch latest chats');
            }
        });
    }

    function updateChatContainer(updatedGroups) {
        for (var i = 0; i < updatedGroups.length; i++) {
            var group = updatedGroups[i];
            var groupContainer = $('#group-' + group.groupId);
            if (groupContainer.length === 0) {
                // 새로 추가된 그룹인 경우
                var chatHtml = `
                    <div class="chatContainer" id="group-${group.groupId}">
                        <div class="groupImage"><img src="${group.groupImage}" alt="Group Image"/></div>
                        <div class="groupName">${group.groupName}</div>
                        <div class="userNickname">${group.userNickname}</div>
                        <div class="chatMessage">${group.chatMessage}</div>
                    </div>
                `;
                $('#chatsContainer').append(chatHtml);
            } else {
                // 기존 그룹 업데이트
                groupContainer.find('.groupImage img').attr('src', group.groupImage);
                groupContainer.find('.groupName').text(group.groupName);
                groupContainer.find('.userNickname').text(group.userNickname);
                groupContainer.find('.chatMessage').text(group.chatMessage);
            }
        }
    }

    setInterval(fetchLatestChats, 5000); // 5초마다 데이터 가져오기
});
