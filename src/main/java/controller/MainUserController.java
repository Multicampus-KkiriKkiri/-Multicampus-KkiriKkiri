package controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.GroupDTO2;
import dto.RegionDTO;
import dto.UserDTO;
import dto.UserInterestDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupMemberService;
import service.GroupService;
import service.UserService;

@Controller
public class MainUserController {
	
	@Autowired
	private UserService userService;	
	
	@Autowired 
	private GroupService groupService;
	
	@Autowired
	private GroupMemberService groupMemberService;
	

    //로그인 처리
	@ResponseBody
    @PostMapping("/main")
    public String login(@ModelAttribute("user") UserDTO user, Model model, HttpSession session) {
    	//System.out.println(user.getUserEmail() + user.getUserPw());
        UserDTO loginUser = userService.logInUser(user.getUserEmail(), user.getUserPw());
        
        if (loginUser != null) { // 로그인 성공
        	session.setAttribute("sessionUserId", loginUser.getUserId()); // 세션에 로그인 회원 id 저장
        	session.setAttribute("sessionUserEmail", loginUser.getUserEmail()); // 세션에 로그인 회원 email 저장        	
        	session.setAttribute("sessionUserProfileImg", loginUser.getProfileImage()); // 세션에 로그인 회원 profileImage 저장        	
            model.addAttribute("loginUser", loginUser);
            return "success"; 
        } else { // 로그인 실패
            model.addAttribute("error", "아이디 혹은 비밀번호가 다릅니다.");
            return "fail"; 
        }
    }
	
	//로그인 완료된 화면 + 프로필 이미지 url 가져오기
	@GetMapping("/mainLogin")
	public String loginForm(Model model, HttpSession session) {
	    Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
	    if (sessionUserId != null) {
	        UserDTO loginUser = userService.getUserInfo(sessionUserId);
	        if (loginUser != null) {
	            String profileImage = loginUser.getProfileImage();
	            model.addAttribute("profileImage", profileImage);
	        }
	    }
	    model.addAttribute("user", new UserDTO()); 
	    return "/mainpage/mainLogin"; 
	}
	
	//로그아웃
	@RequestMapping("/logout")
	String logout(HttpSession session) {
		if(session.getAttribute("sessionUserId") != null) {
			session.removeAttribute("sessionUserId");				
		}
		return "/mainpage/main";
	}
		
	//회원가입
	@ResponseBody
    @PostMapping("/signup")
    public String signup(HttpSession session, @RequestParam String userEmail, @RequestParam String userPw, Model model) {
        UserDTO user = new UserDTO();
        user.setUserEmail(userEmail);
        user.setUserPw(userPw);
        user.setSignUpType("일반");
        
        String result = null;
        if (userService.signUp(user)) {
        	model.addAttribute("userEmail", userEmail);
        	model.addAttribute("userPw", userPw);
            result = "success"; 
        } else {
            result = "fail";  
        }
        //System.out.println("/signup==>"+result);
        int userId = Integer.parseInt(userService.getUserId(userEmail));           
        session.setAttribute("sessionUserEmail", user.getUserEmail()); //회원가입 후 이메일 세션에 저장
        session.setAttribute("sessionUserId", userId); //회원가입 후 회원 아이디 세션에 저장            
        return result;
    }	
	
    // 내정보설정 모달 내 = 지역정보 보여주기
    @GetMapping("/regions/{regionId}")
    @ResponseBody
    public List<DistrictDTO> getDistrictsByRegionId(@PathVariable int regionId) {
        return groupService.getDistrictsByRegionId(regionId); 
    }
   
    @GetMapping("/regions")
    @ResponseBody
    public List<RegionDTO> getAllRegions() {
        return groupService.getAllRegions(); 
    }
	
  //회원가입 - 내정보설정 모달 
    //별명 중복 확인
	@ResponseBody
	@PostMapping("/nicknameconfirm")
	public String nicknameconfirm(@RequestParam String userNickname) {
		UserDTO dto = userService.getUserNickname(userNickname);
		if(dto == null) {
			return "success";
		}else {
			return "fail";
		}			
	} 
	
