package service;

import java.util.List;
import java.util.HashMap;

import dto.ChatDTO;

public interface ChatService {
	
	List<ChatDTO> getChats(int userId);
	
	// 채팅 메세지 저장
	int insertChatMessage(HashMap map);
	
}
