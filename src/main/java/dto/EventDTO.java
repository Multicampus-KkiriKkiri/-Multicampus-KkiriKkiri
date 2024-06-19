package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class EventDTO {
	
	private int eventId;
	private int groupId;
	private String eventName;
	
}
