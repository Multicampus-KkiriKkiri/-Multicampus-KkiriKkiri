package controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import jakarta.servlet.http.HttpSession;
import service.ChatService;
import service.GroupService;
import dto.GroupDTO;

@Controller
public class NotificationChatController {

    @Autowired
    ChatService chatService;
    
    @Autowired
    GroupService groupService;

    @GetMapping("/notificationchatlist")
    public ModelAndView showChatPage(HttpSession session) {
        ModelAndView mv = new ModelAndView("notificationchat/notificationchatlist");

        Integer userId = (Integer) session.getAttribute("sessionUserId");

        if (userId == null) {
            mv.addObject("message", "로그인해주세요.");
        } else {
            List<Integer> groupIds = chatService.getGroupIds(userId);
            mv.addObject("groupIds", groupIds);
            
            if (groupIds.isEmpty()) {
                mv.addObject("message", "가입한 모임이 없습니다.");
            }
        }
        
        return mv;
    }

    @GetMapping("/api/notificationchatlist")
    @ResponseBody
    public Map<String, Object> getLatestChats(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("sessionUserId");
        Map<String, Object> response = new HashMap<>();

        if (userId == null) {
            response.put("message", "로그인해주세요");
            return response;
        }

        List<Integer> groupIds = chatService.getGroupIds(userId);
        for (Integer groupId : groupIds) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("groupId", groupId);
            map.put("offset", 0); // 초기 로드할 때는 오프셋을 0으로 설정
            map.put("limit", 1); // 초기 제한 값 설정

            List<HashMap<String, Object>> chatHistory = chatService.getChatHistoryByGroupId(map);
            if (chatHistory != null && !chatHistory.isEmpty()) {
                Map<String, Object> latestChat = chatHistory.get(0); // 가장 최근의 채팅 가져오기
                GroupDTO groupDetail = groupService.getGroupDetail(groupId);

                latestChat.put("groupId", groupId);
                latestChat.put("groupName", groupDetail.getGroupName());
                latestChat.put("groupImage", groupDetail.getGroupImage());

                response.put(String.valueOf(groupId), latestChat);
            } else {
                response.put(String.valueOf(groupId), "채팅이 없습니다");
            }
        }

        return response;
    }
}
