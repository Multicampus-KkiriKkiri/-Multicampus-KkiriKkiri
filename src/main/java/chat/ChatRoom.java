package chat;
 
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
 
public class ChatRoom {
     String id;
     
     Map<String, WebSocketSession> sessions = new HashMap<>(); // 웹소켓 세션을 userId와 연결
 
    public ChatRoom(String room_id) { 
        this.id = room_id;
    }
   
    // 메세지 처리(접속/전송)
    public void handleMessage(WebSocketSession session, ChatMessage chatMessage, ObjectMapper objectMapper) throws JsonProcessingException {
        String userId = chatMessage.getUserId(); // 현재 접속한 userId 가져오기
    	
    	if ("JOIN".equals(chatMessage.getType())) 
            join(session, userId); // session, userId 를 join 메소드에 전달
        else
            send(chatMessage, objectMapper);
    }
 
    // 채팅방 접속
    private void join(WebSocketSession session, String userId) {
    	// 기존 접속 sessions Map에 현재 접속한 userId가 없을 때만 연결
    	if (!sessions.containsKey(userId)) { 
            sessions.put(userId, session);
            System.out.println("추가 후 chatRoomId = " + this.id + ", 클라이언트 수 = " + sessions.size() + " - " + session.getRemoteAddress() + " ip에서 접속 중");
        }
    }
    
    // 메세지 전송
    private <T> void send(T messageObject, ObjectMapper objectMapper) throws JsonProcessingException {
        TextMessage message = new TextMessage(objectMapper.writeValueAsString(messageObject));
  
        sessions.values().parallelStream().forEach(session -> {
            try {
                session.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
    
    // 채팅방 접속 해제
    public void remove(WebSocketSession target) {
      String targetId = target.getId();
      
      // 연결 해제 시 sessions Map에서 세션 제거
      sessions.values().removeIf(session -> session.getId().equals(targetId));
  
      System.out.println("삭제 후 chatRoomId = " + this.id + ", 클라이언트 수 = " + sessions.size() + " - " + target.getRemoteAddress() + " ip에서 접속 해제");
    }
 
    public String getId() {
        return id;
    }
 
    public Set<WebSocketSession> getSessions() {
    	return new HashSet<>(sessions.values()); // Map을 Set으로 변환
    }
    
    // sessions의 길이 반환
    public int getSessionsSize() {
        return sessions.size();
    }
 
}