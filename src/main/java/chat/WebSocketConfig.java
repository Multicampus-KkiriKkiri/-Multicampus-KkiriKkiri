package chat;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
 
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
   
    ChatHandler chatHandler = new ChatHandler();
    
    @Autowired
    private NotificationWebSocketHandler notificationWebSocketHandler;
 
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws/multiRoom").setAllowedOriginPatterns("*").withSockJS();
        registry.addHandler(notificationWebSocketHandler, "/ws/notifications")
        .setAllowedOriginPatterns("*")
        .withSockJS();
}
}