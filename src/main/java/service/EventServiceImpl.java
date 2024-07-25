package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.EventDAO;
import dto.EventDTO;
import dto.EventDTO2;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	EventDAO dao;
	
	@Override
	public List<EventDTO> getGroupEventList(int groupId) {
		return dao.getGroupEventList(groupId);
	}
	
	@Override
	public List<EventDTO2> getEventCurrentMemberAndMaximumMember(int groupId) {
		return dao.getEventCurrentMemberAndMaximumMember(groupId);
	}	

	//마이페이지 내 일정 가져오기
	@Override
	public List<EventDTO> getMyGroupEvent(int userId) {
		return dao.getMyGroupEvent(userId);
	}

}
