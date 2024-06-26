package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.GroupDTO;
import dto.GroupMemberDTO;
import dto.NotificationDTO;
import dto.UserDTO;
import service.NotificationService;
import service.UserService;

@Controller
public class NotificationGroupController {
	
	@Autowired
	@Qualifier("notificationServiceImple")
	NotificationService notificationService;
	
	@Autowired
	@Qualifier("userServiceImpl")
	UserService userService;
	
	@GetMapping("/notificationgrouplist")
	ModelAndView getNotificationGroupList(NotificationDTO userIdAndGroupId) {
		
		NotificationDTO notificationDTO = notificationService.getNotification(userIdAndGroupId);
		ModelAndView mv = new ModelAndView();
		
		if(notificationDTO == null) {
		mv.addObject("notificationDTO", notificationDTO);
		mv.setViewName("notificationgroup/notificationgrouplist");
		}
		
		else {
		UserDTO userDTO = userService.getUserInfo(notificationDTO.getUserId());
		
		GroupMemberDTO groupMemberDTO = new GroupMemberDTO();
        groupMemberDTO.setUserId(notificationDTO.getUserId());
        String userStatus = groupMemberDTO.getStatus();

        GroupDTO groupDTO = new GroupDTO();
        groupDTO.setGroupId(notificationDTO.getGroupId());
        String groupName = groupDTO.getGroupName();
		
		
		mv.addObject("notificationDTO", notificationDTO);
		mv.addObject("userDTO", userDTO);
		mv.addObject("userStatus", userStatus);
		mv.addObject("groupName", groupName);
		mv.setViewName("notificationgroup/notificationgrouplist");
		}
		
		return mv;	
		
	}
	
}
