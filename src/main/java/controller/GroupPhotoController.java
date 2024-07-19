package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/groupphoto")
public class GroupPhotoController {

	@RequestMapping("/photo")
	ModelAndView groupPhoto(int groupId) {
				
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("groupphoto/groupPhoto");
		
		return mv;
		
	}
	
}
