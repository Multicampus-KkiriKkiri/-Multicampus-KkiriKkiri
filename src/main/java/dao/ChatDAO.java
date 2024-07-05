package dao;

import java.util.List;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.ChatDTO;

@Repository
public class ChatDAO {
	
	@Autowired
	SqlSession session;

	public int insertChatMessage(HashMap map) {
		return session.insert("insertChatMessage", map);
	}
	
	public List<ChatDTO> getChats(int userId) {
		return session.selectList("getChats", userId);
	}
	
}
