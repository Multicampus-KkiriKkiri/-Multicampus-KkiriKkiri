package dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.ChatDTO;
import dto.ChatVO;

@Repository
public class ChatDAO {
	
	@Autowired
	SqlSession session;

	public int insertChatMessage(HashMap map) {
		return session.insert("insertChatMessage", map);
	}
	
	public List<ChatDTO> getChats(int groupId) {
		return session.selectList("getChats", groupId);
	}
	
	public ChatDTO getLatestChatByGroupId(int groupId) {
        return session.selectOne("getLatestChatByGroupId", groupId);
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
	
}
