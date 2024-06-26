package service;

import java.util.HashMap;
import java.util.List;

import dto.UserDTO;

public interface GroupMemberService {
	
	// 모임 가입
	int addMemberToGroup(HashMap map); 
	
	// 모임원 status 정보 수정(재가입/탈퇴/강퇴)
	int updateMemberToGroup(HashMap map);
	
	// 모임의 총 인원 조회
	int getMemberCountInGroup(int groupId);
		
	// 모임의 모임원 목록 가져오기
	List<UserDTO> getGroupMemberList(int groupId);
	
	// 모임 내 모임원 상태 확인(대기/승인/탈퇴/강퇴)
	String checkMemberStatusInGroup(HashMap map);
	
	// 모임 내 탈퇴/강퇴 내역 확인
	String checkUserHistoryInGroup(HashMap map);
	
}
