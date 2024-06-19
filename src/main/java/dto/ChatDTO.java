package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class ChatDTO {
	
	private int chatId;
	private int groupId;
	private int userId;
	private String chatMessage;
	private String chatTime;
	
}
