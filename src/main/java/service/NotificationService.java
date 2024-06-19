package service;

import dto.NotificationDTO;

public interface NotificationService {
	String getNotificationText(NotificationDTO userIdAndGroupId);
	int insertNotification(NotificationDTO all);
	int deleteNotification();
}
