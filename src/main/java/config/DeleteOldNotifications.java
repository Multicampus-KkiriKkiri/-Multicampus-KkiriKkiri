package config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import service.NotificationService;


@Component
public class DeleteOldNotifications {
	
	@Autowired
    NotificationService notificationService;

    // 매일 자정에 30일 이상된 알림을 삭제하는 작업
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteOldNotifications() {
        notificationService.deleteOldNotifications();
        System.out.println("오래된 알림이 삭제되었습니다.");
    }
}
