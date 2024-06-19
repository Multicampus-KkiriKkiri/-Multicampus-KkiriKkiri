package service;

import java.util.ArrayList;

import dto.UserDTO;

public interface GroupMemberService {

	// 모임의 총 인원 조회
	int getMemberCountInGroup(int groupId);
	
	// 모임의 모임원 목록 가져오기
	ArrayList<UserDTO> getGroupMemberList(int groupId);
	
	// 모임 가입
	int addMemberToGroup(int userId, int groupId); 
	
	// 모임에서 멤버 삭제(탈퇴/강퇴)
	int removeMemberFromGroup(int userId, int groupId);
	
}
