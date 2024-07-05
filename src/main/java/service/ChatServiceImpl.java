package service;

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
	public int insertChat(ChatDTO all) {
		return dao.insertChat(all);
	}
	
	
}
