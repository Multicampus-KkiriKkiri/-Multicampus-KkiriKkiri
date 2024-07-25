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
	public List<Map<String, Object>> getGroups(Map<String, Object> params) {
        return dao.getGroups(params);
    }

	@Override
	public List<Map<String, Object>> getEvents(Map<String, Object> params) {
		return dao.getEvents(params);
	}

	@Override
	public int getGroupsCount(Map<String, Object> params) {
		return dao.getGroupsCount(params);
	}

	@Override
	public int getEventsCount(Map<String, Object> params) {
		return dao.getEventsCount(params);
	}
	

}
