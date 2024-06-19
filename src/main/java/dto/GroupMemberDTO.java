package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupMemberDTO {

	int groupId;
	int userId;
	String signUpAnswer;
	String statusDate;
	String status;
	
}
