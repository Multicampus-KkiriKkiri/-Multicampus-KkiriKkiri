package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.GroupDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupMemberService;
import service.GroupService;
import service.InterestService;
import service.UserService;

@Controller
public class GroupDetailController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	InterestService interestService;
	
	@Autowired
	GroupMemberService groupMemberService;
	
	// 모임 상세 첫 화면
	@GetMapping("/groupdetail")
	ModelAndView groupDetail(int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		String category = interestService.getInterestField(groupDTO.getGroupInterest());
		int memberCnt = groupMemberService.getMemberCountInGroup(groupId);
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("category", category);
		mv.addObject("memberCnt", memberCnt);
		mv.addObject("groupLeaderDTO", groupLeaderDTO);
		mv.setViewName("groupdetail/groupDetail");
		
		return mv;
		
	}
	
	// [모임설명&가입멤버] 탭
	@PostMapping("/groupdetail")
	ModelAndView groupInfo(int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("groupLeaderDTO", groupLeaderDTO);
		mv.setViewName("groupdetail/groupDetailInfo");
		
		return mv;
		
	}
	
	// 아래는 sessionId 저장/삭제하기위한 임시코드
	
	@GetMapping("/tmplogin")
	ModelAndView tmpLogin() {
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("groupdetail/login_tmp");
		
		return mv;
		
	}
	
	@PostMapping("/tmplogin")
	String tmpLoginProcess(int inputUserId, HttpSession session) {
		
		session.setAttribute("sessionUserId", inputUserId);
		
		return "groupdetail/login_tmp";
	}
	
	@PostMapping("/tmplogout")
	String tmpLogoutProcess(HttpSession session) {
		
		session.removeAttribute("sessionUserId");
		
		return "groupdetail/login_tmp";
	}
}
