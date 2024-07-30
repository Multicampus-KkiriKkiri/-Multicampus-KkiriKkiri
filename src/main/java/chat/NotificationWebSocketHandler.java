package chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import dto.GroupDTO;
import dto.UserDTO;
import service.GroupService;
import service.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private ObjectMapper objectMapper;

    @Autowired
    GroupService groupService;
    
    @Autowired
    UserService userService;

    public NotificationWebSocketHandler() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        Map<String, Object> messageMap = objectMapper.readValue(payload, Map.class);

        Integer groupId = (Integer) messageMap.get("groupId");
        GroupDTO groupDetail = groupService.getGroupDetail(groupId);

        String groupImage = groupDetail.getGroupImage();
        String groupName = groupDetail.getGroupName();

        Integer userId = (Integer) messageMap.get("userId");
        UserDTO userInfo = userService.getUserInfo(userId);
        
        String userNickname = userInfo.getUserNickname();
        
        String chat = (String) messageMap.get("message");
        String chatTime = (String) messageMap.get("chatTime");
        String profileImage = (String) messageMap.get("profileImage");

        Map<String, Object> latestChat = new HashMap<>();
        latestChat.put("groupId", groupId);
        latestChat.put("groupImage", groupImage);
        latestChat.put("groupName", groupName);
        latestChat.put("userNickname", userNickname);
        latestChat.put("chatMessage", chat);
        latestChat.put("chatTime", chatTime);
        latestChat.put("profileImage", profileImage);

        String latestChatMessage = objectMapper.writeValueAsString(latestChat);
        broadcastNotification(latestChatMessage);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
    }

    public void broadcastNotification(String message) throws Exception {
        for (WebSocketSession session : sessions.values()) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(message));
            }
        }
    }
}
