package controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import service.GroupService;
import service.NotificationService;
import service.UserService;
import service.WishlistService;

@Controller
@RequestMapping("/wishlist")
public class WishlistController {
	
	@Autowired
	WishlistService wishlistService;
	
	@Autowired
	UserService userService;

	@Autowired
	GroupService groupService;
	
	@Autowired
	NotificationService notificationService;
	
	// 회원의 모임 찜 여부 확인
	@PostMapping("/check")
	@ResponseBody
	boolean checkUserWishlist(int userId, int groupId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
			
		// 회원 찜 목록 확인
		if(wishlistService.checkExistInWishlist(map)) { // true(회원 찜 목록에 이미 저장되어있는 경우)
			return true;
		} else { // false(찜 목록에 저장되어있지 않은 경우)
			return false;
		} // if end
		
	} // checkUserWishlist() end
	
	// 모임 찜 등록 과정
	@PostMapping("/add")
	@ResponseBody
	int addGroupToWishlist(int userId, int groupId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
			
		// 찜 목록에 저장
		int insertRow =  wishlistService.addGroupToWishlist(map); // 테이블에 추가된 행 개수 반환
		
		// 찜 저장 모임장한테 알림보내기
		notificationService.notifyToUserByGroup(groupService.getGroupDetail(groupId).getGroupLeaderId(), groupId, userService.getUserInfo(userId).getUserNickname() + "님이 내 모임을 찜했습니다.");
		
		return insertRow;
		
	} // addGroupToWishlist() end
	
	// 모임 찜 삭제 과정
	@PostMapping("/delete")
	@ResponseBody
	int deleteGroupToWishlist(int userId, int groupId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
			
		// 찜 목록에서 삭제
		return wishlistService.deleteGroupToWishlist(map); // 테이블에 추가된 행 개수 반환
		
	} // deleteGroupToWishlist() end

} // WishlistController class end
