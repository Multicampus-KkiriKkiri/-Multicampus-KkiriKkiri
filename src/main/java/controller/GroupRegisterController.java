package controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import dto.DistrictDTO;
import dto.GroupDTO;
import dto.RegionDTO;
import service.GroupService;
import net.coobird.thumbnailator.Thumbnails;

@Controller
@RequestMapping("/groupregister")
public class GroupRegisterController {

    @Autowired
    private GroupService groupService;
    
    private static final String UPLOAD_DIR = "/path/to/upload/directory/";

    @GetMapping("/register")
    public ModelAndView showGroupRegisterPage() {
        ModelAndView mav = new ModelAndView("groupregister/groupregister");
        return mav;
    }

    @PostMapping("/register")
    public ModelAndView registerGroup(@ModelAttribute GroupDTO groupDTO, @RequestParam("groupImage") MultipartFile groupImageFile) {
        ModelAndView mav = new ModelAndView();

        if (!groupImageFile.isEmpty()) {
            try {
                // 원본 이미지 저장
                String originalFilename = groupImageFile.getOriginalFilename();
                File originalFile = new File(UPLOAD_DIR + originalFilename);
                groupImageFile.transferTo(originalFile);
                groupDTO.setGroupImage(originalFile.getAbsolutePath()); // 원본 이미지 경로를 설정
                
                // 리사이즈된 이미지 저장
                InputStream inputStream = groupImageFile.getInputStream();
                BufferedImage resizedImage = Thumbnails.of(inputStream)
                        .size(300, 300)
                        .asBufferedImage();
                File resizedFile = new File(UPLOAD_DIR + "resized_" + originalFilename);
                ImageIO.write(resizedImage, "jpg", resizedFile);
                groupDTO.setGroupImage(resizedFile.getAbsolutePath()); // 리사이즈된 이미지 경로를 설정
                
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // 그룹 등록 로직 및 등록된 그룹 ID 반환
        int groupId = groupService.registerGroup(groupDTO);
        
        // 등록된 그룹의 상세 페이지로 리디렉션
        mav.setViewName("redirect:/group/detail/" + groupId);
        return mav;
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
}
