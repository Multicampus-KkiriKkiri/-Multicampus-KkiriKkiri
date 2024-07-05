package service;

import java.util.List;

import dto.ChatDTO;

public interface ChatService {
	
	List<ChatDTO> getChats(int userId);
	
	int insertChat(ChatDTO all);	
	
}
