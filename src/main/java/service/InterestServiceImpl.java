package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.InterestDAO;

@Service
public class InterestServiceImpl implements InterestService {
	
	@Autowired
	InterestDAO dao;

	@Override
	public String getInterestField(int interestId) {
		return dao.getInterestField(interestId);
	}
}
