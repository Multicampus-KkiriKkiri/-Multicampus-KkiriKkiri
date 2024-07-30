package service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.SearchDAO;

@Service
public class SearchServiceImpl implements SearchService {
	
	@Autowired
	SearchDAO dao;
	
	@Override
	public List<Map<String, Object>> getGroups(Map<String, Object> map) {
        return dao.getGroups(map);
    }

	@Override
	public List<Map<String, Object>> getEvents(Map<String, Object> map) {
		return dao.getEvents(map);
	}

	@Override
	public int getGroupsCount(Map<String, Object> map) {
		return dao.getGroupsCount(map);
	}

	@Override
	public int getEventsCount(Map<String, Object> map) {
		return dao.getEventsCount(map);
	}
	

}
