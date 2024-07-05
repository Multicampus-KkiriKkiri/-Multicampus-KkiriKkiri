package chat;
 
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;


public class ChatRoomRepository {
 
    public static Map<String, ChatRoom> chatRoomMap = new HashMap<String, ChatRoom>(); 
	public static Collection<ChatRoom> chatRooms;
    
    public ChatRoomRepository() {
        for(int i=1;i<500;i++) {  
            ChatRoom chatRoom = new ChatRoom(String.valueOf(i));
            chatRoomMap.put(chatRoom.getId(), chatRoom);
           }            
         chatRooms = chatRoomMap.values();
    }
        
    public ChatRoom getChatRoom(String id) {
        return chatRoomMap.get(id);
    }
    
    public static Map<String, ChatRoom> getChatRooms() {
        return chatRoomMap;
    }
        
    public void remove(WebSocketSession session) {
        this.chatRooms.parallelStream().forEach(chatRoom -> chatRoom.remove(session));
    } 
    
}