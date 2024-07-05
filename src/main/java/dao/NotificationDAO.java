package dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.NotificationDTO;

@Repository
public class NotificationDAO {
	
	@Autowired
	SqlSession session;
	
	public List<NotificationDTO> getNotification(int userId, int offset, int size) {
		Map<String, Object> params = new HashMap<>();
	    params.put("userId", userId);
	    params.put("offset", offset);
	    params.put("size", size);
		return session.selectList("getNotification", params);
	}
	
	public int insertNotification(NotificationDTO all) {
		return session.insert("insertNotification", all);
	}
	
	public int deleteNotification(int notificationId) {
		return session.delete("deleteNotification", notificationId);
	}
	
	public int deleteOldNotifications() {
	    return session.delete("deleteOldNotifications");
	}

}
