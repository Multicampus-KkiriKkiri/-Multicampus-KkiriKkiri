package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class NotificationDTO {

	private int notificationId;
	private int userId;
	private int groupId;
	private String notificationTime;
	private String notificationText;
	
}
