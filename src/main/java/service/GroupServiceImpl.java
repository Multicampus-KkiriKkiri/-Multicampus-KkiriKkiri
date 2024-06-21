package service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.GroupDAO;
import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;

@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	GroupDAO dao;

	@Override
	public GroupDTO getGroupDetail(int groupId) {
		return dao.getGroupDetail(groupId);
	}
	
	@Override
	public List<RegionDTO> getAllRegions() {
		return dao.getAllRegions();
	}

	@Override
	public List<DistrictDTO> getDistrictsByRegionId(int regionId) {
		return dao.getDistrictsByRegionId(regionId);
	}
}	
