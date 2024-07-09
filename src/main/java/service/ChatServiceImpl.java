package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ChatDAO;
import dto.ChatDTO;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	ChatDAO dao;
	
	@Override
	public List<ChatDTO> getChats(int userId) {
		return dao.getChats(userId);
	}
	
	@Override
	public int insertChatMessage(HashMap map) {
		return dao.insertChatMessage(map);
	}

	@Override
	public ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map) {
		return dao.getChatHistoryByGroupId(map);
	}

}
