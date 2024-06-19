package service;

import dto.UserDTO;

public interface UserService {
	
	// 로그인
	UserDTO logInUser(String userEmail, String userPw);
	
	// 로그아웃
	void logOutUser(String userId);
	
	// 회원가입
	boolean signUp(UserDTO dto);
	
	// 회원탈퇴
	void withdrawUser(String userEmail, String userPw);
	
	// 회원정보 수정
	void updateUserInfo(int userId, UserDTO dto);
	
	// 한 회원 정보 조회
	UserDTO getUserInfo(int userId);
}
