package fileupload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadInform {
    public static final String uploadPath = "c://fullstack/upload/";
    public static final String uploadLocation = "file:///c:/fullstack/upload/";
    public static final String uploadWebPath = "/upload/";
  
    // public static final String uploadPath = "/usr/mydir/upload/";
    // public static final String uploadLocation = "file:/usr/mydir/upload/";
}
