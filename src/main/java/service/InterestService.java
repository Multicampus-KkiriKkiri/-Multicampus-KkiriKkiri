package service;

import java.util.List;

public interface InterestService {
	
	//로그인 회원 interestId 가져오기
	List<Integer> getInterestIdByUserId(int userId);	
	
	// 관심사(카테고리)이름 조회
	String getInterestField(int interestId);

}
