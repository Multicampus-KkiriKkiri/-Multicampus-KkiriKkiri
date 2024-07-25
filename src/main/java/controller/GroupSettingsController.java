package controller;

import dto.GroupDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import service.GroupService;
import service.UserService;

import java.util.List;

@Controller
@RequestMapping("/settings")
public class GroupSettingsController {

    @Autowired
    private GroupService groupService;
    
    @Autowired
    private UserService userService;

    // 그룹 메인 페이지

    @GetMapping("/main")
    public ModelAndView groupSettingsMain(HttpSession session) {
        ModelAndView mav = new ModelAndView();

        // 세션에서 groupId 가져오기
        Integer groupId = (Integer) session.getAttribute("currentGroupId");

        if (groupId == null) {
            mav.setViewName("errorPage"); // groupId가 없는 경우 에러 페이지로 이동
            mav.addObject("errorMessage", "그룹 ID를 찾을 수 없습니다.");
            return mav;
        }

        // groupId로 그룹 정보 조회
        GroupDTO group = groupService.getGroupDetail(groupId);
        if (group == null) {
            mav.setViewName("errorPage"); // 그룹 정보를 찾을 수 없는 경우 에러 페이지로 이동
            mav.addObject("errorMessage", "그룹 정보를 찾을 수 없습니다.");
            return mav;
        }

        // 조회된 그룹 정보를 모델에 추가
        mav.addObject("group", group);
        mav.setViewName("settings/groupSettingsMain");

        return mav;
    }

    // 그룹 관리 페이지
    @PostMapping("/group")
    public ModelAndView getGroupManagePage(HttpSession session) {
        Integer groupId = (Integer) session.getAttribute("currentGroupId");

        if (groupId == null) {
            throw new IllegalArgumentException("groupId는 필수입니다.");
        }

        GroupDTO groupDTO = groupService.getGroupById(groupId);
        ModelAndView mav = new ModelAndView("groupsettings/groupManage");
        mav.addObject("groupDTO", groupDTO);
        return mav;
    }

    // 멤버 관리 페이지
    @PostMapping("/member")
    public ModelAndView getMemberManagePage(HttpSession session) {
        Integer groupId = (Integer) session.getAttribute("currentGroupId");

        if (groupId == null) {
            throw new IllegalArgumentException("groupId는 필수입니다.");
        }

        GroupDTO groupDTO = groupService.getGroupById(groupId);
        // List<UserDTO> currentMembers = groupService.getCurrentMembers(groupId);
        // List<UserDTO> pendingMembers = groupService.getPendingMembers(groupId);

        ModelAndView mav = new ModelAndView("groupsettings/memberManage");
        mav.addObject("groupDTO", groupDTO);
        // mav.addObject("currentMembers", currentMembers);
        // mav.addObject("pendingMembers", pendingMembers);
        return mav;
    }
	    
    // 사진 관리 페이지
    @PostMapping("/photo")
    public ModelAndView getPhotoManagePage(HttpSession session) {
        Integer groupId = (Integer) session.getAttribute("currentGroupId");

        if (groupId == null) {
            throw new IllegalArgumentException("groupId는 필수입니다.");
        }

        GroupDTO groupDTO = groupService.getGroupById(groupId);
        // 사진 정보 로드 필요
        ModelAndView mav = new ModelAndView("groupsettings/photoManage");
        mav.addObject("groupDTO", groupDTO);
        return mav;
    }

    // 그룹 정보 업데이트
    @PostMapping("/update")
    public String updateGroup(@ModelAttribute GroupDTO groupDTO,
                              @RequestParam(value = "groupImage", required = false) MultipartFile groupImage,
                              HttpSession session) throws IllegalAccessException {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }

        // Get current group details using groupDTO's groupId
        GroupDTO currentGroupDTO = groupService.getGroupById(groupDTO.getGroupId());
        if (currentGroupDTO == null) {
            throw new IllegalArgumentException("groupId는 유효하지 않습니다.");
        }

        if (!userId.equals(currentGroupDTO.getGroupLeaderId())) {
            throw new IllegalAccessException("접근 권한이 없습니다.");
        }

        // 이미지 저장 로직 처리
        if (groupImage != null && !groupImage.isEmpty()) {
            // Implement image storage logic here
        }

        // 그룹 정보 업데이트
        groupService.updateGroup(groupDTO);

        // 성공 시 리다이렉트
        return "redirect:/settings/main?groupId=" + groupDTO.getGroupId();
    }

    // 그룹 삭제
    @PostMapping("/delete")
    public String deleteGroup(@RequestParam("groupId") int groupId, HttpSession session) throws IllegalAccessException {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }

        GroupDTO groupDTO = groupService.getGroupById(groupId);
        if (!userId.equals(groupDTO.getGroupLeaderId())) {
            throw new IllegalAccessException("접근 권한이 없습니다.");
        }

        groupService.deleteGroup(groupId);
        return "redirect:/settings/main";
    }
}
