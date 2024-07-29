package controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.UserDTO;
import service.ChatService;
import service.UserService;


@Controller
@RequestMapping("/groupchat")
public class GroupChatController {
	
	@Autowired
	ChatService chatService;
	
	@Autowired
	UserService userService;

	// [모임 채팅] 탭 클릭 시 
	@RequestMapping("/chat")
	ModelAndView groupDetail(int groupId) {
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupId", groupId);
		mv.setViewName("groupchat/groupChat");
		
		return mv;
		
	}
	
	// 모임 별 채팅 내역 20개씩 불러오기
	@PostMapping("/getchathistory")
	@ResponseBody
	List<HashMap<String, Object>> getChatHistory(int groupId, int offset) {
		
		HashMap<String, Object> map = new HashMap<>();
        map.put("groupId", groupId);
        map.put("offset", offset);
        map.put("limit", 20);
        
		return chatService.getChatHistoryByGroupId(map);
		
	}
	
	// 현재 채팅방 입장 회원 정보 가져오기
	@PostMapping("/getchatuserinfo")
	@ResponseBody
	UserDTO getUserNincknameAndProfileImage(int userId) {
		
		return userService.getChatUserInfoById(userId);
		
	}
	
	// 채팅 메세지 DB에 저장
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
	
	// 매일 자정에 30일 넘은 채팅 내역 'chat_history'로 이동 후 'chat'에서 삭제
    @Scheduled(cron = "0 0 0 * * ?")
    public void moveOldChatsToHistory() {
    	System.out.println("==================================================================================");
        System.out.println(new Date() + " - 30일 넘은 채팅 내역 이전 완료 - 이전한 채팅 개수 :" + chatService.moveOldChatsToHistory());
        System.out.println("==================================================================================");
    }
	
}
