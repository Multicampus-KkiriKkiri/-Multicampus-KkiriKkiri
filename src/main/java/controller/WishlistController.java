package controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpSession;
import service.WishlistService;

@Controller
@RequestMapping("/wishlist")
public class WishlistController {
	
	@Autowired
	WishlistService wishlistService;
	
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
	
	@PostMapping("/add")
	@ResponseBody
	int addGroupToWishlist(int userId, int groupId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
			
		// 찜 목록에 저장
		return wishlistService.addGroupToWishlist(map); // 테이블에 추가된 행 개수 반환
		
	} // addGroupToWishlist() end
	
	@PostMapping("/delete")
	@ResponseBody
	int deleteGroupToWishlist(int userId, int groupId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
			
		// 찜 목록에 저장
		return wishlistService.deleteGroupToWishlist(map); // 테이블에 추가된 행 개수 반환
		
	} // deleteGroupToWishlist() end

} // WishlistController class end
