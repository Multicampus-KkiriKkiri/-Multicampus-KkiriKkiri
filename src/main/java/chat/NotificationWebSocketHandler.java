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
import service.GroupService;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper;

    @Autowired
    GroupService groupService;

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
        Integer userId = (Integer) messageMap.get("userId");

        if (groupId == null || userId == null) {
            return;
        }

        GroupDTO groupDetail = groupService.getGroupDetail(groupId);
        if (groupDetail == null) {
            return;
        }

        String groupImage = groupDetail.getGroupImage();
        String groupName = groupDetail.getGroupName();
        String userNickname = (String) messageMap.get("userNickname");
        String chatMessage = (String) messageMap.get("message");
        String chatTime = (String) messageMap.get("chatTime");
        String profileImage = (String) messageMap.get("profileImage");

        Map<String, Object> latestChat = new HashMap<>();
        latestChat.put("groupId", groupId);
        latestChat.put("groupImage", groupImage);
        latestChat.put("groupName", groupName);
        latestChat.put("userNickname", userNickname);
        latestChat.put("chatMessage", chatMessage);
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
