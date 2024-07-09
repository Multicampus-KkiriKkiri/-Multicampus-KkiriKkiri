package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UserDAO;
import dto.DistrictDTO;
import dto.RegionDTO;
import dto.UserDTO;
import dto.UserInterestDTO;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDAO dao;

	@Override
	public UserDTO logInUser(String userEmail, String userPw) {
		UserDTO user = dao.findByUserEmail(userEmail);
		if(user != null && user.getUserPw().equals(userPw)) {
			return user;
		}
		return null;
	}	

	@Override
	public UserDTO findByUserEmail(String userEmail) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void logOutUser(String userId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean signUp(UserDTO dto) {
		if(dao.existsByUserEmail(dto.getUserEmail())) {
			return false;
		}
		dao.signUp(dto);
		return true;		
	}

	@Override
	public void withdrawUser(String userEmail, String userPw) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateUserInfo(int userId, UserDTO dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public UserDTO getUserInfo(int userId) {
		return dao.getUserInfo(userId);
	}
	
	//회원가입 - 내정보설정 모달 회원id 가져오기
	@Override
	public UserDTO getUserId(int userId) {
		return dao.getUserId(userId);
	}
	
	//회원가입 - 내정보설정 모달 별명 가져오기 (별명 중복확인 위함)
	@Override
	public UserDTO getUserNickname(String userNickname) {
		return dao.getUserNickname(userNickname);
	}	
	
	//회원가입 - 내정보설정 모달 회원정보 업데이트
	@Override
	public int signUpProfileUpdate(UserDTO dto) {
		return dao.signUpProfileUpdate(dto);
	}

	//회원가입 모달에서 내정보설정 모달로 넘어갈 때 같은 회원인지 이메일로 확인
	@Override
	public String getUserId(String userEmail) {		
		return dao.getUserId(userEmail);
	}
	
	//회원가입 - 내정보설정 모달 회원 관심사 데이터 입력
	@Override
	public int setMyInterest(UserInterestDTO dto) {
		return dao.setMyInterest(dto);
	}	
	
	@Override
	public String getUserNincknameById(int userId) {
		return dao.getUserNincknameById(userId);
	}
	
}






