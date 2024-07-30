package controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import dto.UserDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupService;
import net.coobird.thumbnailator.Thumbnails;
import fileupload.UploadInform;

@Controller
@RequestMapping("/groupregister")
public class GroupRegisterController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/register")
    public ModelAndView showGroupRegisterPage() {
        return new ModelAndView("groupregister/groupRegister");
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> registerGroup(HttpSession session,
                                                              @RequestParam("groupType1") String groupType,
                                                              @ModelAttribute GroupDTO groupDTO,
                                                              @RequestParam(value = "groupRegisterImage", required = false) MultipartFile groupImageFile) {
        Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
        UserDTO sessionUserInfo = (UserDTO) session.getAttribute("sessionUserInfo");

        if (sessionUserId == null || sessionUserInfo == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("message", "Session invalid"));
        }

        groupDTO.setGroupType(groupType);
        groupDTO.setGroupLeaderId(sessionUserId);

        if (groupService.checkGroupNameExists(groupDTO.getGroupName())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "이미 존재하는 모임 이름입니다. 다른 이름을 입력하세요."));
        }

        //String imagePath = UploadInform.uploadPath+ "groupregister/" + "blank.png"; // 기본 이미지 경로
        String imageName = "blank.png"; // 기본 이미지 dlfma
        if (groupImageFile != null && !groupImageFile.isEmpty()) {
            try {
                String uniqueFilename = saveGroupImage(groupImageFile);
                imageName = uniqueFilename; // 저장된 이미지 경로
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "이미지 업로드 중 오류가 발생했습니다."));
            }
        }

        groupDTO.setGroupImage(imageName);

        try {
            int groupId = groupService.registerGroup(groupDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("groupId", groupId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "모임 등록 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }

    private String saveGroupImage(MultipartFile groupImageFile) throws IOException {
        if (groupImageFile.isEmpty()) {
            throw new IOException("Uploaded file is empty");
        }

        String fileExtension = ".png";
        String uniqueFilename = generateUniqueFilename(fileExtension);

        File uploadDir = new File(UploadInform.uploadPath+"groupregister/");
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File resizedFile = new File(uploadDir, uniqueFilename);

        try (InputStream inputStream = groupImageFile.getInputStream()) {
            Thumbnails.of(inputStream)
                      .size(400, 300)
                      .outputFormat("png")
                      .toFile(resizedFile);
        }

        return uniqueFilename;
    }

    private String generateUniqueFilename(String fileExtension) {
        String uniqueFilename;
        File file;
        do {
            uniqueFilename = UUID.randomUUID().toString() + fileExtension;
            file = new File(UploadInform.uploadPath +"groupregister/" + uniqueFilename);//원래 코드 c://fullstack/upload/groupregister/b6c604d9-03f5-4b3f-a024-9fd8592a19ce.png이런식으로 저장. 이름만 저장하게 행햐ㅏㅁ
        } while (file.exists());

        return uniqueFilename;
    }

    @GetMapping("/regions/{regionId}")
    @ResponseBody
    public List<DistrictDTO> getDistrictsByRegionId(@PathVariable int regionId) {
        return groupService.getDistrictsByRegionId(regionId);
    }

    @GetMapping("/regions")
    @ResponseBody
    public List<RegionDTO> getAllRegions() {
        return groupService.getAllRegions();
    }

    @PostMapping("/checkGroupName")
    @ResponseBody
    public boolean checkGroupName(@RequestParam String groupName) {
        return groupService.checkGroupNameExists(groupName);
    }
}
