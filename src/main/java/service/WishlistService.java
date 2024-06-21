package service;

import java.util.HashMap;

public interface WishlistService {
	
	// 회원의 모임 찜 여부 확인
	boolean checkExistInWishlist(HashMap map);
	
	// 모임 찜목록에 추가
	int addGroupToWishlist(HashMap map);

	// 모임 찜목록에서 삭제
	int deleteGroupToWishlist(HashMap map);
	
}
