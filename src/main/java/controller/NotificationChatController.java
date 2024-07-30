package controller;

import java.util.ArrayList;
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
import service.GroupMemberService;
import dto.GroupDTO;

@Controller
public class NotificationChatController {

    @Autowired
    ChatService chatService;

    @Autowired
    GroupService groupService;

    @Autowired
    GroupMemberService groupMemberService;

    @GetMapping("/notificationchatlist")
    public ModelAndView showChatPage(HttpSession session) {
        ModelAndView mv = new ModelAndView("notificationchat/notificationchatlist");

        Integer userId = (Integer) session.getAttribute("sessionUserId");

        if (userId == null) {
            mv.addObject("message", "로그인해주세요.");
        } else {
            List<Integer> groupIds = groupMemberService.getMyGroupIdList(userId);
            if (groupIds.isEmpty()) {
                mv.addObject("message", "가입한 모임이 없습니다.");
            } else {
                mv.addObject("groupIds", groupIds);
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
            return response;
        }

        List<Integer> groupIds = groupMemberService.getMyGroupIdList(userId);
        List<Map<String, Object>> updatedGroups = new ArrayList<>();

        for (Integer groupId : groupIds) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("groupId", groupId);
            map.put("offset", 0); // 초기 로드할 때는 오프셋을 0으로 설정
            map.put("limit", 1); // 초기 제한 값 설정
            List<HashMap<String, Object>> chatHistory = chatService.getChatHistoryByGroupId(map);
            
            if (chatHistory != null && !chatHistory.isEmpty()) {
                Map<String, Object> latestChat = chatHistory.get(0); // 가장 최근의 채팅 가져오기
                latestChat.put("groupId", groupId);

                GroupDTO groupInfo = groupService.getGroupDetail(groupId);

                latestChat.put("groupName", groupInfo.getGroupName());
                latestChat.put("groupImage", groupInfo.getGroupImage());
                
                updatedGroups.add(latestChat);
            }
        }

        response.put("updatedGroups", updatedGroups);

        return response;
    }
}
