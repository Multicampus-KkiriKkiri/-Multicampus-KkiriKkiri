package dao;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import dto.UserDTO;

@Repository
public class GroupDAO {

    @Autowired
    SqlSession session;

    // 그룹 상세 정보 가져오기
    public GroupDTO getGroupDetail(int groupId) {
        return session.selectOne("group-mapping.getGroupDetail", groupId);
    }

    // 지역(Region) 정보 가져오기
    public List<RegionDTO> getAllRegions() {
        return session.selectList("group-mapping.getAllRegions");
    }

    // 지역(Region) 이름 가져오기
    public String getRegionNameByRegionId(int regionId) {
        return session.selectOne("group-mapping.getRegionNameByRegionId", regionId);
    }

    // 하위 지역(District) 정보 가져오기
    public List<DistrictDTO> getDistrictsByRegionId(int regionId) {
        return session.selectList("group-mapping.getDistrictsByRegionId", regionId);
    }

    // 하위 지역(District) 이름 가져오기
    public String getDistrictNameByDistrictId(int districtId) {
        return session.selectOne("group-mapping.getDistrictNameByDistrictId", districtId);
    }

    // 모임 이름 중복 체크
    public boolean existsByGroupName(String groupName) {
        Integer count = session.selectOne("group-mapping.existsByGroupName", groupName);
        return count != null && count > 0;
    }

    // 모임 등록
    public int saveGroup(GroupDTO groupDTO) {
        session.insert("group-mapping.saveGroup", groupDTO);
        return groupDTO.getGroupId(); // 등록된 그룹의 ID 반환
    }

    // 그룹 ID로 그룹 찾기
    public GroupDTO findGroupById(int groupId) {
        return session.selectOne("group-mapping.findGroupById", groupId);
    }

    // 메인페이지 로그인 후 내 모임 정보 가져오기 - 지역 정보
    public List<String> getRegionName(int regionId){
        return session.selectList("group-mapping.getRegionName", regionId);
    }

    // 메인페이지 로그인 후 내 모임 정보 가져오기 - 구 정보
    public List<String> getDistrictName(int districtId){
        return session.selectList("group-mapping.getDistrictName", districtId);
    }

    // 메인페이지 관심사별 그룹 내용 가져오기
    public ArrayList<HashMap<String, Object>> getGroupDetailsByInterestId(int interestId){
        List<Object> resultList = session.selectList("group-mapping.getGroupDetailsByInterestId", interestId);
        ArrayList<HashMap<String, Object>> groupDetailsByInterest = new ArrayList<>();
        for (Object result : resultList) {
            if(result instanceof HashMap) {
                groupDetailsByInterest.add((HashMap<String, Object>) result);
            }
        }
        return groupDetailsByInterest;
    }

    // 메인페이지 로그인 전 신상 그룹 가져오기
    public List<GroupDTO> getNewestGroupDetails(){
        return session.selectList("group-mapping.getNewestGroupDetails");
    }
//
    // 그룹 마지막 업데이트 시간 가져오기
    public Timestamp getGroupLastUpdateTime(int groupId) {
        return session.selectOne("group-mapping.getGroupLastUpdateTime", groupId);
    }

    // 마이페이지 - 사용자가 모임장인 그룹 가져오기
    public List<GroupDTO> getGroupDetailAsLeader(int userId) {
        return session.selectList("group-mapping.getGroupDetailAsLeader", userId);
    }
    //그룹 설정페이지--------------------------------------------
    // 그룹 정보 업데이트
    public void updateGroup(GroupDTO groupDTO) {
        session.update("group-mapping.updateGroup", groupDTO);
    }

    // 그룹 삭제
    public void deleteGroup(int groupId) {
        session.delete("group-mapping.deleteGroup", groupId);
    }

    // 현재 멤버 가져오기
    public List<UserDTO> getCurrentMembers(int groupId) {
        return session.selectList("group-mapping.getCurrentMembers", groupId);
    }


    //그룹 설정페이지 끝----------------------------------------------------------------------------------
   
}
