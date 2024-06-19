package service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.GroupMemberDAO;
import dto.UserDTO;

@Service
public class GroupMemberServiceImpl implements GroupMemberService {

	@Autowired
	GroupMemberDAO dao;
	
	@Override
	public int getMemberCountInGroup(int groupId) {
		// group_member 테이블의 각 group별 모임원 수 + 모임장(1명) = 각 group 총 인원
		return dao.getMemberCountInGroup(groupId) + 1;
	}

	@Override
	public ArrayList<UserDTO> getGroupMemberList(int groupId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int addMemberToGroup(int userId, int groupId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int removeMemberFromGroup(int userId, int groupId) {
		// TODO Auto-generated method stub
		return 0;
	}

}
