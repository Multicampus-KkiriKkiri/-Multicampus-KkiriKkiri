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

}
