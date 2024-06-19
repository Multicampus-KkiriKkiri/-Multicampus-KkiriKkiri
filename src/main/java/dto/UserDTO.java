package dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter

@Component
public class UserDTO {

	int userId;
	String userEmail;
	String userPw;
	String userRegion;
	String profileIntro;
	String profileImage;
	String signUpType;
	String userNickname;
	
}
