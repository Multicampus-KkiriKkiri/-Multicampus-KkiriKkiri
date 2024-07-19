package service;

import dao.GroupMemberDAO;
import dao.UserDAO;
import dto.GroupMemberDTO;
import dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.GroupSettingsService;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupSettingsServiceImpl implements GroupSettingsService {

    @Autowired
    private GroupMemberDAO groupMemberDAO;

    @Autowired
    private UserDAO userDAO;
    
    // 현재 그룹의 멤버와 사용자 정보를 가져옵니다.
    @Override
    public List<UserDTO> getCurrentMembersWithUserInfo(int groupId) {
        List<GroupMemberDTO> members = groupMemberDAO.getCurrentMembers(groupId);
        List<UserDTO> userInfos = new ArrayList<>();
        for (GroupMemberDTO member : members) {
            UserDTO user = userDAO.getUserInfo(member.getUserId());
            userInfos.add(user);
        }
        return userInfos;
    }

    // 대기 중인 그룹 멤버와 사용자 정보를 가져옵니다.
    @Override
    public List<UserDTO> getPendingMembersWithUserInfo(int groupId) {
        List<GroupMemberDTO> members = groupMemberDAO.getPendingMembers(groupId);
        List<UserDTO> userInfos = new ArrayList<>();
        for (GroupMemberDTO member : members) {
            UserDTO user = userDAO.getUserInfo(member.getUserId());
            userInfos.add(user);
        }
        return userInfos;
    }

    // 그룹에서 멤버를 추방합니다.
    @Override
    public boolean kickMember(int groupId, int userId) {
        return groupMemberDAO.kickMember(groupId, userId) > 0;
    }

    // 그룹 멤버를 승인합니다.
    @Override
    public boolean approveMember(int groupId, int userId) {
        return groupMemberDAO.approveMember(groupId, userId) > 0;
    }

    // 그룹 멤버를 거절합니다.
    @Override
    public boolean rejectMember(int groupId, int userId) {
        return groupMemberDAO.rejectMember(groupId, userId) > 0;
    }
}
