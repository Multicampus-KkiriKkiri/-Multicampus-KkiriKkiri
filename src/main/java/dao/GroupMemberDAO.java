package dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GroupMemberDAO {

	@Autowired
	SqlSession session;
	
	public int getMemberCountInGroup(int groupId) {
		return session.selectOne("getMemberCountInGroup", groupId);
	}

}
