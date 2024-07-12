package service;

import java.util.ArrayList;
import java.util.HashMap;
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
    
    // 지역(Region) 이름 가져오기
    @Override
    public String getRegionNameByRegionId(int regionId) {
    	return dao.getRegionNameByRegionId(regionId);
    }

    // 하위 지역 정보 가져오기
    @Override
    public List<DistrictDTO> getDistrictsByRegionId(int regionId) {
        return dao.getDistrictsByRegionId(regionId);
    }
    
    // 하위 지역(District) 이름 가져오기
    @Override
    public String getDistrictNameByDistrictId(int districtId) {
    	return dao.getDistrictNameByDistrictId(districtId);
    }
    //모임이름 중복 체크
 
    @Override
    public boolean checkGroupNameExists(String groupName) {
        return dao.existsByGroupName(groupName);
    }
    
    @Transactional
    @Override
    public int registerGroup(GroupDTO groupDTO) {
        //return dao.saveGroup(groupDTO); // 등록된 그룹의 ID 반환
        try {
            return dao.saveGroup(groupDTO);
        } catch (Exception e) {
            // 예외 처리 로직 추가
            throw new RuntimeException("모임 등록 중 오류가 발생했습니다.", e);
        }
    }
    //모임 ID로 모임 정보를 가져오z
    @Override
    public GroupDTO getGroupById(int groupId) {
        return dao.findGroupById(groupId);
    }

  //메인페이지 로그인 후 내 모임 정보 가져오기 - 지역정보
	@Override
	public List<String> getRegionName(int regionId) {
		return dao.getRegionName(regionId);
	}

	@Override
	public List<String> getDistrictName(int districtId) {
		return dao.getDistrictName(districtId);
	}

	//메인페이지 관심사별 그룹 내용 가져오기
	@Override
	public ArrayList<HashMap<String, Object>> getGroupDetailsByInterestId(int interestId) {
		return dao.getGroupDetailsByInterestId(interestId);
	}

	//메인페이지 로그인전 신상 그룹 가져오기
	@Override
	public List<GroupDTO> getNewestGroupDetails() {
		return dao.getNewestGroupDetails();
	}    
    
}




