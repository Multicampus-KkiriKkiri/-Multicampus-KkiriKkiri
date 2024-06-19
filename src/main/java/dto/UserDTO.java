package dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

	int userId;
	String userEmail;
	String userPw;
	String userRegion;
	String profileIntro;
	String profileImage;
	String signUpType;
	
}
