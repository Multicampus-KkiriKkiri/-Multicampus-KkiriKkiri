package service;

import java.util.HashMap;
import java.util.List;

import dto.UserDTO;

public interface EventMemberService {
	
	// 일정 참여 신청
	int addMemberToEvent(HashMap map);

	// 일정 참여 취소
	int deleteMemberToEvent(HashMap map);

	// 모임원의 모임 내 일정 참여 신청 내역 가져오기
	List<Integer> getMemberEventAttendApplyHistory(HashMap map);
	
	// 일정 참여 신청한 모임원 목록 가져오기
	List<UserDTO> getAttendMemberListByEventId(int eventId);

}
