package service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;

public interface GroupService {

    // 그룹 상세 정보 가져오기
	GroupDTO getGroupDetail(int groupId);
	
    // 지역 정보 (시,도) 가져오기
	List<RegionDTO> getAllRegions();
	
    // 하위 지역 정보 가져오기
	List<DistrictDTO> getDistrictsByRegionId(int regionId);
	
    // 새로운 그룹 등록
	int registerGroup(GroupDTO groupDTO);
	
	GroupDTO getGroupById(int groupId);
		
	//메인페이지 로그인 후 내 모임 정보 가져오기 - 지역정보
	List<String> getRegionName(int regionId);
	
	List<String> getDistrictName(int districtId);
	
	//메인페이지 관심사별 그룹 내용 가져오기
	ArrayList<HashMap<String, Object>> getGroupDetailsByInterestId(int interestId);
	
	//메인페이지 로그인전 신상 그룹 가져오기
	List<GroupDTO> getNewestGroupDetails();
	
}














