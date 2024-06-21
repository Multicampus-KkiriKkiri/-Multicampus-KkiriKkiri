package service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.GroupMemberDAO;
import dto.UserDTO;

@Service
public class GroupMemberServiceImpl implements GroupMemberService {

	@Autowired
	GroupMemberDAO dao;
	
	@Override
	public int addMemberToGroup(HashMap map) {
		return dao.addMemberToGroup(map);
	}
	
	@Override
	public int updateMemberToGroup(HashMap map) {
		return dao.updateMemberToGroup(map);
	}
	
	@Override
	public int getMemberCountInGroup(int groupId) {
		// group_member 테이블의 각 group별 모임원 수 + 모임장(1명) = 각 group 총 인원
		return dao.getMemberCountInGroup(groupId) + 1;
	}

	@Override
	public List<UserDTO> getGroupMemberList(int groupId) {
		return dao.getGroupMemberList(groupId);
	}

	@Override
	public boolean checkMemberInGroup(HashMap map) {
		// 모임원 여부 확인
		if(dao.checkMemberInGroup(map) == 1) { // 모임원 인 경우
			return true;
		} else { // 모임원 아닌경우
			return false;
		}
	}

	@Override
	public String checkUserHistoryInGroup(HashMap map) {
		return dao.checkUserHistoryInGroup(map);
	}

}
