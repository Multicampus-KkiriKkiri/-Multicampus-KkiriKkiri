package service;


import dto.GroupDTO;

public interface GroupService {

	// 그룹 상세정보 가져오기
	GroupDTO getGroupDetail(int groupId);
	
}
