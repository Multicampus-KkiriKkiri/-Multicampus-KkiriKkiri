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
            $('#chatsContainer').empty();  // 기존 데이터를 지우고 새로 업데이트
            let chatList = [];
            for (var groupId in data) {
                if (data.hasOwnProperty(groupId) && data[groupId] !== "채팅이 없습니다") {
                    chatList.push(data[groupId]);
                }
            }
            chatList.sort((a, b) => a.groupId - b.groupId);
            updateChatContainer(chatList);
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch latest chats', status, error);
        }
    });
}

function updateChatContainer(chatList) {
    chatList.forEach(function(chat) {
        // 기존 동일 groupId를 가진 데이터 삭제
        $('#group-' + chat.groupId).remove();

        var chatHtml = `
            <div class="chatContainer" id="group-${chat.groupId}" data-group-id="${chat.groupId}">
                <div class="groupImage">
                    <img src="${chat.groupImage}" alt="Group Image"/>
                </div>
                <div class="groupName">${chat.groupName}</div>
                <div class="chatContent">
                    <div class="userNickname">${chat.userNickname}</div>
                    <div class="chatTime">${formatTimeToKorean(chat.chatTime)}</div>
                    <div class="chatMessage">${chat.chatMessage || "No Message"}</div>
                </div>
            </div>
        `;
        $('#chatsContainer').append(chatHtml);
    });

    // groupId 기준으로 정렬
    sortChatContainers();

    // 클릭 이벤트 추가
    $('.chatContainer').on('click', function() {
        var groupId = $(this).data('group-id');
        window.location.href = '/groupdetail/info?groupId=' + groupId + '#chatTapBtn';
    });
}

function sortChatContainers() {
    var container = $('#chatsContainer');
    var items = container.children('.chatContainer').get();

    items.sort(function(a, b) {
        var groupIdA = parseInt($(a).attr('id').split('-')[1]);
        var groupIdB = parseInt($(b).attr('id').split('-')[1]);
        return groupIdA - groupIdB;
    });

    $.each(items, function(idx, itm) {
        container.append(itm);
    });
}

function formatTimeToKorean(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const period = hours < 12 ? '오전' : '오후';
    const formattedHours = hours % 12 || 12;
    return `${period} ${formattedHours}:${minutes}`;
}
