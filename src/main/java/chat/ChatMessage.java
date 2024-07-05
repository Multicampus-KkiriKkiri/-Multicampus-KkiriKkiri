package chat;

public class ChatMessage {
    private String chatRoomId;
    private String message;
    private String type;
    private String userId;
    private String chatTime;
    
	public String getChatRoomId() {
		return chatRoomId;
	}
	
	public String getMessage() {
		return message;
	}
	
	public String getType() {
		return type;
	}
	
	public String getUserId() {
        return userId;
    }
	
	public String getChatTime() {
        return chatTime;
    }
     
}