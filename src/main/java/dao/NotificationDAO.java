package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.NotificationDTO;

@Repository
public class NotificationDAO {
	
	@Autowired
	SqlSession session;
	
	public List<NotificationDTO> getNotification(NotificationDTO userIdAndGroupId) {
		return session.selectOne("getNotification", userIdAndGroupId);
	}
	
	public int insertNotification(NotificationDTO all) {
		return session.insert("insertNotification", all);
	}
	
	public int deleteNotification(int notificationId) {
		return session.delete("deleteNotification");
	}

}
