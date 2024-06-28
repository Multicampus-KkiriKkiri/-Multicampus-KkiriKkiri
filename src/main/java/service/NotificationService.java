package service;

import java.util.List;

import dto.NotificationDTO;

public interface NotificationService {
	
	List<NotificationDTO> getNotification(NotificationDTO userIdAndGroupId);
	
	int insertNotification(NotificationDTO all);
	
	int deleteNotification(int notificationId);
	
	// 그룹별 알림 회원에게 전송
	void notifyToUserByGroup(int userId, int groupId, String notificationText);
	
}
