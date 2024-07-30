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
import java.util.List;
import java.util.UUID;
import net.coobird.thumbnailator.Thumbnails;

@Controller
@RequestMapping("/settings")
public class GroupSettingsController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/main")
    public ModelAndView groupSettingsMain(@RequestParam("groupId") int groupId, HttpSession session) {
        //System.out.println("Received request for group settings with groupId: " + groupId);
        session.setAttribute("currentGroupId", groupId);

        GroupDTO groupDTO = groupService.getGroupDetail(groupId);
        if (groupDTO == null) {
            throw new IllegalArgumentException("그룹 정보를 찾을 수 없습니다.");
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
    public ModelAndView updateGroup(
            @RequestParam("groupId") int groupId,
            @RequestParam("groupName") String groupName,
            @RequestParam("groupInterestId") int groupInterestId,
            @RequestParam("groupType") String groupType,
            @RequestParam(value = "groupRegionId", required = false) Integer groupRegionId,
            @RequestParam(value = "groupDistrictId", required = false) Integer groupDistrictId,
            @RequestParam("groupDetail") String groupDetail,
            @RequestParam("groupMaximum") int groupMaximum,
            @RequestParam("groupSignUpType") String groupSignUpType,
            @RequestParam(value = "groupSignUpQuestion", required = false) String groupSignUpQuestion,
            @RequestParam(value = "groupImage", required = false) MultipartFile groupImageFile,
            HttpSession session) throws IOException {

        GroupDTO groupDTO = new GroupDTO();
        groupDTO.setGroupId(groupId);
        groupDTO.setGroupName(groupName);
        groupDTO.setGroupInterestId(groupInterestId);
        groupDTO.setGroupType(groupType);
        groupDTO.setGroupRegionId(groupRegionId);
        groupDTO.setGroupDistrictId(groupDistrictId);
        groupDTO.setGroupDetail(groupDetail);
        groupDTO.setGroupMaximum(groupMaximum);
        groupDTO.setGroupSignUpType(groupSignUpType);
        groupDTO.setGroupSignUpQuestion(groupSignUpQuestion);

        if (groupImageFile != null && !groupImageFile.isEmpty()) {
            String imagePath = saveGroupImage(groupImageFile);
            groupDTO.setGroupImage(imagePath);
        }

        groupService.updateGroup(groupDTO);

        ModelAndView mv = new ModelAndView("redirect:/settings/main");
        mv.addObject("groupId", groupId);
        return mv;
    }
    @PostMapping("/deleteGroup")
    public ModelAndView deleteGroup(@RequestParam("groupId") int groupId) {
        groupService.deleteGroup(groupId);

        ModelAndView mv = new ModelAndView("redirect:/mypage");
        mv.addObject("groupId", groupId);
        return mv;
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
    @PostMapping("/checkGroupName")
    @ResponseBody
    public boolean checkGroupName(@RequestParam String groupName) {
        return groupService.checkGroupNameExists(groupName);
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