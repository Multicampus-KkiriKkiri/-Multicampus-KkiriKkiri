package dto;

import lombok.Getter;

@Getter
public class ChatDTO {
	
	int chatId;
	int groupId;
	int userId;
	String chatMessage;
	String chatTime;
	
}
