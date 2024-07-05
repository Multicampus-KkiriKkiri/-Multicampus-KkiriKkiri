package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.NotificationDAO;
import dto.NotificationDTO;

@Service
public class NotificationServiceImple implements NotificationService {
	
	@Autowired
	NotificationDAO dao;

	@Override
	public List<NotificationDTO> getNotification(int userId, int offset, int size) {
		return dao.getNotification(userId, offset, size);
	}

	@Override
	public int insertNotification(NotificationDTO all) {
		return dao.insertNotification(all);
	}

	@Override
	public int deleteNotification(int notificationId) {
		return dao.deleteNotification(notificationId);
	}

	@Override
	public void notifyToUserByGroup(int userId, int groupId, String notificationText) {
		NotificationDTO dto = new NotificationDTO();
		dto.setUserId(userId);
		dto.setGroupId(groupId);
		dto.setNotificationText(notificationText);
		
		dao.insertNotification(dto);
	}
	
	@Override
    public void deleteOldNotifications() {
        dao.deleteOldNotifications();
    }

}
