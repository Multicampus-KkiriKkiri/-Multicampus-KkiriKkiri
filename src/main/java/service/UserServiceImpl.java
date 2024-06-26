package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.UserDAO;
import dto.UserDTO;

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

}
