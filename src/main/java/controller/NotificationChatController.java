package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.ChatDTO;
import jakarta.servlet.http.HttpSession;
import service.ChatService;

@Controller
public class NotificationChatController {

	@Autowired
	ChatService chatService;
	
	@GetMapping("/notificationchatlist")		
	ModelAndView getChats(int userId) {
		List<ChatDTO> chats = chatService.getChats(userId);
		
		
		System.out.println("chats" + chats);
		
		ModelAndView mv = new ModelAndView();
		
		
		
		return mv;
		
	}
	
}
