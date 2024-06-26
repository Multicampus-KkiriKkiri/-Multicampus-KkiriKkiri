package service;

import dto.NotificationDTO;

public interface NotificationService {
	
	NotificationDTO getNotification(NotificationDTO userIdAndGroupId);
	
	int insertNotification(NotificationDTO all);
	
	int deleteNotification();
	
	// 그룹별 알림 회원에게 전송
	void notifyToUserByGroup(int userId, int groupId, String notificationText);
	
}
