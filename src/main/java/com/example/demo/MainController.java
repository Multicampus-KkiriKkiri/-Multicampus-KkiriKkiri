package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
	
	@RequestMapping("/kkirikkiri")
	ModelAndView helloboot(){
		ModelAndView mv = new ModelAndView();
		mv.addObject("model","스프링부트를 시작합니다." );
		mv.setViewName("main");
		return mv;
	}
	
}

