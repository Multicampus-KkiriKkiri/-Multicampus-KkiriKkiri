package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DeferredImportSelector.Group;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import service.GroupService;


@Controller
public class MainController {
	
	//로그인 전 메인페이지
	@RequestMapping("/kkirikkiri")
	ModelAndView helloboot(){
		ModelAndView mv = new ModelAndView();
		mv.addObject("model","스프링부트를 시작합니다." );
		mv.setViewName("mainpage/main");
		return mv;
	}	
	
	@GetMapping("/groupsearch")
	ModelAndView groupSearch(@RequestParam(required = false) String keyword, @RequestParam(required = false) String region) {
		
		System.out.println(keyword);
		System.out.println(region);
		
		ModelAndView mv = new ModelAndView();
		
		/* 검색 페이지 내용... */
		
		return mv;
		
	}	
}

