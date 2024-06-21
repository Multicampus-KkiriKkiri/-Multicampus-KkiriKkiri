package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
/*
 * 모임 등록 컨트롤러
 */
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import service.GroupService;
// groupregister/register
@Controller
@RequestMapping("/groupregister")
public class GroupRegisterController {

	
	 @Autowired
	    private GroupService groupService;

	    @GetMapping("/register")
	    public String showGroupRegisterPage() {
	        return "groupregister/groupregister";
	    }

	    @PostMapping("/register")
	    public String registerGroup(@ModelAttribute GroupDTO groupDTO) {
	        // Group registration logic
	        return "redirect:/group/list";
	    }

	    @GetMapping("/regions")
	    @ResponseBody
	    public List<RegionDTO> getAllRegions() {
	        return groupService.getAllRegions();
	    }

	    @GetMapping("/regions/{regionId}")
	    @ResponseBody
	    public List<DistrictDTO> getDistrictsByRegionId(@PathVariable int regionId) {
	        return groupService.getDistrictsByRegionId(regionId);
	    }
	    
	/*
    @GetMapping
    public ModelAndView helloboot() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("model", "스프링부트를 시작합니다.");
        mv.setViewName("groupregister/groupregister");
        return mv;
    }
    */
}
