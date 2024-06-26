package service;

import java.util.List;

import dto.EventDTO;

public interface EventService {
	
	// 모임의 일정 목록 가져오기
	List<EventDTO> getGroupEventList(int groupId);

}
