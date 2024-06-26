package controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import dto.EventDTO;
import dto.GroupDTO;
import service.EventService;
import service.GroupService;

@Controller
@RequestMapping("/groupdetail")
public class GroupEventController {
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	EventService eventService;

	@RequestMapping("/event")
	ModelAndView groupDetail(int groupId) {
				
		GroupDTO groupDTO = groupService.getGroupDetail(groupId);
		
		// 모임 일정 목록 가져오기
		List<EventDTO> eventList = eventService.getGroupEventList(groupId);

		// 예정된 일정 / 지난 일정 목록 나누기
		List<EventDTO> futureEventList = new ArrayList<>();
		List<EventDTO> pastEventList = new ArrayList<>();
		
		for (EventDTO event : eventList) {
            if (event.getEventDate().isAfter(LocalDateTime.now())) {
                futureEventList.add(event);
            } else {
                pastEventList.add(event);
            }
        }
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("groupDTO", groupDTO);
		mv.addObject("futureEventList", futureEventList);
		mv.addObject("pastEventList", pastEventList);
		mv.setViewName("groupevent/groupEvent");
		
		return mv;
		
	}
	
}
