package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupService;
import service.SearchService;
import service.UserService;

@Controller
public class SearchController {

    @Autowired
    SearchService searchService;

    @Autowired
    GroupService groupService;
    
    @Autowired
    UserService userService;
    
    @GetMapping("/groupsearch")
    public ModelAndView getGroupsAtHeader(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer userRegionId,
            HttpSession session) {
        
        Integer regionId = (userRegionId == null || userRegionId == 0) ? null : userRegionId;
        
        String districtId = "";
        String interest = "";
        String onlineOffline = "";
        String sortOrder = "new";
        
        int page = 1;
        int pageSize = 15;
        int offset = (page - 1) * pageSize;
        
        String searchType = "group";

        Map<String, Object> map = new HashMap<>();
        map.put("keyword", keyword);
        map.put("regionId", regionId);
        map.put("districtId", districtId);
        map.put("interest", interest);
        map.put("onlineOffline", onlineOffline);
        map.put("sortOrder", sortOrder);
        map.put("limit", pageSize);
        map.put("offset", offset);

        List<Map<String, Object>> groups = searchService.getGroups(map);
        int groupCount = searchService.getGroupsCount(map);
        
        ModelAndView mv = new ModelAndView();
        
        if(session == null || session.getAttribute("sessionUserId") == null) {
        	
        	mv.addObject("searchType", searchType);
            mv.addObject("map", map);
            mv.addObject("groups", groups);
            mv.addObject("groupCount", groupCount);
            mv.addObject("currentPage", page);
            mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));
            mv.addObject("userRegionId", userRegionId);
            mv.setViewName("search/searchlist");
            
        } else {
        	
        	/*로그인 사용자 userDTO 가져오기*/
        	Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
        	UserDTO user = userService.getUserInfo(sessionUserId);
        	
        	if (user != null) {
	        	/*사용자 프로필 사진*/
	        	String profileImage = "/upload/" + user.getProfileImage();
				/* 사용자 지역정보(Region만) */
	        	String userRegion = groupService.getRegionNameByRegionId(user.getUserRegionId());
	        	
	        	mv.addObject("profileImage", profileImage);
	        	mv.addObject("userRegion", userRegion);
        	}
        	
        	mv.addObject("searchType", searchType);
            mv.addObject("map", map);
            mv.addObject("groups", groups);
            mv.addObject("groupCount", groupCount);
            mv.addObject("currentPage", page);
            mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));
            mv.addObject("userRegionId", userRegionId);
            mv.setViewName("search/searchlistatlogin");
            
        }
        	
        return mv;
    }


    @GetMapping("/groupsearchatlist")
    public ModelAndView getGroupsAtList(
            @RequestParam(defaultValue = "group") String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer regionId, 
            @RequestParam(required = false) Integer districtId,
            @RequestParam(required = false) String interest, 
            @RequestParam(required = false) String onlineOffline,
            @RequestParam(defaultValue = "new") String sortOrder, 
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize,
            HttpSession session) {

        int offset = (page - 1) * pageSize;

        Map<String, Object> map = new HashMap<>();
        map.put("keyword", keyword);
        map.put("regionId", regionId);
        map.put("districtId", districtId);
        map.put("interest", interest);
        map.put("onlineOffline", onlineOffline);
        map.put("sortOrder", sortOrder);
        map.put("limit", pageSize);
        map.put("offset", offset);

        List<Map<String, Object>> groups = searchService.getGroups(map);
        int groupCount = searchService.getGroupsCount(map);
       
        ModelAndView mv = new ModelAndView();
        
        if(session == null || session.getAttribute("sessionUserId") == null) {
        	
            mv.addObject("searchType", searchType);
            mv.addObject("map", map);
            mv.addObject("groups", groups);
            mv.addObject("groupCount", groupCount);
            mv.addObject("currentPage", page);
            mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));
            mv.setViewName("search/searchlist");
            
        } else {
        	
        	/*로그인 사용자 userDTO 가져오기*/
        	Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
        	UserDTO user = userService.getUserInfo(sessionUserId);
        	
        	if (user != null) {
	        	/*사용자 프로필 사진*/
	        	String profileImage = "/upload/" + user.getProfileImage();
				/* 사용자 지역정보(Region만) */
	        	String userRegion = groupService.getRegionNameByRegionId(user.getUserRegionId());
	        	
	        	mv.addObject("profileImage", profileImage);
	        	mv.addObject("userRegion", userRegion);
        	}
        	
        	mv.addObject("searchType", searchType);
            mv.addObject("map", map);
            mv.addObject("groups", groups);
            mv.addObject("groupCount", groupCount);
            mv.addObject("currentPage", page);
            mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));
            mv.setViewName("search/searchlistatlogin");
        }

        return mv;
    }
    
    @GetMapping("/eventsearchatlist")
    public ModelAndView getEventsAtList(
            @RequestParam(defaultValue = "event") String searchType,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer regionId,
            @RequestParam(required = false) Integer districtId,
            @RequestParam(required = false) String interest,
            @RequestParam(required = false) String onlineOffline,
            @RequestParam(defaultValue = "new") String sortOrder,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize,
            HttpSession session) {

        int offset = (page - 1) * pageSize;

        Map<String, Object> map = new HashMap<>();
        map.put("keyword", keyword);
        map.put("regionId", regionId);
        map.put("districtId", districtId);
        map.put("interest", interest);
        map.put("onlineOffline", onlineOffline);
        map.put("sortOrder", sortOrder);
        map.put("limit", pageSize);
        map.put("offset", offset);

        List<Map<String, Object>> events = searchService.getEvents(map);
        int eventCount = searchService.getEventsCount(map);
        
        ModelAndView mv = new ModelAndView();
        
        if (session == null || session.getAttribute("sessionUserId") == null) {
        	
        	mv.addObject("searchType", searchType);
            mv.addObject("map", map);
            mv.addObject("events", events);
            mv.addObject("eventCount", eventCount);
            mv.addObject("currentPage", page);
            mv.addObject("totalPages", (int) Math.ceil((double) eventCount / pageSize));
            mv.setViewName("search/searchlist");
            
        } else {
        	
        	/*로그인 사용자 userDTO 가져오기*/
        	Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
        	UserDTO user = userService.getUserInfo(sessionUserId);
        	
        	if (user != null) {
	        	/*사용자 프로필 사진*/
	        	String profileImage = "/upload/" + user.getProfileImage();
				/* 사용자 지역정보(Region만) */
	        	String userRegion = groupService.getRegionNameByRegionId(user.getUserRegionId());
	        	
	        	mv.addObject("profileImage", profileImage);
	        	mv.addObject("userRegion", userRegion);
        	}
        	
        	mv.addObject("searchType", searchType);
            mv.addObject("map", map);
            mv.addObject("events", events);
            mv.addObject("eventCount", eventCount);
            mv.addObject("currentPage", page);
            mv.addObject("totalPages", (int) Math.ceil((double) eventCount / pageSize));
            mv.setViewName("search/searchlistatlogin");       	
        	
        }

        return mv;
        
    }

}
