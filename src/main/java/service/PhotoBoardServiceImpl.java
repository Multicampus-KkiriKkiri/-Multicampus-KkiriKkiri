package service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.PhotoBoardDAO;
import dto.PhotoBoardDTO;

@Service
public class PhotoBoardServiceImpl implements PhotoBoardService {

	@Autowired
	PhotoBoardDAO dao;

	@Override
	public int getTotalBoardCountByGroupId(int groupId) {
		return dao.getTotalBoardCountByGroupId(groupId);
	}

	@Override
	public List<PhotoBoardDTO> getPagingBoardListByGroupId(int groupId, int[] limitArr) {
		
		HashMap<String, Object> map = new HashMap<>();
		map.put("groupId", groupId);
		map.put("limitArr", limitArr);
		
		return dao.getPagingBoardListByGroupId(map);
    
	}
	
	@Override
	public List<PhotoBoardDTO> getPhotoListByPhotoBoardId(int photoBoardId) {
		return dao.getPhotoListByPhotoBoardId(photoBoardId);
	}
	
}
