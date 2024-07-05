package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dao.GroupDAO;
import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupDAO dao;

    // 그룹 상세 정보 가져오기
    @Override
    public GroupDTO getGroupDetail(int groupId) {
        return dao.getGroupDetail(groupId);
    }

    // 지역 정보 (시,도) 가져오기
    @Override
    public List<RegionDTO> getAllRegions() {
        return dao.getAllRegions();
    }

    // 하위 지역 정보 가져오기
    @Override
    public List<DistrictDTO> getDistrictsByRegionId(int regionId) {
        return dao.getDistrictsByRegionId(regionId);
    }

    // 새로운 그룹 등록
    @Transactional
    @Override
    public int registerGroup(GroupDTO groupDTO) {
        return dao.saveGroup(groupDTO); // 등록된 그룹의 ID 반환
    }
    //모임 ID로 모임 정보를 가져오z
    @Override
    public GroupDTO getGroupById(int groupId) {
        return dao.findGroupById(groupId);
    }
}
