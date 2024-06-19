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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void logOutUser(String userId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean signUp(UserDTO dto) {
		// TODO Auto-generated method stub
		return false;
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
