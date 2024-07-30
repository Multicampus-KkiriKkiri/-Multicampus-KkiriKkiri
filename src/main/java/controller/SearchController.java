package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import service.GroupService;
import service.SearchService;

@Controller
public class SearchController {

    @Autowired
    SearchService searchService;

    @Autowired
    GroupService groupService;
    
    @GetMapping("/groupsearch")
    public ModelAndView getGroupsAtHeader(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer userRegionId) {
        
        Integer regionId = (userRegionId == null || userRegionId == 0) ? null : userRegionId;
        
        String district = "";
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
        map.put("districtId", null);
        map.put("interest", interest);
        map.put("onlineOffline", onlineOffline);
        map.put("sortOrder", sortOrder);
        map.put("limit", pageSize);
        map.put("offset", offset);

        List<Map<String, Object>> groups = searchService.getGroups(map);
        int groupCount = searchService.getGroupsCount(map);

        ModelAndView mv = new ModelAndView("search/searchlist");
        mv.addObject("searchType", searchType);
        mv.addObject("map", map);
        mv.addObject("groups", groups);
        mv.addObject("groupCount", groupCount);
        mv.addObject("currentPage", page);
        mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));
        mv.addObject("userRegionId", userRegionId); // Add userRegionId to the model

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
            @RequestParam(defaultValue = "15") int pageSize) {

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

        ModelAndView mv = new ModelAndView("search/searchlist");
        mv.addObject("searchType", searchType);
        mv.addObject("map", map);
        mv.addObject("groups", groups);
        mv.addObject("groupCount", groupCount);
        mv.addObject("currentPage", page);
        mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));

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
            @RequestParam(defaultValue = "15") int pageSize) {

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

        ModelAndView mv = new ModelAndView("search/searchlist");
        mv.addObject("searchType", searchType);
        mv.addObject("map", map);
        mv.addObject("events", events);
        mv.addObject("eventCount", eventCount);
        mv.addObject("currentPage", page);
        mv.addObject("totalPages", (int) Math.ceil((double) eventCount / pageSize));

        return mv;
    }

}
