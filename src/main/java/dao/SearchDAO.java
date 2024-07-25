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

    public List<Map<String, Object>> getGroups(Map<String, Object> params) {
        return session.selectList("getGroups", params);
    }

    public List<Map<String, Object>> getEvents(Map<String, Object> params) {
        return session.selectList("getEvents", params);
    }

    public int getGroupsCount(Map<String, Object> params) {
        return session.selectOne("getGroupsCount", params);
    }

    public int getEventsCount(Map<String, Object> params) {
        return session.selectOne("getEventsCount", params);
    }
}
