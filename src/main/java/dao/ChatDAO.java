package dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.ChatVO;

@Repository
public class ChatDAO {
	
	@Autowired
	SqlSession session;

	public int insertChatMessage(HashMap map) {
		return session.insert("insertChatMessage", map);
	}

	public ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map) {
		List<ChatVO> resultList = session.selectList("getChatHistoryByGroupId", map);
		ArrayList<HashMap<String, Object>> chatHistoryList = new ArrayList<>();
		
		for(Object result : resultList) {
			if(result instanceof HashMap) {
				chatHistoryList.add((HashMap<String, Object>) result);
			}
		}
		
		return chatHistoryList;
	}

	public int moveOldChatsToHistory() {
		return session.insert("moveOldChatsToHistory");
	}

	public int deleteOldChatsFromChat() {
		return session.delete("deleteOldChatsFromChat");
	}

	public int deleteQuitMemberChatInChat(HashMap map) {
		return session.delete("deleteQuitMemberChatInChat");
	}

	public int deleteQuitMemberChatInChatHistroy(HashMap map) {
		return session.delete("deleteQuitMemberChatInChatHistroy");
	}
	
}
