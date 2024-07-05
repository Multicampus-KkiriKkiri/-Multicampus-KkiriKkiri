package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.ChatDTO;

@Repository
public class ChatDAO {

	@Autowired
	SqlSession session;
	
	public List<ChatDTO> getChats(int userId) {
		return session.selectList("getChats", userId);
	}
	
	public int insertChat(ChatDTO all) {
		return session.insert("insertChat", all);
	}
	
}
