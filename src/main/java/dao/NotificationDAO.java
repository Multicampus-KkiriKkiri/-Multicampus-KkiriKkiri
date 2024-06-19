package dao;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.NotificationDTO;

@Repository
public class NotificationDAO {
	
	@Autowired
	SqlSession session;
	
	public String getNotificationText(NotificationDTO userIdAndGroupId) {
		return session.selectOne("getNotificationText", userIdAndGroupId);
	}
	
	public int insertNotification(NotificationDTO all) {
		return session.insert("insertNotification", all);
	}
	
	public int deleteNotification() {
		return session.delete("deleteNotification");
	}
}
