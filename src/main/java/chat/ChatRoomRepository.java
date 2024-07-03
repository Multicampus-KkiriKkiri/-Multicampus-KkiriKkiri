package chat;
 
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;


public class ChatRoomRepository {
 
    Map<String, ChatRoom> chatRoomMap = new HashMap<String, ChatRoom>(); 
	public static Collection<ChatRoom> chatRooms;
    
    public ChatRoomRepository() {
        for(int i=1;i<500;i++) {  
            ChatRoom chatRoom = new ChatRoom(String.valueOf(i));
            chatRoomMap.put(chatRoom.getId(), chatRoom);
//            System.out.println("chatRoom 클래스를 복제하고 있습니다.");
//            System.out.println("chatRoom -> "+chatRoom);
           }            
         chatRooms = chatRoomMap.values();
    }
        
    public ChatRoom getChatRoom(String id) {
        return chatRoomMap.get(id);
    }
    
    public Map<String, ChatRoom> getChatRooms() {
        return chatRoomMap;
    }
        
    public void remove(WebSocketSession session) {
        this.chatRooms.parallelStream().forEach(chatRoom -> chatRoom.remove(session));
    } 
    
}