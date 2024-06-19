/**
 * Group detail/event/photo/chat javascript
 */

$(document).ready(function() {

    $('#tapInfoBtn').click(function() {
        loadContent('detail');
    });

    $('#tapEventBtn').click(function() {
        loadContent('event');
    });

    $('#tapPhotoBtn').click(function() {
        loadContent('photo');
    });

    $('#tapChatBtn').click(function() {
        loadContent('chat');
    });
    
}); // ready() end

function loadContent(tab) {

    var urlMap = {
        'info': '/groupdetail',
        'event': '/groupevent',
        'photo': '/groupphoto',
        'chat': '/groupchat'
    };

    $.ajax({
        url: urlMap[tab],
        method: "POST",
        data: { groupId: groupId },
        success: function(data) {
            $("#tapPageSection").html(data);
        },
        error: function() {
            alert("Failed to load tap content.");
        }
    }); // ajax() end
    
} // loadContent() end