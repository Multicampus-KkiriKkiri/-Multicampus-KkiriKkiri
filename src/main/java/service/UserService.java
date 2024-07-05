package service;


import dto.UserDTO;
import dto.UserInterestDTO;

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
	
	//해당 email 회원정보 조회
	UserDTO findByUserEmail(String userEmail);
	
	//회원가입 - 내정보설정 모달 회원id 가져오기
	UserDTO getUserId(int userId);
	
	//회원가입 - 내정보설정 모달 별명 가져오기 (별명 중복확인 위함)
	UserDTO getUserNickname(String userNickname);
	
	//회원가입 - 내정보설정 모달 회원정보 업데이트
	int signUpProfileUpdate(UserDTO dto);
	
	//회원가입 모달에서 내정보설정 모달로 넘어갈 때 같은 회원인지 이메일로 확인
	String getUserId(String userEmail);
	
	//회원가입 - 내정보설정 모달 회원 관심사 데이터 입력
	int setMyInterest(UserInterestDTO dto);

}







