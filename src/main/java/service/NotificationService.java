package service;

import java.util.List;

import dto.NotificationDTO;

public interface NotificationService {
	
	List<NotificationDTO> getNotification(int userId, int offset, int size);
	
	int insertNotification(NotificationDTO all);
	
	int deleteNotification(int notificationId);
	
	// 그룹별 알림 회원에게 전송
	void notifyToUserByGroup(int userId, int groupId, String notificationText);
	
	void deleteOldNotifications();
	
}
