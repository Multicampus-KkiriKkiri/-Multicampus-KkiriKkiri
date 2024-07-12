package dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dto.EventDTO;

@Repository
public class EventDAO {

	@Autowired
	SqlSession session;
	
	public List<EventDTO> getGroupEventList(int groupId) {
		return session.selectList("getGroupEventList", groupId);
	}
	
	//마이페이지 내 일정 가져오기
	public List<EventDTO> getMyGroupEvent(int userId){
		return session.selectList("getMyGroupEvent", userId);
	}

}
