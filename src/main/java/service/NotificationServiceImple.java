package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.NotificationDAO;
import dto.NotificationDTO;

@Service
public class NotificationServiceImple implements NotificationService {
	
	@Autowired
	NotificationDAO dao;

	@Override
	public String getNotificationText(NotificationDTO userIdAndGroupId) {
		return dao.getNotificationText(userIdAndGroupId);
	}

	@Override
	public int insertNotification(NotificationDTO all) {
		return dao.insertNotification(all);
	}

	@Override
	public int deleteNotification() {
		return dao.deleteNotification();
	}

}
