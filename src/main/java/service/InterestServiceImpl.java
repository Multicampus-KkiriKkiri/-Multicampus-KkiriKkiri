package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.InterestDAO;

@Service
public class InterestServiceImpl implements InterestService {
	
	@Autowired
	InterestDAO dao;

	//로그인 회원 interestId 가져오기	
	@Override
	public List<Integer> getInterestIdByUserId(int userId) {
		return dao.getInterestIdByUserId(userId);
	}
	
	//관심사(카테고리)이름 조회
	@Override
	public String getInterestField(int interestId) {
		return dao.getInterestField(interestId);
	}
}
