package dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.UserDTO;


@Repository
public class GroupMemberDAO {

	@Autowired
	SqlSession session;
	
	public int addMemberToGroup(HashMap map) {
		return session.insert("addMemberToGroup", map);
	}
	
	public int updateMemberToGroup(HashMap map) {
		return session.update("updateMemberToGroup", map);
	}
	
	public int getMemberCountInGroup(int groupId) {
		return session.selectOne("getMemberCountInGroup", groupId);
	}
	
	public List<UserDTO> getGroupMemberList(int groupId) {
		return session.selectList("getGroupMemberList", groupId);
	}

	public int checkMemberInGroup(HashMap map) {
		return session.selectOne("checkMemberInGroup", map);
	}

	public String checkUserHistoryInGroup(HashMap map) {
		return session.selectOne("checkUserHistoryInGroup", map);
	}
	
}
