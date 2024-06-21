package controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.GroupDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupMemberService;
import service.GroupService;
import service.InterestService;
import service.UserService;
import service.WishlistService;

/*
 * http://localhost:9090/groupdetail/tmplogin 로 임시 접속
 */

@Controller
@RequestMapping("/groupdetail")
public class GroupDetailController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	InterestService interestService;
	
	@Autowired
	GroupMemberService groupMemberService;
	
	@Autowired
	WishlistService wishlistService;
	
	// 모임 상세 첫 화면
	@GetMapping("/info")
	ModelAndView groupDetail(int groupId, HttpSession session) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		String category = interestService.getInterestField(groupDTO.getGroupInterest());
		int memberCnt = groupMemberService.getMemberCountInGroup(groupId);
		
		ModelAndView mv = new ModelAndView();
		
		if(session.getAttribute("sessionUserId") != null) { // 로그인 상태 시
			mv.addObject("userId", (int)session.getAttribute("sessionUserId"));
		} else {
			mv.addObject("userId", 0);
		}
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("category", category);
		mv.addObject("memberCnt", memberCnt);
		mv.addObject("groupLeaderDTO", groupLeaderDTO);
		
		mv.setViewName("groupdetail/groupDetail");
		
		return mv;
		
	}
	
	// [모임설명&가입멤버] 탭 클릭 시
	@PostMapping("/info")
	ModelAndView groupInfoTap(int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("groupLeaderDTO", groupLeaderDTO);
		mv.setViewName("groupdetail/groupDetailInfo");
		
		return mv;
		
	}
	
	// 사용자 권한 확인(비회원/일반회원/모임원/모임장)
	@PostMapping("/authority")
	@ResponseBody
	String checkUserAuthority(int userId, int groupId) {
        if (userId == 0) { // 비회원
            return "nonuser";
        } else { // 회원
        	GroupDTO groupDTO = groupService.getGroupDetail(groupId);
        	
            if(userId == groupDTO.getGroupLeaderId()) { // 모임장
            	return "leader";
            } else {
            	HashMap<String, Integer> map = new HashMap<>();
                map.put("userId", userId);
                map.put("groupId", groupId);
                
                if(groupMemberService.checkMemberInGroup(map)) { // 모임원
                	return "member";
                } else { // 일반회원
                	return "user";
                }
            }
        } // check user autority if end
	}
	
	// 모임 가입 팝업창 열기
	@GetMapping("/groupjoin")
	ModelAndView groupJoin(int userId, int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO tmpDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		UserDTO leaderDTO = new UserDTO();
		leaderDTO.setUserId(tmpDTO.getUserId());
		leaderDTO.setProfileImage(tmpDTO.getProfileImage());
		leaderDTO.setUserNickname(tmpDTO.getUserNickname());
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("userId", userId);
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("groupLeaderDTO", leaderDTO);
		
		mv.setViewName("groupdetail/groupJoin");
		
		return mv;
		
	}
	
	// 모임 가입 신청서 제출
	@PostMapping("/groupjoin")
	@ResponseBody
	int submitJoinApply(int userId, int groupId, String signUpAnswerTxt) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		String signUpType = groupDTO.getGroupSignUpType();
				
		HashMap<String, Object> map = new HashMap<>();
		map.put("userId", userId);
        map.put("groupId", groupId);
        map.put("signUpAnswer", signUpAnswerTxt);
        
        // 가입 방식 구분(선착순/승인제)
     	if(signUpType.equals("선착순")) { // 선착순
     		map.put("status", "승인");
     	} else { // 승인제
     		map.put("status", "대기");
     	}
        
        // 모임 내 해당 회원 탈퇴/강퇴 내역 확인
        String historyStatus = groupMemberService.checkUserHistoryInGroup(map);
        
        if(historyStatus.equals("강퇴")) { // 강퇴 이력 있는 경우 가입 신청 불가
        	return 0;
        } else if(historyStatus.equals("탈퇴")) { // 탈퇴 후 재가입
        	return groupMemberService.updateMemberToGroup(map);
        } else { // 이전 가입 이력 없는 경우
        	return groupMemberService.addMemberToGroup(map);
        }
		
        
		
	}
	
	// 모임 탈퇴 팝업창 열기
	@GetMapping("/groupquit")
	ModelAndView groupQuit(int userId, int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("userId", userId);
		mv.addObject("groupDTO", groupDTO);
		
		mv.setViewName("groupdetail/groupQuit");
		
		return mv;
		
	}

	// 모임 탈퇴 과정
	@PostMapping("/groupquit")
	@ResponseBody
	int submitGroupQuit(int userId, int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
				
		HashMap<String, Object> map = new HashMap<>();
		map.put("userId", userId);
        map.put("groupId", groupId);
        map.put("status", "탈퇴");
        
        return groupMemberService.updateMemberToGroup(map);
		
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
