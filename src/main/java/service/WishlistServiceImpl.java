package service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.WishlistDAO;

@Service
public class WishlistServiceImpl implements WishlistService {

	@Autowired
	WishlistDAO dao;
	
	@Override
	public boolean checkExistInWishlist(HashMap map) {
		if(dao.checkExistInWishlist(map) == 0) {
			return false;
		} else {
			return true;
		}
	}
	
	@Override
	public int addGroupToWishlist(HashMap map) {
		if(dao.checkExistInWishlist(map) == 0) {
			return dao.addGroupToWishlist(map);
		} else {
			return 0;
		}
	}

	@Override
	public int deleteGroupToWishlist(HashMap map) {
		if(dao.checkExistInWishlist(map) == 1) {
			return dao.deleteGroupToWishlist(map);
		} else {
			return 0;
		}
	}

}
