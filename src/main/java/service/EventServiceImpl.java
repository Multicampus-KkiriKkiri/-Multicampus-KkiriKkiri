package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.EventDAO;
import dto.EventDTO;

@Service
public class EventServiceImpl implements EventService {

	@Autowired
	EventDAO dao;
	
	@Override
	public List<EventDTO> getGroupEventList(int groupId) {
		return dao.getGroupEventList(groupId);
	}

	//마이페이지 내 일정 가져오기
	@Override
	public List<EventDTO> getMyGroupEvent(int userId) {
		return dao.getMyGroupEvent(userId);
	}	

}
