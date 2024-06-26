package service;

import java.util.List;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;

public interface GroupService {

	// 그룹 상세정보 가져오기
	GroupDTO getGroupDetail(int groupId);
	
	//지역 정보만 가졍괴,시,구
	List<RegionDTO> getAllRegions();
	
	List<DistrictDTO> getDistrictsByRegionId(int regionId);
	
	public void registerGroup(GroupDTO groupDTO);
}
