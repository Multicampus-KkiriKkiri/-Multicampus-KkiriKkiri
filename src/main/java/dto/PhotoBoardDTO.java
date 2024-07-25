package dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class PhotoBoardDTO {

	private int photoBoardId;
    private int photoId;
    private int groupId;
    private String postTitle;
    private String uploadDateTime;
    private String photoFileName;
	
}
