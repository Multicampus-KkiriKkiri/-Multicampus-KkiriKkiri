package fileupload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadInform {
    public static final String uploadPath = "c://fullstack/upload/";
    public static final String uploadLocation = "file:///C:/fullstack/upload/";
    public static final String uploadWebPath = "/uploads/";

    public static final String groupPhotoUploadPath = "c:/kkirikkiri/groupphoto/";
    public static final String groupPhotoUploadLocation = "file:///c:/kkirikkiri/groupphoto/";
    public static final String groupPhotoWebPath = "/groupphoto/";

    public static final String groupRegisterUploadPath = "c://fullstack/upload/groupregister/";
    public static final String groupRegisterUploadLocation = "file:///c:/fullstack/upload/groupregister/";
    public static final String groupRegisterWebPath = "/groupregister/uploads/";
}
