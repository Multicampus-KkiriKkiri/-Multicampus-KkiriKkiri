package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDTO {

	int notificationId;
	int userId;
	int groupId;
	String notificationTime;
	String notificationText;
	
}
