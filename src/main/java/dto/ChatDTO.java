package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class ChatDTO {
	
	int chatId;
	int groupId;
	int userId;
	String chatMessage;
	String chatTime;
	
}
