package service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.EventMemberDAO;
import dto.UserDTO;

@Service
public class EventMemberServiceImpl implements EventMemberService {

	@Autowired
	EventMemberDAO dao;
	
	@Override
	public int addMemberToEvent(HashMap map) {
		return dao.addMemberToEvent(map);
	}
	
	@Override
	public int deleteMemberToEvent(HashMap map) {
		return dao.deleteMemberToEvent(map);
	}
	
	@Override
	public List<Integer> getMemberEventAttendApplyHistory(HashMap map) {
		return dao.getMemberEventAttendApplyHistory(map);
	}

	@Override
	public List<UserDTO> getAttendMemberListByEventId(int eventId) {
		return dao.getAttendMemberListByEventId(eventId);
	}

}
