package controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import dto.ChatDTO;
import dto.GroupDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import service.ChatService;
import service.GroupMemberService;
import service.GroupService;
import service.UserService;

@Controller
public class NotificationChatController {

    @Autowired
    ChatService chatService;

    @Autowired
    GroupService groupService;

    @Autowired
    UserService userService;

    @Autowired
    GroupMemberService groupMemberService;

    @GetMapping("/notificationchatlist")
    public ModelAndView showChatPage(HttpSession session) {
        ModelAndView mv = new ModelAndView("notificationchat/notificationchatlist");

        Integer userId = (Integer) session.getAttribute("sessionUserId");

        if (userId == null) {
            mv.addObject("message", "로그인해주세요.");
            
        } else {
        mv.addObject("message", "가입한 모임이 없습니다."); 
        }

        return mv;
    }

    @GetMapping("/api/notificationchatlist")
    @ResponseBody
    public Map<String, Object> getLatestChats(
            HttpSession session, 
            @RequestParam(value = "lastUpdateTime", required = false) Long lastUpdateTime) {
        Integer userId = (Integer) session.getAttribute("sessionUserId");

        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> updatedGroups = new ArrayList<>();

        if (userId == null) {
            return response; // 세션에 사용자 ID가 없으면 빈 맵 반환
        }

        List<Integer> groupIds = groupMemberService.getMyGroupIdList(userId);

        for (int i = 0; i < groupIds.size(); i++) {
            Integer groupId = groupIds.get(i);
            Timestamp groupUpdateTime = groupService.getGroupLastUpdateTime(groupId);
            if (lastUpdateTime == null || groupUpdateTime.getTime() > lastUpdateTime) {
                ChatDTO latestChat = chatService.getLatestChatByGroupId(groupId);
                if (latestChat != null) {
                    GroupDTO group = groupService.getGroupDetail(latestChat.getGroupId());
                    UserDTO user = userService.getChatUserInfoById(latestChat.getUserId());

                    Map<String, Object> groupData = new HashMap<>();
                    groupData.put("groupId", group.getGroupId());
                    groupData.put("groupImage", "/images/" + group.getGroupImage());
                    groupData.put("groupName", group.getGroupName());
                    groupData.put("userNickname", user.getUserNickname());
                    groupData.put("chatMessage", latestChat.getChatMessage());
                    groupData.put("groupUpdateTime", groupUpdateTime.getTime());

                    updatedGroups.add(groupData);
                }
            }
        }

        response.put("updatedGroups", updatedGroups);
        response.put("latestUpdateTime", System.currentTimeMillis());

        return response;
    }
}
