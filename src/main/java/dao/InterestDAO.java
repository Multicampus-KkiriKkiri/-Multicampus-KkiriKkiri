package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InterestDAO {

	@Autowired
	SqlSession session;
	
	//로그인 회원 interestId 가져오기
	public List<Integer> getInterestIdByUserId(int userId) {
		return session.selectList("getInterestIdByUserId",userId);
	}	
	
	//관심사(카테고리)이름 조회
	public String getInterestField(int interestId) {
		return session.selectOne("getInterestField", interestId);
	}

}
