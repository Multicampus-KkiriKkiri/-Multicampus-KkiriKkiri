package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MyPageController {

	@RequestMapping("/mypage")
	ModelAndView myPage() {
		ModelAndView mv = new ModelAndView();
		mv.addObject("model", "mypage");
		mv.setViewName("/mypage/myPage");
		return mv;
	}
}
