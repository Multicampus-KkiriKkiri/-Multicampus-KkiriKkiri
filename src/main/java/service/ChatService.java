package service;

import java.util.ArrayList;
import java.util.HashMap;

public interface ChatService {
	
	// 채팅 메세지 저장
	int insertChatMessage(HashMap map);
	
	// 모임 채팅 내역 가져오기
	ArrayList<HashMap<String, Object>> getChatHistoryByGroupId(HashMap map);

	// 30일 넘은 채팅 메세지 'chat_history' 테이블로 이동 후 'chat' 테이블에서 삭제
	int moveOldChatsToHistory();

	// 모임 탈퇴하는 회원의 모임 내 채팅 기록 삭제('chat', 'chat_history' 테이블 둘 다)
	void deleteQuitMemberChatHistory(HashMap map);
  
}
