package dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.UserDTO;

@Repository
public class EventMemberDAO {
	
	@Autowired
	SqlSession session;
	
	public int addMemberToEvent(HashMap map) {
		return session.insert("addMemberToEvent", map);
	}
	
	public int deleteMemberToEvent(HashMap map) {
		return session.delete("deleteMemberToEvent", map);
	}

	public List<Integer> getMemberEventAttendApplyHistory(HashMap map) {
		return session.selectList("getMemberEventAttendApplyHistory", map);
	}

	public List<UserDTO> getAttendMemberListByEventId(int eventId) {
		return session.selectList("getAttendMemberListByEventId", eventId);
	}

}
