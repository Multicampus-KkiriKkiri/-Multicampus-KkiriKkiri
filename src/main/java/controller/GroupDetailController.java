package controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.GroupDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupMemberService;
import service.GroupService;
import service.InterestService;
import service.NotificationService;
import service.UserService;

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
	NotificationService notificationService;

	// 모임 상세 첫 화면
	@GetMapping("/info")
	ModelAndView groupDetail(@RequestParam("groupId") int groupId, HttpSession session) {

		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		String category = interestService.getInterestField(groupDTO.getGroupInterestId());
		int groupMemberCnt = groupMemberService.getMemberCountInGroup(groupId);
		
		HashMap<String, String> regionMap = new HashMap<>();
		regionMap.put("groupRegion", groupService.getRegionNameByRegionId(groupDTO.getGroupRegionId()));
		regionMap.put("groupDistrict", groupService.getDistrictNameByDistrictId(groupDTO.getGroupDistrictId()));
		
		session.setAttribute("currentGroupId", groupId); // groupId를 세션에 저장 --안병찬- groupSettingSController에서 groupId를 사용해야할것같아서.
		
		ModelAndView mv = new ModelAndView();

		if (session.getAttribute("sessionUserInfo") != null) { // 로그인 상태 시
			mv.addObject("userId", (int)session.getAttribute("sessionUserId"));
			mv.addObject("profileImage", "/upload/" + ((UserDTO)session.getAttribute("sessionUserInfo")).getProfileImage());
			mv.addObject("userRegion", groupService.getRegionNameByRegionId(((UserDTO)session.getAttribute("sessionUserInfo")).getUserDistrictId()));
		} else {
			mv.addObject("userId", 0);
		}
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("groupLeaderDTO", groupLeaderDTO);
		mv.addObject("category", category);
		mv.addObject("groupMemberCnt", groupMemberCnt);
		mv.addObject("regionMap", regionMap);
		mv.addObject("memberList", groupMemberService.getGroupMemberList(groupId));

		mv.setViewName("groupdetail/groupDetail");

		return mv;

	} // groupDetail() end

	// [모임설명&가입멤버] 탭 클릭 시
	@PostMapping("/info")
	ModelAndView groupInfoTap(int groupId) {
		
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		UserDTO groupLeaderDTO = userService.getUserInfo(groupDTO.getGroupLeaderId());
		int groupMemberCnt = groupMemberService.getMemberCountInGroup(groupId);

		ModelAndView mv = new ModelAndView();
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("groupMemberCnt", groupMemberCnt);
		mv.addObject("groupLeaderDTO", groupLeaderDTO);
		
		if(groupMemberService.getMemberCountInGroup(groupId) > 1) { // 모임원 있을때
			mv.addObject("memberList", groupMemberService.getGroupMemberList(groupId));
		} else { // 없을때
			System.out.println("null");
			mv.addObject("memberList", null);
		}
		
		mv.setViewName("groupdetail/groupDetailInfo");

		return mv;

	} // groupInfoTap() end

	// 모임 멤버 목록 가져오기
	@GetMapping("/members")
	@ResponseBody
	List<UserDTO> getGroupMemberList(int groupId) {

		if(groupMemberService.getMemberCountInGroup(groupId) == 1) { // 모임원 0명일때
			 return null; 
		} else { // 모임원 있을때
			return groupMemberService.getGroupMemberList(groupId);
		}
		

	} // getGroupMemberList() end

	// 사용자 권한 확인(비회원/일반회원/모임원/모임장)
	@PostMapping("/authority")
	@ResponseBody
	String checkUserAuthority(int userId, int groupId) {
		if (userId == 0) { // 비회원
			return "nonuser";
		} else { // 회원
			GroupDTO groupDTO = groupService.getGroupDetail(groupId);

			if (userId == groupDTO.getGroupLeaderId()) { // 모임장
				return "leader";
			} else {
				HashMap<String, Integer> map = new HashMap<>();
				map.put("userId", userId);
				map.put("groupId", groupId);

				String memberStatusInGroup = groupMemberService.checkMemberStatusInGroup(map);

				if (memberStatusInGroup == null || memberStatusInGroup.equals("탈퇴")) { // 일반 회원
					return "user";
				} else if (memberStatusInGroup.equals("강퇴")) {
					return "blacklist";
				} else if (memberStatusInGroup.equals("승인")) { // 모임원
					return "member";
				} else if (memberStatusInGroup.equals("대기")) { // 가입신청 상태
					return "stanby";
				} else {
					return "error";
				}
			}
		} // check user autority if end
	}

	// 모임 가입 팝업창 열기(승인제)
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

	// 모임 가입 신청 과정
	@PostMapping("/groupjoin")
	@ResponseBody
	int submitGroupJoinApply(int userId, int groupId, String groupSignUpType, @RequestParam(required = false) String signUpAnswerTxt) {

		HashMap<String, Object> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
		map.put("groupSignUpType", groupSignUpType);
		
		// 가입 방식에 따라 signUpAnswer, status 다르게 저장
		if (groupSignUpType.equals("선착순")) { // 선착순
			map.put("signUpAnswer", null);
			map.put("status", "승인");		
		} else if (groupSignUpType.equals("승인제")) { // 승인제
			map.put("signUpAnswer", signUpAnswerTxt);
			map.put("status", "대기");
		}
		
		// 모임 내 해당 회원 탈퇴 내역 확인
		String historyStatus = groupMemberService.checkUserHistoryInGroup(map);
		int insertRow = 0;
		
		if(historyStatus == null || historyStatus.equals("탈퇴")) {
			// 모임 가입 신청
			if (historyStatus == null) { // 이전 가입 이력 없는 경우
		        insertRow = groupMemberService.addMemberToGroup(map); // groupMember 테이블에 새로 저장
		    } else if (historyStatus.equals("탈퇴")) { // 탈퇴 후 재가입
		        insertRow = groupMemberService.updateMemberToGroup(map); // groupMember 테이블에 있는 데이터 수정
		    }
			// 알림 보내는 과정
		    if (insertRow == 1) { // 모임 가입신청 과정 정상 처리
		        if (groupSignUpType.equals("선착순")) { // 선착순
		        	// 가입 신청한 회원한테 알림 보내기
		        	notificationService.notifyToUserByGroup(userId, groupId, "모임 가입 신청이 수락됐습니다.");
		            // 모임장한테 알림 보내기
		        	notificationService.notifyToUserByGroup(groupService.getGroupDetail(groupId).getGroupLeaderId(), groupId, userService.getUserInfo(userId).getUserNickname() + "님이 모임에 가입했습니다.");
		        } else if (groupSignUpType.equals("승인제")) { // 승인제
		        	// 모임장한테 알림 보내기
		        	notificationService.notifyToUserByGroup(groupService.getGroupDetail(groupId).getGroupLeaderId(), groupId, userService.getUserInfo(userId).getUserNickname() + "님이 모임에 가입 신청했습니다.");
		        }
		    }
			return insertRow;
		} else {
			return insertRow; // error
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