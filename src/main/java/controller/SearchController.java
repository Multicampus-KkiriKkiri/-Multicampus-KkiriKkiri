package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import service.SearchService;

@Controller
public class SearchController {

    @Autowired
    @Qualifier("searchServiceImpl")
    SearchService searchService;

    @GetMapping("/groupsearch")
    public ModelAndView getGroups(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String interest,
            @RequestParam(required = false) String onlineOffline,
            @RequestParam(defaultValue = "new") String sortOrder,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {

        int offset = (page - 1) * pageSize;
        Map<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);
        params.put("region", region);
        params.put("district", district);
        params.put("interest", interest);
        params.put("onlineOffline", onlineOffline);
        params.put("sortOrder", sortOrder);
        params.put("limit", pageSize);
        params.put("offset", offset);

        List<Map<String, Object>> groups = searchService.getGroups(params);
        int groupCount = searchService.getGroupsCount(params);

        ModelAndView mv = new ModelAndView("search/searchResults"); // 변경된 부분
        mv.addObject("groups", groups);
        mv.addObject("groupCount", groupCount);
        mv.addObject("currentPage", page);
        mv.addObject("totalPages", (int) Math.ceil((double) groupCount / pageSize));

        return mv;
    }

    @GetMapping("/eventsearch")
    public ModelAndView getEvents(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String interest,
            @RequestParam(required = false) String onlineOffline,
            @RequestParam(defaultValue = "new") String sortOrder,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int pageSize) {

        int offset = (page - 1) * pageSize;
        Map<String, Object> params = new HashMap<>();
        params.put("keyword", keyword);
        params.put("region", region);
        params.put("district", district);
        params.put("interest", interest);
        params.put("onlineOffline", onlineOffline);
        params.put("sortOrder", sortOrder);
        params.put("limit", pageSize);
        params.put("offset", offset);

        List<Map<String, Object>> events = searchService.getEvents(params);
        int eventCount = searchService.getEventsCount(params);

        ModelAndView mv = new ModelAndView("search/searchResults"); // 변경된 부분
        mv.addObject("events", events);
        mv.addObject("eventCount", eventCount);
        mv.addObject("currentPage", page);
        mv.addObject("totalPages", (int) Math.ceil((double) eventCount / pageSize));

        return mv;
    }
}
