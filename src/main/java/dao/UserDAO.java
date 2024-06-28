package dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.UserDTO;
import dto.UserInterestDTO;

@Repository
public class UserDAO {

	@Autowired
	SqlSession session;
	
	public UserDTO getUserInfo(int userId) {
		return session.selectOne("getUserInfo", userId);
	}
	
	//회원가입
	public int signUp(UserDTO dto) {
		return session.insert("signUp", dto);
	}

	//해당 email 회원 존재여부 확인
	public boolean existsByUserEmail(String userEmail) {
		UserDTO dto = session.selectOne("findByUserEmail", userEmail);
		if(dto != null) {
			return true;
		} else {
			return false;
		}
	}
	
	//해당 email 회원정보 조회(oneMember)
	public UserDTO findByUserEmail(String userEmail) {
		UserDTO dto = session.selectOne("findByUserEmail", userEmail);
		return dto;
	}
	
	//회원가입 - 내정보설정 모달 회원id 가져오기
	public UserDTO getUserId(int userId) {
		return session.selectOne("getUserId", userId);
	}
	
	//회원가입 - 내정보설정 모달 회원정보 업데이트
	public int signUpProfileUpdate(UserDTO dto) {
		return session.update("signUpProfileUpdate", dto);
	}
	
	//회원가입 - 내정보설정 모달 별명 가져오기 (별명 중복확인 위함)
	public UserDTO getUserNickname(String userNickname) {
		return session.selectOne("getUserNickname", userNickname);
	}
	
	//회원가입 모달에서 내정보설정 모달로 넘어갈 때 같은 회원인지 이메일로 확인
	public String getUserId(String userEmail) {
		return session.selectOne("getUserId",userEmail);
	}
	
	//회원가입 - 내정보설정 모달 회원 관심사 데이터 입력
	public int setMyInterest(UserInterestDTO dto) {
		return session.insert("setMyInterest", dto);
	}

}








