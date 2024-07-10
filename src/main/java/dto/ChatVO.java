package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class ChatVO {
	
	private int userId;
	private String chatMessage;
	private String chatTime;
	private String userNickname;
	private String profileImage;
	
}
