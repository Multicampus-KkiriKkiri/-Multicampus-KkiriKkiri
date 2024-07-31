package service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dao.GroupDAO;	
import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import dto.UserDTO;

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
	
	// 그룹 마지막 업데이트 시간 가져오기
	  @Override
	  public Timestamp getGroupLastUpdateTime(int groupId) {
	    return dao.getGroupLastUpdateTime(groupId);
	  }

	//마이페이지 - 사용자가 모임장인 그룹 가져오기
	@Override
	public List<GroupDTO> getGroupDetailAsLeader(int userId) {
		return dao.getGroupDetailAsLeader(userId);
	}   
	// 그룹 설정 페이지 ------------------------------------------------------------
	// 그룹 정보 업데이트
    @Transactional
    @Override
    public void updateGroup(GroupDTO groupDTO) {
        dao.updateGroup(groupDTO);
    }

    // 그룹 삭제
    @Transactional
    @Override
    public void deleteGroup(int groupId) {
        dao.deleteGroup(groupId);
    }

    @Override
    public String getExistingGroupImageFilename(int groupId) {
        return dao.getExistingGroupImageFilename(groupId);
    }
    @Transactional
    @Override
    public void updateGroupInfo(int groupId, Map<String, String> params, String newImageFilename) {
        // 기존 그룹 정보 조회
        GroupDTO existingGroup = dao.getGroupDetail(groupId);

        if (existingGroup != null) {
            // 각 파라미터의 값을 안전하게 업데이트
            if (params.containsKey("groupName") && params.get("groupName") != null) {
                existingGroup.setGroupName(params.get("groupName"));
            }

            if (params.containsKey("groupDetail") && params.get("groupDetail") != null) {
                existingGroup.setGroupDetail(params.get("groupDetail"));
            }

            if (params.containsKey("groupRegionId") && !params.get("groupRegionId").isEmpty()) {
                try {
                    existingGroup.setGroupRegionId(Integer.parseInt(params.get("groupRegionId")));
                } catch (NumberFormatException e) {
                    // 예외 처리 또는 기본값 설정
                    existingGroup.setGroupRegionId(-1); // 기본값 설정, 예를 들면 -1
                }
            }

            if (params.containsKey("groupDistrictId") && !params.get("groupDistrictId").isEmpty()) {
                try {
                    existingGroup.setGroupDistrictId(Integer.parseInt(params.get("groupDistrictId")));
                } catch (NumberFormatException e) {
                    existingGroup.setGroupDistrictId(-1);
                }
            }

            if (params.containsKey("groupType") && params.get("groupType") != null) {
                existingGroup.setGroupType(params.get("groupType"));
            }

            if (params.containsKey("groupInterestId") && !params.get("groupInterestId").isEmpty()) {
                try {
                    existingGroup.setGroupInterestId(Integer.parseInt(params.get("groupInterestId")));
                } catch (NumberFormatException e) {
                    existingGroup.setGroupInterestId(-1);
                }
            }

            if (params.containsKey("groupSignUpType") && params.get("groupSignUpType") != null) {
                existingGroup.setGroupSignUpType(params.get("groupSignUpType"));
            }

            if (params.containsKey("groupMaximum") && !params.get("groupMaximum").isEmpty()) {
                try {
                    existingGroup.setGroupMaximum(Integer.parseInt(params.get("groupMaximum")));
                } catch (NumberFormatException e) {
                    existingGroup.setGroupMaximum(0); // 기본값 설정
                }
            }

            if (params.containsKey("groupSignUpQuestion") && params.get("groupSignUpQuestion") != null) {
                existingGroup.setGroupSignUpQuestion(params.get("groupSignUpQuestion"));
            }

            // 이미지 파일 이름 업데이트
            if (newImageFilename != null) {
                existingGroup.setGroupImage(newImageFilename);
            }

            // 그룹 정보 저장
            dao.updateGroup(existingGroup);
        }
    }

    


    // 그룹 설정 페이지 끝 ------------------------------------------------------------
}




