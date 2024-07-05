package controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import dto.NotificationDTO;
import jakarta.servlet.http.HttpSession;
import service.NotificationService;

@RestController
public class NotificationGroupController {

    @Autowired
    @Qualifier("notificationServiceImple")
    NotificationService notificationService;

    @GetMapping("/notificationgrouplist")
    public ModelAndView getNotificationGroupList(HttpSession session, 
                                                 @RequestParam(value = "page", defaultValue = "0") int page, 
                                                 @RequestParam(value = "size", defaultValue = "10") int size) {
        ModelAndView mv = new ModelAndView();
        Integer userId = (Integer) session.getAttribute("sessionUserId");

        if (userId != null) {
            int offset = page * size;
            List<NotificationDTO> notification = notificationService.getNotification(userId, offset, size);

            if (notification.isEmpty() && page == 0) {
                mv.addObject("notificationMessage", "알림이 없습니다.");
                mv.addObject("notification", null);
            } else {
                mv.addObject("notificationMessage", null);
                mv.addObject("notification", notification);
            }
        } else {
            mv.addObject("notificationMessage", "로그인해주세요.");
            mv.addObject("notification", null);
        }

        mv.setViewName("notificationgroup/notificationgrouplist");
        return mv;
    }

    @GetMapping("/api/notificationgrouplist")
    @ResponseBody
    public ResponseEntity<List<NotificationDTO>> getNotificationGroupListAPI(HttpSession session, 
                                                                             @RequestParam(value = "page", defaultValue = "0") int page, 
                                                                             @RequestParam(value = "size", defaultValue = "10") int size) {
        Integer userId = (Integer) session.getAttribute("sessionUserId");

        if (userId != null) {
            int offset = page * size;
            List<NotificationDTO> notification = notificationService.getNotification(userId, offset, size);
            return ResponseEntity.ok(notification);
        } else {
            return ResponseEntity.status(401).body(new ArrayList<>());
        }
    }

    @PostMapping("/deleteNotification")
    @ResponseBody
    public ResponseEntity<List<NotificationDTO>> deleteNotification(@RequestParam("notificationId") int notificationId, HttpSession session,
                                                                    @RequestParam(value = "page", defaultValue = "0") int page, 
                                                                    @RequestParam(value = "size", defaultValue = "10") int size) {
        
        System.out.println("Deleting notification with ID: " + notificationId); // 디버깅 로그 추가
        
        notificationService.deleteNotification(notificationId);
        
        Integer userId = (Integer) session.getAttribute("sessionUserId");
        if (userId != null) {
            int offset = page * size;
            List<NotificationDTO> notification = notificationService.getNotification(userId, offset, size); 
            return ResponseEntity.ok(notification);
        } else {
            return ResponseEntity.status(401).body(new ArrayList<>());
        }
    }
}
