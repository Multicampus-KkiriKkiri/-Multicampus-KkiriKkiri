package controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.GroupDTO;
import dto.GroupDTO2;
import service.GroupService;


@Controller
public class MainController {
	
	@Autowired 
	private GroupService groupService;
	
	//로그인 전 메인페이지
	@RequestMapping("/kkirikkiri")
	ModelAndView helloboot(){
		ModelAndView mv = new ModelAndView();
		mv.addObject("model","스프링부트를 시작합니다." );
		mv.setViewName("mainpage/main");
		return mv;
	}	
	
	//상단 검색 후 이동
	@GetMapping("/groupsearch")
	ModelAndView groupSearch(@RequestParam(required = false) String keyword, @RequestParam(required = false) String region) {		
		System.out.println(keyword);
		System.out.println(region);
		
		ModelAndView mv = new ModelAndView();
		
		/* 검색 페이지 내용... */
		
		return mv;		
	}	
	
	//메인페이지 - 관심사별 그룹 내용 가져오기
	@ResponseBody
	@GetMapping("/groupDetailsByInterest")
	public List<HashMap<String, Object>> getGroupDetailsByInterestId(@RequestParam int interestId, Model model) {
		ArrayList<HashMap<String, Object>> groupDetailsByInterest = groupService.getGroupDetailsByInterestId(interestId);
		//model.addAttribute("groupDetailsByInterest", groupDetailsByInterest);	
		return groupDetailsByInterest;		
	}
	
	//메인페이지 - 로그인 전 신상 모임 가져오기
	@ResponseBody
	@GetMapping("/getNewestGroup")
	public List<GroupDTO2> getNewestGroupDetails(Model model){
		
		List<GroupDTO> newestGroupDetails = groupService.getNewestGroupDetails();		
		List<GroupDTO2> newestGroupDetails2 = new ArrayList<>();
		
		for (GroupDTO dto : newestGroupDetails) {		
			GroupDTO2 dto2 = new GroupDTO2();			
			dto2.setGroupName(dto.getGroupName());
			dto2.setGroupImage(dto.getGroupImage());
			dto2.setGroupType(dto.getGroupType());
			dto2.setGroupRegionId(dto.getGroupRegionId());
			dto2.setGroupDistrictId(dto.getGroupDistrictId());
			newestGroupDetails2.add(dto2);
		}		
        
		for (GroupDTO2 newestGroupDetail2 : newestGroupDetails2) {
		      int groupRegionId = newestGroupDetail2.getGroupRegionId();
		      int groupDistrictId = newestGroupDetail2.getGroupDistrictId();
		      List<String> regionNames = groupService.getRegionName(groupRegionId);
		      List<String> districtNames = groupService.getDistrictName(groupDistrictId);
		
		      if (regionNames != null && !regionNames.isEmpty()&& !regionNames.get(0).equals("온라인")) {
		          String regionName = regionNames.get(0); // 리스트의 첫 번째 항목을 가져옴
		          newestGroupDetail2.setRegionName(regionName);
			  } else {
				  newestGroupDetail2.setRegionName("");
			  }
			
			  if (districtNames != null && !districtNames.isEmpty()&& !districtNames.get(0).equals("온라인")) {
			      String districtName = districtNames.get(0); 
			      newestGroupDetail2.setDistrictName(districtName);
			  } else {
				  newestGroupDetail2.setDistrictName("");
		      }
			  	
		}
		model.addAttribute("newestGroupDetail2", newestGroupDetails2);
		return newestGroupDetails2;	
	}
	
	
}


