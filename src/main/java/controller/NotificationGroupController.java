package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import service.NotificationService;

@Controller
public class NotificationGroupController {
	@Autowired
	@Qualifier("NotificationServiceImple")
	NotificationService service;
	
	@GetMapping("/notificationgrouplist")
	public ModelAndView notificationGroupList() {
		ModelAndView mv = null;
		return mv;
	}
	
	
}
