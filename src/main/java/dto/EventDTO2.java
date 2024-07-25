package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class EventDTO2 {

	private int eventId;
	private int maximumMemberCnt;
	private int currentMemberCnt;

}
