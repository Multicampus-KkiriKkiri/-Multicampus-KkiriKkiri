package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Component
public class UserDTO {

	private int userId;
	private String userEmail;
	private String userPw;
	private int userRegionId;
	private int userDistrictId;
	private String profileIntro;
	private String profileImage;
	private String signUpType; //not null
	private String userNickname;
	
}
