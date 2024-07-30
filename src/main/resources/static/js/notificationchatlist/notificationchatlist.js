$(document).ready(function () {
    var notificationSock = new SockJS("/ws/notifications");

    notificationSock.onopen = function() {
        console.log("Notification WebSocket connection opened.");
    };

    notificationSock.onmessage = function(e) {
        var latestChat = JSON.parse(e.data);
        console.log("Received message:", latestChat);
        updateChatContainer([latestChat]);
    };

    notificationSock.onclose = function() {
        console.log("Notification WebSocket connection closed.");
    };

    notificationSock.onerror = function(error) {
        console.error("Notification WebSocket error: ", error);
    };

    // 초기 로드 시 최신 채팅 메시지를 가져옴
    fetchLatestChats();
});

function fetchLatestChats() {
    $.ajax({
        url: '/api/notificationchatlist',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log("Fetched latest chats:", data);
            if (!data.updatedGroups || data.updatedGroups.length === 0) {
                console.log("No data found");
            } else {
                $('#chatsContainer').empty();  // 기존 데이터를 지우고 새로 업데이트
                updateChatContainer(data.updatedGroups);
            }
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch latest chats', status, error);
        }
    });
}

function updateChatContainer(updatedGroups) {
    for (var i = 0; i < updatedGroups.length; i++) {
        var group = updatedGroups[i];
        if (group.chatHistory && group.chatHistory.length > 0) {
            var chat = group.chatHistory[0];  // 첫 번째 채팅 메시지만 사용

            var groupContainer = $('#group-' + group.groupId);
            if (groupContainer.length === 0) {
                // 새로 추가된 그룹인 경우
                var chatHtml = `
                    <div class="chatContainer" id="group-${group.groupId}">
                        <div class="groupImage"><img src="${group.groupImage}" alt="Group Image"/></div>
                        <div class="groupName">${group.groupName}</div>
                        <div class="chatTime">${chat.chatTime}</div>
                        <div class="profileImage"><img src="${chat.profileImage || 'default_profile.png'}" alt="Profile Image"/></div>
                        <div class="userNickname">${chat.userNickname}</div>
                        <div class="chatMessage">${chat.chatMessage || "No Message"}</div>
                    </div>
                `;
                $('#chatsContainer').append(chatHtml);
            } else {
                // 기존 그룹 업데이트
                groupContainer.find('.groupImage img').attr('src', group.groupImage);
                groupContainer.find('.groupName').text(group.groupName);
                groupContainer.find('.chatTime').text(chat.chatTime);
                groupContainer.find('.profileImage img').attr('src', chat.profileImage || 'default_profile.png');
                groupContainer.find('.userNickname').text(chat.userNickname);
                groupContainer.find('.chatMessage').text(chat.chatMessage || "No Message");
            }
        } else {
            console.log(`No chat history for group ${group.groupId}`);
        }
    }
}
