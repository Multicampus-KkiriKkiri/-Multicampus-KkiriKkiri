package service;

import java.util.List;

import dto.PhotoBoardDTO;

public interface PhotoBoardService {
	
	// 해당 모임의 사진 게시물 총 개수 가져오기
	int getTotalBoardCountByGroupId(int groupId);

	// 해당 모임의 사진 게시물 1페이지씩 가져오기
	List<PhotoBoardDTO> getPagingBoardListByGroupId(int groupId, int[] limit);
	
	// 한 게시물 내 모든 사진 정보 가져오기
	List<PhotoBoardDTO> getPhotoListByPhotoBoardId(int photoBoardId);

}