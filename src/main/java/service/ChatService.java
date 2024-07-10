package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import dto.ChatDTO;

public interface ChatService {
	
	List<ChatDTO> getChats(int userId);
	
	// 채팅 메세지 저장
	int insertChatMessage(HashMap map);
	
	// 모임 채팅 내역 가져오기
	ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map);
	
}
