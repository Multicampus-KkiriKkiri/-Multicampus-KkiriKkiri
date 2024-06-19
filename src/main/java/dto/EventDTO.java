package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class EventDTO {
	
	int eventId;
	int groupId;
	String eventName;
	
}
