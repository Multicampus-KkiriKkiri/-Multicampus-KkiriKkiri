package dto;

import lombok.Getter;

@Getter
public class NotificationDTO {

	int notificationId;
	int userId;
	int groupId;
	String notificationTime;
	String notificationText;
	
}
