package dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SearchDAO {
	
    @Autowired
    SqlSession session;

    public List<Map<String, Object>> getGroups(Map<String, Object> map) {
        return session.selectList("getGroups", map);
    }

    public List<Map<String, Object>> getEvents(Map<String, Object> map) {
        return session.selectList("getEvents", map);
    }

    public int getGroupsCount(Map<String, Object> map) {
        return session.selectOne("getGroupsCount", map);
    }

    public int getEventsCount(Map<String, Object> map) {
        return session.selectOne("getEventsCount", map);
    }
}
