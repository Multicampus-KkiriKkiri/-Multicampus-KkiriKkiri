package fileupload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadInform {
	public static final String uploadPath = "c://kkirikkiri/";
	public static final String uploadLocation = "file:///C:/kkirikkiri/";

	//public static final String uploadPath = "/usr/mydir/kkirikkiri/";
	//public static final String uploadLocation = "file:///usr/mydir/kkirikkiri/";
	
	public static final String userUploadPath = "c://kkirikkiri/user/"; // c:/kkirikkiri/user/
	public static final String userUploadLocation = "file:///C:/kkirikkiri/user/";
	
	
	// 병찬님 c:/kkirikkiri/group/
	
	public static final String groupPhotoUploadPath = "c://kkirikkiri/groupphoto/";
	public static final String groupPhotoUploadLocation = "file:///C:/kkirikkiri/groupphoto/";
	
	
	
}
