package service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ChatDAO;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	ChatDAO dao;
	
	@Override
	public int insertChatMessage(HashMap map) {
		return dao.insertChatMessage(map);
	}

	@Override
	public ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map) {
		return dao.getChatHistoryByGroupId(map);
	}
	
}
