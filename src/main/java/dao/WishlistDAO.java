package dao;

import java.util.HashMap;

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
	
}
