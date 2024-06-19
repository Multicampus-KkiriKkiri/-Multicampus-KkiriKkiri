package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
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
