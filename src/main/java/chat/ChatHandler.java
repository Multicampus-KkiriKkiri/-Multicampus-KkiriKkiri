package chat;
 

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
 
public class ChatHandler extends TextWebSocketHandler {
    
    ObjectMapper objectMapper = new ObjectMapper();
    ChatRoomRepository repository = new ChatRoomRepository();
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {  
    	String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        ChatRoom chatRoom = repository.getChatRoom(chatMessage.getChatRoomId());   
        
        // 메세지 전송 처리
        chatRoom.handleMessage(session, chatMessage, objectMapper);
    }
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	// WebSocket 연결이 닫힐 때 호출
        ChatRoom chatRoom = findChatRoomBySession(session);
        if (chatRoom != null) {
            chatRoom.remove(session);
        }
    }
    
    private ChatRoom findChatRoomBySession(WebSocketSession session) {
        for (ChatRoom chatRoom : ChatRoomRepository.getChatRooms().values()) {
            if (chatRoom.getSessions().contains(session)) {
                return chatRoom;
            }
        }
        return null;
    }
    
}