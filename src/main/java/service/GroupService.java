package service;

import java.util.ArrayList;

import dto.GroupDTO;
import dto.UserDTO;

public interface GroupService {

	// 그룹 상세정보 가져오기
	GroupDTO getGroupDetail(int groupId);
	
	// 그룹 멤버 목록 가져오기
	ArrayList<UserDTO> getGroupMemberList(int groupId);
	
	// 모임 가입
	int addMemberToGroup(int userId, int groupId); 
	
	// 모임에서 멤버 삭제(탈퇴/강퇴)
	int removeMemberFromGroup(int userId, int groupId);
	
	// 모임 찜목록에 추가
	int addGroupToWishlist(int userId, int groupId); 
	
}