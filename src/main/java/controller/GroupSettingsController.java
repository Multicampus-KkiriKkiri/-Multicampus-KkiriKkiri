package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/groupsettings")
public class GroupSettingsController {
	/*
	 @Autowired
	 private GroupService groupService;

	    @GetMapping("/manage")
	    public String manageGroup(Model model) {
	        Group group = groupService.getGroupDetails();
	        model.addAttribute("group", group);
	        return "groupManage";
	    }

	    @GetMapping("/members")
	    public String manageMembers(Model model) {
	        // Load member data
	        return "memberManage";
	    }

	    @GetMapping("/schedule")
	    public String manageSchedule(Model model) {
	        // Load schedule data
	        return "scheduleManage";
	    }

	    @GetMapping("/photos")
	    public String managePhotos(Model model) {
	        // Load photo data
	        return "photoManage";
	    }
	    */
}
