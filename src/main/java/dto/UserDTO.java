package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class UserDTO {

	private int userId;
	private String userEmail;
	private String userPw;
	private String userRegion;
	private String profileIntro;
	private String profileImage;
	private String signUpType;
	private String userNickname;
	
}
