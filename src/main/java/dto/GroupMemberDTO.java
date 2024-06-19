package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class GroupMemberDTO {

	private int groupId;
	private int userId;
	private String signUpAnswer;
	private String statusDate;
	private String status;
	
}
