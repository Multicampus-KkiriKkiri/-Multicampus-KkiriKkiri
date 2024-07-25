package dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.PhotoBoardDTO;

@Repository
public class PhotoBoardDAO {

	@Autowired
	SqlSession session;

	public int getTotalBoardCountByGroupId(int groupId) {
		return session.selectOne("getTotalBoardCountByGroupId", groupId);
	}

	public List<PhotoBoardDTO> getPagingBoardListByGroupId(HashMap map) {
		return session.selectList("getPagingBoardListByGroupId", map);
	}
	
	
	
}
