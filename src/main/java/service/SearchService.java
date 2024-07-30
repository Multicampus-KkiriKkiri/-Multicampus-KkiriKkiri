package service;

import java.util.List;
import java.util.Map;

public interface SearchService {
	
	List<Map<String, Object>> getGroups(Map<String, Object> map);
	
	List<Map<String, Object>> getEvents(Map<String, Object> map);
	
	int getGroupsCount(Map<String, Object> map);
	
	int getEventsCount(Map<String, Object> map);
	
}