    //내정보설정 입력값 데이터에 저장
	@ResponseBody
	@PostMapping("/signupprofile")
	public String signupprofile(HttpSession session, 
			@RequestParam String userNickname, 
			@RequestParam int userRegionId, 
			@RequestParam int userDistrictId, 
			@RequestParam(required = false) String profileIntro, 
			@RequestParam(required = false) String profileImage, 
			String[] interests, 
			Model model){		
		
		if (userNickname != null && interests != null && userRegionId != 0 && userDistrictId != 0) {
				
		//관심사 user_interest 테이블에 저장
		int userId = Integer.parseInt(userService.getUserId((String)session.getAttribute("sessionUserEmail")));
		
		    for (String interest : interests) {
		        UserInterestDTO idto = new UserInterestDTO();
		        idto.setUserId(userId);
		        
		        switch (interest) {
		            case "cultureArt":
		                idto.setInterestId(1);
		                break;
		            case "activity":
		                idto.setInterestId(2);
		                break;
		            case "foodDrink":
		                idto.setInterestId(3);
		                break;
		            case "selfStudy":
		                idto.setInterestId(4);
		                break;
		            case "etc":
		                idto.setInterestId(5);
		                break;
		            default:
		                break;
		        }
	
		        userService.setMyInterest(idto);
		    }
				
			//관심사 외 내정보 설정 user 테이블에 입력
			UserDTO user = new UserDTO();
			user.setUserEmail((String)session.getAttribute("sessionUserEmail"));
	        user.setUserNickname(userNickname);
	        user.setUserRegionId(userRegionId);
	        user.setUserDistrictId(userDistrictId);
	        user.setProfileIntro(profileIntro);
	        
	        //이미지 파일 세션에 넣어두었으나 실제 이미지 파일 저장된 상태가 아니고 보안상 c:fakePath/파일 형태로 저장됨
	        //추후 이미지 파일 저장 코드 구현을 아래쪽에 한 후 + 현재 이미지 관련 코드 수정 + jsp에서는 <img src="url"> 형태로 보여주기
	        //user.setProfileImage(profileImage);
	        user.setProfileImage("/images/test.png"); //임시 지정 파일이 데이터에 저장되도록 함
	        session.setAttribute("profileImage", user.getProfileImage());//c:fakePath/파일  
	              
	        //업데이트 처리 내용은 return이 숫자로 되기 때문에 조회하면 상세내용 확인 가능
	        //여기서는 업데이트가 됐는지 보기 위해 몇 개가 되었는지 확인하는 코드 생성
	        int updatecount = userService.signUpProfileUpdate(user);
	        //System.out.println(user + "==> updatecount==>" + updatecount);
	    	return "success";	
		}else {
			return "fail";
		}
	}		
	
	// 메인페이지 로그인 후 내 모임 정보 가져오기
	@ResponseBody
	@GetMapping("/mygroupdetail")
	public List<GroupDTO2> myGroupList(HttpSession session, Model model) {		
		
		Integer sessionUserId = (Integer) session.getAttribute("sessionUserId"); 
		int userId = sessionUserId != null ? sessionUserId.intValue() : 0; 		
		//System.out.println(userId);
		
		if(sessionUserId != null) {			
			List<Integer> mygroupIds = groupMemberService.getMyGroupIdList(userId);
	        List<GroupDTO2> myGroupDetails = new ArrayList<>();
	        List<Integer> groupIds = new ArrayList<>();
	        
	        for (int mygroupId : mygroupIds) {	            
	            GroupDTO groupDetail = groupService.getGroupDetail(mygroupId);
                GroupDTO2 groupDetail2 = new GroupDTO2();
                groupDetail2.setGroupId(groupDetail.getGroupId());
                groupDetail2.setGroupName(groupDetail.getGroupName());
                groupDetail2.setGroupImage(groupDetail.getGroupImage());
                groupDetail2.setGroupRegionId(groupDetail.getGroupRegionId());
                groupDetail2.setGroupDistrictId(groupDetail.getGroupDistrictId());
                groupDetail2.setGroupType(groupDetail.getGroupType());
                myGroupDetails.add(groupDetail2);
                groupIds.add(groupDetail.getGroupId()); 
	        }
	        
            for (GroupDTO2 myGroupDetail : myGroupDetails) {
                int groupRegionId = myGroupDetail.getGroupRegionId();
                int groupDistrictId = myGroupDetail.getGroupDistrictId();
                List<String> regionNames = groupService.getRegionName(groupRegionId);
                List<String> districtNames = groupService.getDistrictName(groupDistrictId);

                if (regionNames != null && !regionNames.isEmpty()&& !regionNames.get(0).equals("온라인")) {
                    String regionName = regionNames.get(0); // 리스트의 첫 번째 항목을 가져옴
                    myGroupDetail.setRegionName(regionName);
                } else {
                    myGroupDetail.setRegionName("");
                }

                if (districtNames != null && !districtNames.isEmpty()&&!districtNames.get(0).equals("온라인")) {
                    String districtName = districtNames.get(0); 
                    myGroupDetail.setDistrictName(districtName);
                } else {
                    myGroupDetail.setDistrictName("");
                }
            }     
            session.setAttribute("myGroupIds", groupIds);
			model.addAttribute("myGroupDetails", myGroupDetails);
			return myGroupDetails;	
		}else {			
			System.out.println("오류");			
			return null;
		}			
	}	

}



