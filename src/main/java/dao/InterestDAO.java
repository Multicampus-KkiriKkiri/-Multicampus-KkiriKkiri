package dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InterestDAO {

	@Autowired
	SqlSession session;
	
	public String getInterestField(int interestId) {
		return session.selectOne("getInterestField", interestId);
	}

}
