package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface ChatService {
	
	//userId로 모임장 및 모임원으로 설정된 groupId 모두 가져오기
	List<Integer> getGroupIds(int userId);
	
	// 채팅 메세지 저장
	int insertChatMessage(HashMap map);
	
	// 모임 채팅 내역 가져오기
	ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map);

	// 30일 넘은 채팅 메세지 'chat_history' 테이블로 이동 후 'chat' 테이블에서 삭제
	int moveOldChatsToHistory();
  
}
