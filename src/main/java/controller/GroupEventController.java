package controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import dto.EventDTO;
import dto.GroupDTO;
import dto.UserDTO;
import service.EventMemberService;
import service.EventService;
import service.GroupService;
import service.NotificationService;
import service.UserService;

@Controller
@RequestMapping("/groupdetail")
public class GroupEventController {
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	EventService eventService;
	
	@Autowired
	EventMemberService eventMemberService;
	
	@Autowired
	NotificationService notificationService;
	
	@Autowired
	UserService userService;

	@RequestMapping("/event")
	ModelAndView groupDetail(int groupId) {
				
		// 모임 일정 목록 가져오기
		List<EventDTO> eventList = eventService.getGroupEventList(groupId);

		// 예정된 일정 / 지난 일정 목록 리스트
		List<EventDTO> upcomingEventList = new ArrayList<>();
		List<EventDTO> pastEventList = new ArrayList<>();
		
		// 일정 목록 나누기
		for (EventDTO event : eventList) {
			LocalDateTime eventLocalDateTime = event.getEventDateAsLocalDateTime();
			
			// 모임 일정 시간 문자 포맷 변경해서 다시 저장
			event.setEventDate(formatEventDate(eventLocalDateTime)); 
			
			// 현재 시간 기준 일정 목록 나누기
            if (eventLocalDateTime.isAfter(LocalDateTime.now())) { // 예정된 일정
            	upcomingEventList.add(event); 
            } else { // 지난 일정
                pastEventList.add(event); 
            }
        }
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("upcomingEventList", upcomingEventList);
		mv.addObject("pastEventList", pastEventList);
		mv.setViewName("groupevent/groupEvent");
		
		return mv;
		
	}
	
	// 모임 일정 시간을 '2024년 8월 7일 오후 2시 30분' 형식으로 변환하는 메소드
	private String formatEventDate(LocalDateTime dateTime) {
		
		int hour = dateTime.getHour();
        int minute = dateTime.getMinute();
        String amPm = hour >= 12 ? "오후" : "오전";
        if (hour > 12) {
            hour -= 12;
        } else if (hour == 0) {
            hour = 12;
        }

        StringBuilder formattedDate = new StringBuilder();
        formattedDate.append(String.format("%d년 %d월 %d일 %s %d시",
                dateTime.getYear(),
                dateTime.getMonthValue(),
                dateTime.getDayOfMonth(),
                amPm,
                hour));

        if (minute != 0) {
            formattedDate.append(String.format(" %d분", minute));
        }

        return formattedDate.toString();
    }
	
	// 현재 로그인한 회원의 모임 내 일정 참여 신청 내역 가져오기
	@PostMapping("/eventattendapplyhistory")
	@ResponseBody
	List<Integer> getEventAttendApplyHistory(int userId, int groupId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
				
		return eventMemberService.getMemberEventAttendApplyHistory(map);
		
	}
	
	// 각 일정 참여 신청한 모임원 목록 가져오기
	@PostMapping
	@ResponseBody
	List<UserDTO> getAttendMemberList(int eventId) {
		
		return eventMemberService.getAttendMemberListByEventId(eventId);
		
	}
	
	// 일정 참여 신청 팝업창 열기
	@GetMapping("/eventattend")
	ModelAndView eventAttend(int userId, int groupId, int eventId) {

		ModelAndView mv = new ModelAndView();
		mv.addObject("userId", userId);
		mv.addObject("groupId", groupId);
		mv.addObject("eventId", eventId);

		mv.setViewName("groupevent/groupEventAttend");

		return mv;

	}
	
	// 일정 참여 신청 과정
	@PostMapping("/eventattend")
	@ResponseBody
	int submitEventAttendApply(int userId, int groupId, int eventId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("groupId", groupId);
		map.put("eventId", eventId);
		
		return eventMemberService.addMemberToEvent(map);
			
	}
	
	// 일정 참여 취소 팝업창 열기
	@GetMapping("/eventattendcancel")
	ModelAndView eventAttendCancel(int userId, int groupId, int eventId) {

		ModelAndView mv = new ModelAndView();
		mv.addObject("userId", userId);
		mv.addObject("groupId", groupId);
		mv.addObject("eventId", eventId);

		mv.setViewName("groupevent/groupEventAttendCancel");

		return mv;

	}
	
	// 일정 참여 취소 과정
	@PostMapping("/eventattendcancel")
	@ResponseBody
	int cancelEventAttendApply(int userId, int eventId) {
		
		HashMap<String, Integer> map = new HashMap<>();
		map.put("userId", userId);
		map.put("eventId", eventId);
		
		return eventMemberService.deleteMemberToEvent(map);
		
	}

	
	
}
