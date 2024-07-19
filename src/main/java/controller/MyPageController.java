package controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import dto.EventDTO;
import dto.GroupDTO;
import dto.GroupDTO2;
import dto.UserDTO;
import dto.UserInterestDTO;
import fileupload.UploadInform;
import jakarta.servlet.http.HttpSession;
import service.EventService;
import service.GroupMemberService;
import service.GroupService;
import service.InterestService;
import service.UserService;
import service.WishlistService;

@Controller
public class MyPageController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
	private InterestService interestService;
	
	@Autowired
	private EventService eventService;
	
	@Autowired
	private GroupMemberService groupMemberService;
	
	@Autowired
	private WishlistService wishlistService;

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
			
			String profileImage = "/upload/" + loginUser.getProfileImage();			
			mv.addObject("profileImage", profileImage);						
			//mv.addObject("profileImage", loginUser.getProfileImage());		
			
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
		String profileImage = "/upload/" + user.getProfileImage();			
		mv.addObject("profileImage", profileImage);
		//mv.addObject("profileImage", user.getProfileImage());
		mv.addObject("userProfileIntro", user.getProfileIntro());
		mv.setViewName("/mypage/editMyPage");
		return mv;
	}
	
	//내 정보 수정 - 별명 중복 확인
	@ResponseBody
	@PostMapping("/editmynickname")
	public String nicknameconfirm(HttpSession session, @RequestParam String userNickname) {
				
		//세션 아이디로 가져온 사용자 정보
		UserDTO userdto = userService.getUserInfo((Integer)session.getAttribute("sessionUserId"));
				
		//세션 사용자 정보로 가져온 사용자 별명
		UserDTO dto = userService.getUserNickname(userdto.getUserNickname());
		List<String> allUserNicknames = userService.getAllUserNicknames();
		String result = null;

		if (dto.getUserNickname().equals(userNickname)) {
	        result = "same";
	    } else {
	        result = "success"; 
	        for (String allUserNickname : allUserNicknames) {
	            if (userNickname.equals(allUserNickname)) {
	                result = "fail";
	                break;
	            }
	        }
	    }							
		return result;		
	} 	
	
	//내 정보 수정   
	@ResponseBody
	@PostMapping("/editmyprofile")
	public String editMyProfile(HttpSession session,
			@RequestParam(required = false) String userNickname, @RequestParam(required = false) Integer userRegionId,
			@RequestParam(required = false) Integer userDistrictId, @RequestParam(required = false) String profileIntro,
			@RequestParam(required = false) MultipartFile profileImage) {	
		
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

        // 프로필 이미지 업데이트
        if (profileImage != null && !profileImage.isEmpty()) {
            String savePath = UploadInform.uploadPath;
            String newFileName = null;
           
            try {
                String originalName = profileImage.getOriginalFilename();
                String beforeExt = originalName.substring(0, originalName.indexOf("."));
                String ext = originalName.substring(originalName.indexOf("."));
                newFileName = beforeExt + "(" + UUID.randomUUID().toString() + ")" + ext;
                profileImage.transferTo(new File(savePath + newFileName));
                user.setProfileImage(newFileName);               
                isUpdated = true;
                //session.setAttribute("profileImage", newFileName);
                UserDTO userDTO = (UserDTO)session.getAttribute("sessionUserInfo");
                userDTO.setProfileImage(newFileName);
                
                System.out.println(newFileName);
                
                
            } catch (IOException e) {
                e.printStackTrace();
                return "fail";
            }
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
            	return "{\"status\": \"success\", \"profileImage\": \"/upload/" + user.getProfileImage() + "\"}";
            	//return "{\"status\": \"success\", \"profileImage\": \"" + user.getProfileImage() + "\"}";
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
	
	//내 관심사 수정
	@ResponseBody
	@PostMapping("/modifyInterestId")
	public String[] modifyUserInterestId(HttpSession session, @RequestParam(required = false) String[] interests) {
		Integer sessionUserId = (Integer)session.getAttribute("sessionUserId");
		
		String[] result = {};
		if(interests != null) {
			if(interests.length != 0) {
				UserInterestDTO interestdto = new UserInterestDTO();
				userService.deleteUserInterestId(sessionUserId);			
				
	 			interestdto.setUserId(sessionUserId);
				for (String interest : interests) {	 
					if(interest.equals("문화예술")) {
						interestdto.setInterestId(1);
						userService.setMyInterest(interestdto);
					}
					if(interest.equals("액티비티")) {
						interestdto.setInterestId(2);
						userService.setMyInterest(interestdto);
					}
					
					if(interest.equals("푸드/드링크")) {
						interestdto.setInterestId(3);
						userService.setMyInterest(interestdto);
					}
					
					if(interest.equals("자기계발")) {
						interestdto.setInterestId(4);
						userService.setMyInterest(interestdto);
					}
					
					if(interest.equals("기타")) {
						interestdto.setInterestId(5);
						userService.setMyInterest(interestdto);
					}					
			    }//for 
				result= interests;
			    //return interests;		    
			}else if(interests.length == 0) {
				result=null;
			}	
		}else {
			result = null;
		}
		return result;
	}	
	
	//내 일정 목록 가져오기
	@ResponseBody
	@GetMapping("/showmygroupeventlist")
	public Map<String, Object> showMyGroupEventList(HttpSession session) {
	    int sessionUserId = (Integer) session.getAttribute("sessionUserId");

	    List<EventDTO> myGroupEventLists = eventService.getMyGroupEvent(sessionUserId);
	    Map<String, List<EventDTO>> groupedEvents = new LinkedHashMap<>();

	    if (myGroupEventLists != null) {
	        for (EventDTO event : myGroupEventLists) {
	            String eventDate = event.getEventDate();
	            if (!groupedEvents.containsKey(eventDate)) {
	                groupedEvents.put(eventDate, new ArrayList<>());
	            }
	            groupedEvents.get(eventDate).add(event);
	        }

	        Map<String, Object> hashMap = new HashMap<>();
	        hashMap.put("groupedEvents", groupedEvents);

	        return hashMap;
	    } else {
	        Map<String, Object> errorMap = new HashMap<>();
	        errorMap.put("error", "아직 내 모임이 없습니다.");
	        return errorMap;
	    }
	}
	
	//내 모임 목록 가져오기 - 모임원인 경우	
	@ResponseBody
	@GetMapping("/mygroupdetailasmember")
	public List<GroupDTO2> myGroupList(
	        HttpSession session, @RequestParam("page") int page,@RequestParam("size") int size) {

	    Integer sessionUserId = (Integer) session.getAttribute("sessionUserId"); 
	    int userId = sessionUserId != null ? sessionUserId.intValue() : 0; 	        
	    
	    List<Integer> mygroupIds = groupMemberService.getMyGroupIdList(userId);
	    int startIndex = page * size;
		int endIndex = Math.min(startIndex + size, mygroupIds.size());
	    
	    if(sessionUserId != null && page * size < mygroupIds.size()) {            
	        List<GroupDTO2> myGroupDetails = new ArrayList<>();
	        List<Integer> groupIds = new ArrayList<>();	        
	        List<Integer> paginatedGroupIds = mygroupIds.subList(startIndex, endIndex);
	        
	        for (int mygroupId : paginatedGroupIds) {    
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

	            if (regionNames != null && !regionNames.isEmpty() && !regionNames.get(0).equals("온라인")) {
	                String regionName = regionNames.get(0); // 리스트의 첫 번째 항목을 가져옴
	                myGroupDetail.setRegionName(regionName);
	            } else {
	                myGroupDetail.setRegionName("");
	            }

	            if (districtNames != null && !districtNames.isEmpty() && !districtNames.get(0).equals("온라인")) {
	                String districtName = districtNames.get(0); 
	                myGroupDetail.setDistrictName(districtName);
	            } else {
	                myGroupDetail.setDistrictName("");
	            }
	        }     
	        return myGroupDetails;    
	    } else {            
	        System.out.println("오류");            
	        return null;
	    }            
	}

	//내 모임 목록 가져오기 - 모임장인 경우
	@ResponseBody
	@GetMapping("/mygroupasleader")
	public List<GroupDTO2> showMyGroupsAsLeader (
			HttpSession session, @RequestParam("page") int page, @RequestParam("size") int size) {
		
		Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");		
		List<GroupDTO> groupdto = groupService.getGroupDetailAsLeader(sessionUserId);
		
		int startIndex = page * size;
		int endIndex = Math.min(startIndex + size, groupdto.size());
		
		if (sessionUserId != null && page * size < groupdto.size()) {
	        List<GroupDTO2> myGroupsAsLeader = new ArrayList<>();
	        List<GroupDTO> paginatedGroupDto = groupdto.subList(startIndex, endIndex);

	        for (GroupDTO group : paginatedGroupDto) {
	            GroupDTO2 myGroupAsLeader = new GroupDTO2();
	            System.out.println("grouplist:" + group);
	            myGroupAsLeader.setGroupImage(group.getGroupImage());
	            myGroupAsLeader.setGroupName(group.getGroupName());
	            myGroupAsLeader.setGroupType(group.getGroupType());

	            List<String> groupRegionNames = groupService.getRegionName(group.getGroupRegionId());
	            List<String> groupDistrictNames = groupService.getDistrictName(group.getGroupDistrictId());

	            // 모임별로 하나의 지역값이 있기 때문에 가능한 코드
	            if (!groupRegionNames.isEmpty()) {
	                myGroupAsLeader.setRegionName(groupRegionNames.get(0));
	            }
	            if (!groupDistrictNames.isEmpty()) {
	                myGroupAsLeader.setDistrictName(groupDistrictNames.get(0));
	            }
	            myGroupsAsLeader.add(myGroupAsLeader);
	        }
	        return myGroupsAsLeader;
	    } else {
	        return null;
	    }	
	}		
	
	//내 모임 목록 가져오기 - 신청대기 모임
		@ResponseBody
		@GetMapping("/mypendinggroupdetail")
		public List<GroupDTO2> myPendingGroupList(HttpSession session) {		
			
			Integer sessionUserId = (Integer) session.getAttribute("sessionUserId"); 
			int userId = sessionUserId != null ? sessionUserId.intValue() : 0; 		
			//System.out.println(userId);
			
			if(sessionUserId != null) {			
				List<Integer> mygroupIds = groupMemberService.getMyPendingGroupIdList(userId);
		        List<GroupDTO2> myPendingGroupDetails = new ArrayList<>();
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
	                myPendingGroupDetails.add(groupDetail2);
	                groupIds.add(groupDetail.getGroupId()); 
		        }
		        
	            for (GroupDTO2 myGroupDetail : myPendingGroupDetails) {
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
				return myPendingGroupDetails;	
			}else {						
				return null;
			}			
		}
		
		//내 모임 목록 가져오기 - 찜 모임
				@ResponseBody
				@GetMapping("/mywishlistgroupdetail")
				public List<GroupDTO2> myWishlistGroupList(HttpSession session) {		
					
					Integer sessionUserId = (Integer) session.getAttribute("sessionUserId"); 
					int userId = sessionUserId != null ? sessionUserId.intValue() : 0; 		
					//System.out.println(userId);
					
					if(sessionUserId != null) {			
						List<Integer> mygroupIds = wishlistService.getMyWishlistGroupId(userId);
				        List<GroupDTO2> mywishlistGroupDetails = new ArrayList<>();
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
			                mywishlistGroupDetails.add(groupDetail2);
			                groupIds.add(groupDetail.getGroupId()); 
				        }
				        
			            for (GroupDTO2 myGroupDetail : mywishlistGroupDetails) {
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
						return mywishlistGroupDetails;	
					}else {					
						return null;
					}			
				}	
	
	
	
	
}






















