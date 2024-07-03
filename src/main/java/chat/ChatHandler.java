package chat;
 
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
 
public class ChatHandler extends TextWebSocketHandler {
    
    ObjectMapper objectMapper = new ObjectMapper();
    ChatRoomRepository repository = new ChatRoomRepository();
    
    // 웹소켓 연결 클라이언트 모음
 	List<WebSocketSession> list = new ArrayList();
 	
 	@Override
 	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
 		// 웹소켓연결시점에 1번 실행
 		// 웹소켓 연결 클라이언트 list add
 		list.add(session);
 		System.out.println("추가 후 클라이언트 수 = " + list.size() + " - " + session.getRemoteAddress() + " ip에서 접속 중");
 		
 	}
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {  
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        ChatRoom chatRoom = repository.getChatRoom(chatMessage.getChatRoomId());   
        chatRoom.handleMessage(session, chatMessage, objectMapper);
 
    }
    
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    	repository.remove(session);
	    
    	// 웹소켓해제시점에 1번 실행
    	// 웹소켓 연결 클라이언트 list remove
	    list.remove(session);
	    System.out.println("삭제 후 클라이언트 수 = " + list.size() + " - " + session.getRemoteAddress() + " ip에서 접속 해제");
    }
    
}