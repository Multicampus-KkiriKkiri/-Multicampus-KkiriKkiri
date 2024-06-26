package dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.UserDTO;

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

}
