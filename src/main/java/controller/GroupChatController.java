package controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import service.ChatService;
import service.UserService;


@Controller
@RequestMapping("/groupdetail")
public class GroupChatController {
	
	@Autowired
	ChatService chatService;
	
	@Autowired
	UserService userService;

	@RequestMapping("/chat")
	ModelAndView groupDetail(int groupId) {
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupId", groupId);
		mv.setViewName("groupchat/groupChat");
		
		return mv;
		
	}
	
	@PostMapping("/getchathistory")
	@ResponseBody
	List<HashMap<String, Object>> getChatHistory(int groupId, int offset) {
		
		HashMap<String, Object> map = new HashMap<>();
        map.put("groupId", groupId);
        map.put("offset", offset);
        map.put("limit", 20);
        
		return chatService.getChatHistoryByGroupId(map);
		
	}
	
	@PostMapping("/getusernickname")
	@ResponseBody
	String getUserNinckname(int userId) {
		
		return userService.getUserNincknameById(userId);
		
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
