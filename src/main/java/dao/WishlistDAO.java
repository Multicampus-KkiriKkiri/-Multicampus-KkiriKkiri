package dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WishlistDAO {

	@Autowired
	SqlSession session;

	public int checkExistInWishlist(HashMap map) {
		return session.selectOne("checkExistInWishlist", map);
	}
	
	public int addGroupToWishlist(HashMap map) {
		return session.insert("addGroupToWishlist", map);
	}

	public int deleteGroupToWishlist(HashMap map) {
		return session.delete("deleteGroupToWishlist", map);
	}
	
	//마이페이지 - 찜 모임 가져오기 위해 groupId 받아오기 
	public List<Integer> getMyWishlistGroupId(int userId) {
		return session.selectList("getMyWishlistGroupId", userId);
	}
}
