package service;

import dto.UserDTO;
import java.util.List;

// GroupSettingsService 인터페이스는 그룹 설정 관련 기능을 정의합니다.
public interface GroupSettingsService {
    // 현재 그룹의 멤버와 사용자 정보를 가져옵니다.
    List<UserDTO> getCurrentMembersWithUserInfo(int groupId);

    // 대기 중인 그룹 멤버와 사용자 정보를 가져옵니다.
    List<UserDTO> getPendingMembersWithUserInfo(int groupId);

    // 그룹에서 멤버를 추방합니다.
    boolean kickMember(int groupId, int userId);

    // 그룹 멤버를 승인합니다.
    boolean approveMember(int groupId, int userId);

    // 그룹 멤버를 거절합니다.
    boolean rejectMember(int groupId, int userId);
}
