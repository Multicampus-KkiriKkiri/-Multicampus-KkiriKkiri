package controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import lombok.Setter;
import service.GroupService;
import service.InterestService;
import service.UserService;

@Controller
public class MyPageController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private InterestService interestService;

	//내 정보 보여주기
	@GetMapping("/mypage")
	public ModelAndView myPage(HttpSession session) {
		
		Integer sessionUserId = (Integer)session.getAttribute("sessionUserId");
		ModelAndView mv = new ModelAndView();
		
		if(sessionUserId != null) {
			UserDTO loginUser = userService.getUserInfo(sessionUserId);
			String loginUserRegion = groupService.getRegionNameByRegionId(loginUser.getUserRegionId());
			String loginUserDistrict = groupService.getDistrictNameByDistrictId(loginUser.getUserDistrictId());
						
			List<Integer> loginUserInterestIds = interestService.getInterestIdByUserId(sessionUserId);
	        List<String> loginUserInterestNames = new ArrayList<>();
	        for (Integer interestId : loginUserInterestIds) {
	            String interestName = interestService.getInterestField(interestId);
	            loginUserInterestNames.add(interestName);
	        }		
	        
			mv.addObject("loginUser", loginUser);
			mv.addObject("loginUserRegion", loginUserRegion);
			mv.addObject("loginUserDistrict", loginUserDistrict);
			mv.addObject("loginUserInterestNames", loginUserInterestNames);
			mv.setViewName("/mypage/myPage");
		}else {
			mv.setViewName("redirect:/kkirikkiri");
		}
		return mv;		
	}
	
	//내 정보 수정 페이지로 가기 - editMyPage.jsp
	@RequestMapping("/editmypage")
	public ModelAndView editMyPage(HttpSession session) {
		
		UserDTO user = userService.getUserInfo((Integer)session.getAttribute("sessionUserId"));
		user.getUserRegionId();
		user.getUserDistrictId();		
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("userRegion", groupService.getRegionNameByRegionId(user.getUserRegionId()));
		mv.addObject("userDistrict", groupService.getDistrictNameByDistrictId(user.getUserDistrictId()));
		mv.addObject("userNickname", user.getUserNickname());
		mv.addObject("userProfileImage", user.getProfileImage());
		mv.addObject("userProfileIntro", user.getProfileIntro());
		mv.setViewName("/mypage/editMyPage");
		return mv;
	}
	
	//내 정보 수정
	@ResponseBody
	@PostMapping("/editmyprofile")
	public String editMyProfile(HttpSession session,
			@RequestParam(required = false) String userNickname, @RequestParam(required = false) Integer userRegionId,
			@RequestParam(required = false) Integer userDistrictId, @RequestParam(required = false) String profileIntro,
			@RequestParam(required = false) String profileImage) {	
		
		String userEmail = (String)session.getAttribute("sessionUserEmail");
		Integer userId = (Integer)session.getAttribute("sessionUserId");		
		UserDTO sessionUser = userService.getUserInfo(userId);
		
		UserDTO user = new UserDTO();		
		user.setUserEmail(userEmail);
  
        boolean isUpdated = false;

        if (userNickname != null && !userNickname.equals(sessionUser.getUserNickname())) {
            user.setUserNickname(userNickname);
            isUpdated = true;
        } else {
            user.setUserNickname(sessionUser.getUserNickname());
        }

        if (profileImage != null && !profileImage.equals(sessionUser.getProfileImage())) {
            user.setProfileImage(profileImage);
            isUpdated = true;
        } else {
            user.setProfileImage(sessionUser.getProfileImage());
        }

        if (profileIntro != null && !profileIntro.equals(sessionUser.getProfileIntro())) {
            user.setProfileIntro(profileIntro);
            isUpdated = true;
        } else {
            user.setProfileIntro(sessionUser.getProfileIntro());
        }

        if (userRegionId != null && !userRegionId.equals(sessionUser.getUserRegionId())) {
            user.setUserRegionId(userRegionId);
            isUpdated = true;
        } else {
            user.setUserRegionId(sessionUser.getUserRegionId());
        }

        if (userDistrictId != null && !userDistrictId.equals(sessionUser.getUserDistrictId())) {
            user.setUserDistrictId(userDistrictId);
            isUpdated = true;
        } else {
            user.setUserDistrictId(sessionUser.getUserDistrictId());
        }

        if (isUpdated) {
            if (userService.signUpProfileUpdate(user) == 1) {
                return "success";
            } else {
                return "fail";
            }
        } else {
            return "fail";
        }           
	}
	
	//내 정보 수정 - 기존 비밀번호 일치 확인
	@ResponseBody
	@PostMapping("/confirmpw")
	public String confirmUserPw(HttpSession session, @RequestParam String userPw) {
		int sessionUserId = (Integer)session.getAttribute("sessionUserId");
		
		String sessionUserPw = userService.getUserPwById(sessionUserId);
		
		if(sessionUserPw.equals(userPw)) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	//내 정보 수정 - 새로운 비밀번호 업데이트
	@ResponseBody
	@PostMapping("/updatenewpw")
	public String updateNewPw(HttpSession session, @RequestParam String newPw) {
		int sessionUserId = (Integer)session.getAttribute("sessionUserId");		
		String sessionUserPw = userService.getUserPwById(sessionUserId);
		
		if(!sessionUserPw.equals(newPw)) {
			UserDTO userdto = new UserDTO();
			userdto.setUserPw(newPw);
			userdto.setUserId(sessionUserId);			
			userService.modifyUserPw(userdto);			
			return "success";
		}else {
			return "fail";
		}	
	}
	
	//계정 삭제(회원탈퇴)
	@ResponseBody
	@PostMapping("/deleteaccount")
	public String deleteAccount (HttpSession session, @RequestParam String userPw) {
		int sessionUserId = (Integer)session.getAttribute("sessionUserId");		
		String sessionUserPw = userService.getUserPwById(sessionUserId);		
		if(sessionUserPw.equals(userPw)) {
			userService.deleteAccount(sessionUserId);
			return "success";
		}else {
			return "fail";
		}
	}
}






















