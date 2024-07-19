package controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import jakarta.servlet.http.HttpSession;
import service.GroupService;
import net.coobird.thumbnailator.Thumbnails;

@Controller
@RequestMapping("/groupregister")
public class GroupRegisterController {

    @Autowired
    private GroupService groupService;
    
    private static final String UPLOAD_DIR = "C:/groupUpload/";

    @GetMapping("/register")
    public ModelAndView showGroupRegisterPage() {
        return new ModelAndView("groupregister/groupRegister");
    }

    @PostMapping("/register")
    public ModelAndView registerGroup(HttpSession session, 
                                      @RequestParam("groupType1") String groupType, 
                                      @ModelAttribute GroupDTO groupDTO, 
                                      @RequestParam("groupRegisterImage") MultipartFile groupImageFile) {
        Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
        if (sessionUserId == null) {
            return new ModelAndView("redirect:/kkirikkiri");
        }

        groupDTO.setGroupType(groupType);
        groupDTO.setGroupLeaderId(sessionUserId);

        // 모임 이름 중복 체크
        if (groupService.checkGroupNameExists(groupDTO.getGroupName())) {
            ModelAndView mav = new ModelAndView("groupregister/groupRegister");
            mav.addObject("message", "이미 존재하는 모임 이름입니다. 다른 이름을 입력하세요.");
            return mav;
        }

        if (!groupImageFile.isEmpty()) {
            try {
                String uniqueFilename = saveGroupImage(groupImageFile);
                groupDTO.setGroupImage(UPLOAD_DIR + "resized_" + uniqueFilename);
            } catch (IOException e) {
                e.printStackTrace();
                ModelAndView mav = new ModelAndView("groupregister/groupRegister");
                mav.addObject("message", "이미지 업로드 중 오류가 발생했습니다.");
                return mav;
            }
        }

        try {
            int groupId = groupService.registerGroup(groupDTO);
            return new ModelAndView("redirect:/groupdetail/info?groupId=" + groupId);
        } catch (RuntimeException e) {
            ModelAndView mav = new ModelAndView("groupregister/groupRegister");
            mav.addObject("message", "모임 등록 중 오류가 발생했습니다.");
            return mav;
        }
    }

    private String saveGroupImage(MultipartFile groupImageFile) throws IOException {
        String originalFilename = groupImageFile.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = generateUniqueFilename(fileExtension);

        File originalFile = new File(UPLOAD_DIR + uniqueFilename);
        groupImageFile.transferTo(originalFile);

        BufferedImage originalImage = ImageIO.read(originalFile);
        BufferedImage resizedImage = Thumbnails.of(originalImage)
                                               .size(300, 300)
                                               .asBufferedImage();
        File resizedFile = new File(UPLOAD_DIR + "resized_" + uniqueFilename);
        ImageIO.write(resizedImage, "jpg", resizedFile);

        return uniqueFilename;
    }

    private String generateUniqueFilename(String fileExtension) {
        String uniqueFilename;
        File file;
        do {
            uniqueFilename = UUID.randomUUID().toString() + fileExtension;
            file = new File(UPLOAD_DIR + uniqueFilename);
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
