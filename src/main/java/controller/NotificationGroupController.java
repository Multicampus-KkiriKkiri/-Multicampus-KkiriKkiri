package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.NotificationDTO;
import dto.UserDTO;
import service.NotificationService;
import service.UserService;

@Controller
public class NotificationGroupController {
	
	@Autowired
	@Qualifier("notificationServiceImple")
	NotificationService notificationService;
	
	@Qualifier("userServiceImple")
	UserService userService;
	
	@GetMapping("/notificationgrouplist")
	ModelAndView notificationGroupList(NotificationDTO userIdAndGroupId) {
		
		NotificationDTO notificationDTO = notificationService.getNotification(userIdAndGroupId);
		UserDTO userDTO = userService.getUserInfo(notificationDTO.getUserId());
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("notificationDTO", notificationDTO);
		mv.setViewName("notificationgroup/notificationgrouplist");
		return mv;
	}
	
}
