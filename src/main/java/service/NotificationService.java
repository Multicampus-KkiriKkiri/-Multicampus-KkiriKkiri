package service;

import dto.NotificationDTO;

public interface NotificationService {
	
	NotificationDTO getNotification(NotificationDTO userIdAndGroupId);
	
	int insertNotification(NotificationDTO all);
	
	int deleteNotification();
	
}
