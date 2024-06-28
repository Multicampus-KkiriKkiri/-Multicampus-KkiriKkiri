package service;

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
}
