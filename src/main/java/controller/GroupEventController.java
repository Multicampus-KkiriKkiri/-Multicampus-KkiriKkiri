package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.GroupDTO;
import service.GroupService;

@Controller
@RequestMapping("/groupdetail")
public class GroupEventController {
	
	@Autowired
	GroupService groupService;

	@RequestMapping("/event")
	ModelAndView groupDetail(int groupId) {
				
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupDTO", groupDTO);
		mv.setViewName("groupevent/groupEvent");
		
		return mv;
		
	}
	
}
