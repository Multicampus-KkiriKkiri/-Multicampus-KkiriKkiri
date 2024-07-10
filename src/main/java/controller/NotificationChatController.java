package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.ChatDTO;
import dto.GroupDTO;
import jakarta.servlet.http.HttpSession;
import service.ChatService;

@Controller
public class NotificationChatController {

	@Autowired
	ChatService chatService;
	
	@GetMapping("/notificationchatlist")		
	public ModelAndView getChats(HttpSession session) {
		
		ModelAndView mv = new ModelAndView();
		
		Integer userId = (Integer) session.getAttribute("sessionUserId");
		
		if (userId != null) {
			List<ChatDTO> chats = chatService.getChats(userId);
			
			if (chats.isEmpty()) {
				mv.addObject("message", "채팅이 없습니다.");
				mv.addObject("chats", null);
			} else {
				mv.addObject("message", null);
				mv.addObject("chats", chats);
				
							
			}
		} else {
			mv.addObject("message", "로그인해주세요.");
			mv.addObject("chats", null);
		}
		
		mv.setViewName("notificationchat/notificationchatlist");
		return mv;		
	}
	
}
