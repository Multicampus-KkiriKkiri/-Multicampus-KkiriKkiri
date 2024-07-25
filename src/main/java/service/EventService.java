package service;

import java.util.List;

import dto.EventDTO;
import dto.EventDTO2;

public interface EventService {
	
	// 모임의 일정 목록 가져오기
	List<EventDTO> getGroupEventList(int groupId);
	
	// 모임 내 일정들의 현재 신청 인원과 최대 인원 가져오기
	List<EventDTO2> getEventCurrentMemberAndMaximumMember(int groupId);
	
	//마이페이지 내 일정 가져오기
	List<EventDTO> getMyGroupEvent(int userId);
}
