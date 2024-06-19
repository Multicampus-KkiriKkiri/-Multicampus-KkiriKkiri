package dao;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.GroupDTO;
import dto.UserDTO;

@Repository
public class GroupDAO {
	
	@Autowired
	SqlSession session;

	public GroupDTO getGroupDetail(int groupId) {
		return session.selectOne("getGroupDetail", groupId);
	}

	public ArrayList<UserDTO> getGroupMemberList(int groupId) {
		// TODO Auto-generated method stub
		return null;
	}

	public int addMemberToGroup(int userId, int groupId) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int removeMemberFromGroup(int userId, int groupId) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int addGroupToWishlist(int userId, int groupId) {
		// TODO Auto-generated method stub
		return 0;
	}

}
