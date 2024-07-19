package controller;

import dto.GroupDTO;
import dto.GroupMemberDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import service.GroupMemberService;
import service.GroupService;
import service.GroupSettingsService;
import service.InterestService;
import service.NotificationService;
import service.UserService;

import java.util.List;

@Controller
@RequestMapping("/groupsettings")
public class GroupSettingsController {

    @Autowired
    private GroupSettingsService groupSettingsService;
   
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private InterestService interestService;
    @Autowired
    private GroupMemberService groupMemberService;
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/group/current-members")
    public ModelAndView getCurrentMembers(@RequestParam int groupId) {
        List<UserDTO> currentMembers = groupSettingsService.getCurrentMembersWithUserInfo(groupId);
        ModelAndView mav = new ModelAndView("currentMembers");
        mav.addObject("currentMembers", currentMembers);
        return mav;
    }

    @GetMapping("/group/pending-members")
    public ModelAndView getPendingMembers(@RequestParam int groupId) {
        List<UserDTO> pendingMembers = groupSettingsService.getPendingMembersWithUserInfo(groupId);
        ModelAndView mav = new ModelAndView("pendingMembers");
        mav.addObject("pendingMembers", pendingMembers);
        return mav;
    }

    @PostMapping("/kickMember")
    @ResponseBody
    public String kickMember(@RequestParam int groupId, @RequestParam int userId) {
        boolean result = groupSettingsService.kickMember(groupId, userId);
        return result ? "success" : "failure";
    }

    @PostMapping("/approveMember")
    @ResponseBody
    public String approveMember(@RequestParam int groupId, @RequestParam int userId) {
        boolean result = groupSettingsService.approveMember(groupId, userId);
        return result ? "success" : "failure";
    }

    @PostMapping("/rejectMember")
    @ResponseBody
    public String rejectMember(@RequestParam int groupId, @RequestParam int userId) {
        boolean result = groupSettingsService.rejectMember(groupId, userId);
        return result ? "success" : "failure";
    }

    @GetMapping("/main")
    public ModelAndView getGroupMainPage(@RequestParam(required = false) Integer groupId, @RequestParam(required = false) Integer userId, HttpSession session) {
        if (groupId == null) {
            groupId = 17; // 기본값 설정, 실제 값으로 대체 필요
        }
        if (userId == null) {
            userId = 1; // 기본값 설정, 실제 값으로 대체 필요
        }

        GroupDTO groupDTO = groupService.getGroupDetail(groupId);
        UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
        String category = interestService.getInterestField(groupDTO.getGroupInterestId());
        ModelAndView mav = new ModelAndView();
        mav.addObject("groupDTO", groupDTO);
        mav.addObject("groupLeaderDTO", groupLeaderDTO);
        mav.addObject("groupId", groupId);
        mav.addObject("userId", userId);
        mav.setViewName("groupsettings/groupSettingsMain");

        return mav;
    }

    @PostMapping("/group")
    public ModelAndView getGroupManagePage(@RequestParam int groupId) {
        ModelAndView mav = new ModelAndView("groupsettings/groupManage");
        mav.addObject("groupId", groupId);
        return mav;
    }

    @PostMapping("/member")
    public ModelAndView getGroupMemberPage(@RequestParam int groupId) {
        ModelAndView mav = new ModelAndView("groupsettings/memberManage");
        mav.addObject("groupId", groupId);
        return mav;
    }

    @PostMapping("/event")
    public ModelAndView getGroupEventPage(@RequestParam int groupId) {
        ModelAndView mav = new ModelAndView("groupsettings/eventManage");
        mav.addObject("groupId", groupId);
        return mav;
    }

    @PostMapping("/photo")
    public ModelAndView getGroupPhotoPage(@RequestParam int groupId) {
        ModelAndView mav = new ModelAndView("groupsettings/photoManage");
        mav.addObject("groupId", groupId);
        return mav;
    }

    @PostMapping("/tab")
    public ModelAndView loadTabContent(@RequestParam String tab, @RequestParam int groupId) {
        ModelAndView mav = new ModelAndView("groupsettings/" + tab);
        mav.addObject("groupId", groupId);
        return mav;
    }
}
