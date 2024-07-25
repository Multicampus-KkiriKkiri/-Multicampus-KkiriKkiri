package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.PhotoBoardDTO;
import service.PhotoBoardService;

@Controller
@RequestMapping("/groupphoto")
public class GroupPhotoController {
	
	@Autowired
	PhotoBoardService photoBoardService;

	@RequestMapping("/photo")
	ModelAndView groupPhoto(int groupId, @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum) {
		
		int totalPostCount = photoBoardService.getTotalBoardCountByGroupId(groupId);
		
		ModelAndView mv = new ModelAndView();
		
		mv.addObject("pageNum", pageNum);
		mv.addObject("totalPostCount", totalPostCount);
		
		mv.setViewName("groupphoto/groupPhoto");
		
		return mv;
		
	}
	
	@PostMapping("/photoboardlist")
	@ResponseBody
	List<PhotoBoardDTO> photoBoardList(int groupId, int pageNum) {

		int postCountInOnePage = 9;
		int start = (pageNum - 1) * postCountInOnePage;
		int limitArr[] = {start, postCountInOnePage};
		
		return photoBoardService.getPagingBoardListByGroupId(groupId, limitArr);
		
	}
	
	// 모임 사진 게시물 팝업창 열기
	@GetMapping("/photopost")
	ModelAndView PhotoPostDetail(int photoBoardId) {
		
		List<PhotoBoardDTO> photoList = photoBoardService.getPhotoListByPhotoBoardId(photoBoardId);

		ModelAndView mv = new ModelAndView();
		
		mv.addObject("photoList", photoList);

		mv.setViewName("groupphoto/photoPost");

		return mv;

	}

}
