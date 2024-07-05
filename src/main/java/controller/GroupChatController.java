package controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import service.ChatService;


@Controller
@RequestMapping("/groupdetail")
public class GroupChatController {
	
	@Autowired
	ChatService chatService;

	@RequestMapping("/chat")
	ModelAndView groupDetail(int groupId) {
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupId", groupId);
		mv.setViewName("groupchat/groupChat");
		
		return mv;
		
	}
	
	@PostMapping("/chatmessagesend")
	@ResponseBody
	int sendChatMessage(int groupId, int userId, String chatMessage, String chatTime) {
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("groupId", groupId);
		map.put("userId", userId);
		map.put("chatMessage", chatMessage);
		map.put("chatTime", chatTime);
		
		return chatService.insertChatMessage(map);
		
	}
	
}
