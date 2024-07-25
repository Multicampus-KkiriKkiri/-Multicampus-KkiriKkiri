package service;

import java.util.List;
import java.util.Map;

public interface SearchService {
	
	List<Map<String, Object>> getGroups(Map<String, Object> params);
	
	List<Map<String, Object>> getEvents(Map<String, Object> params);
	
	int getGroupsCount(Map<String, Object> params);
	
	int getEventsCount(Map<String, Object> params);
	
}
