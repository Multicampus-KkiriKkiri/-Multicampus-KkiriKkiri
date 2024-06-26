package dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

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
	private String eventDetail;
	private String eventImage;
	private String eventType;
	private LocalDateTime eventDate;
	private String eventLocation;
	private int eventMaximum;
	
}
