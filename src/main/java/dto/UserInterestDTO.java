package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Component
public class UserInterestDTO {
	
	private int userId;
	private int interestId; 

}
