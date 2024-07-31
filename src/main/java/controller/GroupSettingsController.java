package controller;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import fileupload.UploadInform;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import service.GroupService;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.coobird.thumbnailator.Thumbnails;

@Controller
@RequestMapping("/settings")
public class GroupSettingsController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/main")
    public ModelAndView groupSettingsMain(@RequestParam("groupId") int groupId, HttpSession session) {
        session.setAttribute("currentGroupId", groupId);

        GroupDTO groupDTO = groupService.getGroupDetail(groupId);
        if (groupDTO == null) {
            throw new IllegalArgumentException("등록된 그룹 정보를 찾을 수 없습니다.");
        }

        ModelAndView mv = new ModelAndView("groupsettings/groupSettingsMain");
        mv.addObject("groupDTO", groupDTO);
        mv.addObject("userId", session.getAttribute("sessionUserId"));
        return mv;
    }
    
    @PostMapping("/group")
    public ModelAndView getGroupManagePage(HttpSession session) {
        return loadTabContent(session, "groupsettings/groupManage");
    }

    @PostMapping("/member")
    public ModelAndView getMemberManagePage(HttpSession session) {
        return loadTabContent(session, "groupsettings/memberManage");
    }

    @PostMapping("/event")
    public ModelAndView getEventManagePage(HttpSession session) {
        return loadTabContent(session, "groupsettings/eventManage");
    }

    @PostMapping("/photo")
    public ModelAndView getPhotoManagePage(HttpSession session) {
        return loadTabContent(session, "groupsettings/photoManage");
    }

    @PostMapping("/updateGroup")
    @ResponseBody
    public Map<String, Object> updateGroup(HttpSession session,
                                            @RequestParam Map<String, String> params,
                                            @RequestParam(value = "groupImageFile", required = false) MultipartFile groupImageFile) throws IOException {
        // 세션에서 groupId를 가져옵니다.
        Integer groupId = (Integer) session.getAttribute("currentGroupId");
        if (groupId == null) {
            throw new IllegalArgumentException("현재 그룹 ID를 세션에서 찾을 수 없습니다.");
        }

        // groupId는 세션에서 가져오므로, 요청 매개변수에서 제거합니다.
        String imageFilename = "blank.png";

        if (groupImageFile != null && !groupImageFile.isEmpty()) {
            // 이미지를 선택한 경우 새로운 파일을 저장
            imageFilename = saveGroupImage(groupImageFile);
        } else {
            // 이미지 파일이 없으면 기존 이미지를 유지
            String existingImageFilename = groupService.getExistingGroupImageFilename(groupId);
            if (existingImageFilename != null && !existingImageFilename.isEmpty()) {
                imageFilename = existingImageFilename;
            }
        }

        // 나머지 그룹 정보 처리 로직
        groupService.updateGroupInfo(groupId, params, imageFilename);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("imageFilename", imageFilename);
        return response;
    }

    private String saveGroupImage(MultipartFile groupImageFile) throws IOException {
        if (groupImageFile.isEmpty()) {
            throw new IOException("Uploaded file is empty");
        }
        
        String fileExtension = ".png";
        String uniqueFilename = generateUniqueFilename(fileExtension);

        File uploadDir = new File(UploadInform.uploadPath + "groupregister/");
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
            file = new File(UploadInform.uploadPath + "groupregister/" + uniqueFilename);
        } while (file.exists());

        return uniqueFilename;
    }

    @PostMapping("/deleteGroup")
    public ModelAndView deleteGroup(@RequestParam("groupId") int groupId) {
        groupService.deleteGroup(groupId);
        return new ModelAndView("redirect:/mypage");
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

    @GetMapping("/checkGroupName")
    @ResponseBody
    public boolean checkGroupName(@RequestParam String groupName) {
        return groupService.checkGroupNameExists(groupName);
    }

    private ModelAndView loadTabContent(HttpSession session, String viewName) {
        Integer groupId = (Integer) session.getAttribute("currentGroupId");
        if (groupId == null) {
            throw new IllegalArgumentException("groupId는 필수입니다.");
        }

        GroupDTO groupDTO = groupService.getGroupById(groupId);
        ModelAndView mv = new ModelAndView(viewName);
        mv.addObject("groupDTO", groupDTO);
        return mv;
    }
}
