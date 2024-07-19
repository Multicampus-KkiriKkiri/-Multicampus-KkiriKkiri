package dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.GroupMemberDTO;
import dto.UserDTO;


@Repository
public class GroupMemberDAO {

	@Autowired
	SqlSession session;
		
	public int addMemberToGroup(HashMap map) {
		return session.insert("addMemberToGroup", map);
	}
	
	public int updateMemberToGroup(HashMap map) {
		return session.update("updateMemberToGroup", map);
	}
	
	public int getMemberCountInGroup(int groupId) {
		return session.selectOne("getMemberCountInGroup", groupId);
	}
	
	public List<UserDTO> getGroupMemberList(int groupId) {
		return session.selectList("getGroupMemberList", groupId);
	}

	public String checkMemberStatusInGroup(HashMap map) {
		return session.selectOne("checkMemberStatusInGroup", map);
	}

	public String checkUserHistoryInGroup(HashMap map) {
		return session.selectOne("checkUserHistoryInGroup", map);
	}
	
	// 메인페이지 로그인 후 내 모임 정보 가져오기 위해 groupId 받아오기 
	public List<Integer> getMyGroupIdList(int userId) {
		return session.selectList("getMyGroupIdList", userId);
	}
	
	//group setting관련
	//그룹에서 현재 그룹멤버가져옴.
    public List<GroupMemberDTO> getCurrentMembers(int groupId) {
        return session.selectList("getCurrentMembers", groupId);
    }
    //대긱중인 그룹 멤버 목록 가져옴.
    public List<GroupMemberDTO> getPendingMembers(int groupId) {
        return session.selectList("getPendingMembers", groupId);
    }
    //멤버 추방
    public int kickMember(int groupId, int userId) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("groupId", groupId);
        params.put("userId", userId);
        return session.delete("kickMember", params);
    }
    //멤버 승이뇨청 승인
    public int approveMember(int groupId, int userId) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("groupId", groupId);
        params.put("userId", userId);
        return session.update("approveMember", params);
    }
    //멤버 승인 거절
    public int rejectMember(int groupId, int userId) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("groupId", groupId);
        params.put("userId", userId);
        return session.delete("rejectMember", params);
    }
    //groupsettings설정 끝

	//마이페이지 - 신청대기 모임 가져오기 위해 groupId 받아오기
	public List<Integer> getMyPendingGroupIdList(int userId) {
		return session.selectList("getMyPendingGroupIdList", userId);
	}

}






