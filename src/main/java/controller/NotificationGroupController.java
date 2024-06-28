package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
	
	
	@GetMapping("/notificationgrouplist")
	ModelAndView getNotificationGroupList(NotificationDTO userIdAndGroupId) {
		
		List<NotificationDTO> notification = notificationService.getNotification(userIdAndGroupId);
		ModelAndView mv = new ModelAndView();
		
		if(notification.isEmpty()) {
		mv.addObject("notification", null);
		}
		
		else {
		mv.addObject("notification", notification);
		}
		
		mv.setViewName("notificationgroup/notificationgrouplist");
		return mv;	
		
	}
	
	 @DeleteMapping("/deleteNotification")
	 @ResponseBody
	 public ResponseEntity<List<NotificationDTO>> deleteNotification(@RequestParam("notificationId") int notificationId, @RequestParam("userId") int userId, @RequestParam("groupId") int groupId) {
	       
		 NotificationDTO userIdAndGroupId = new NotificationDTO();
	     userIdAndGroupId.setUserId(userId);
	     userIdAndGroupId.setGroupId(groupId);

	     notificationService.deleteNotification(notificationId);
	        
	        // 최신 알림 목록을 가져옵니다.
	     List<NotificationDTO> notificationList = notificationService.getNotification(userIdAndGroupId);
	        
	     return ResponseEntity.ok(notificationList);
	    }
	
}
