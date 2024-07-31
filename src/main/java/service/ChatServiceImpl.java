package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ChatDAO;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	ChatDAO dao;
	
	@Override
	public List<Integer> getGroupIds(int userId) {
		return dao.getGroupIds(userId);
	}

	
	@Override
	public int insertChatMessage(HashMap map) {
		return dao.insertChatMessage(map);
	}

	@Override
	public ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map) {
		return dao.getChatHistoryByGroupId(map);
	}

	@Override
	public int moveOldChatsToHistory() {
		// 30일 지난 채팅 메세지 'chat_history' 테이블로 이동
		dao.moveOldChatsToHistory();

		// 30일 지난 채팅 메세지 'chat' 테이블에서 삭제
		return dao.deleteOldChatsFromChat();
	}

	
}
