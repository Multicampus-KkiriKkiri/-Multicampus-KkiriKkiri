package controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
        ModelAndView mav = new ModelAndView("groupregister/groupregister");
        return mav;
    }

    @PostMapping("/register")
    public ModelAndView registerGroup(HttpSession session, @RequestParam("groupType1") String groupType, @ModelAttribute GroupDTO groupDTO, @RequestParam("groupRegisterImage") MultipartFile groupImageFile) {
    	//session.setAttribute("sessionUserId",1);//로그인 구현된것에 따라 바꿔야함. 현재user id 1로고정.  . sessionUserId
    	Integer sessionUserId = (Integer) session.getAttribute("sessionUserId");
        if (sessionUserId == null) {
            // 사용자가 로그인하지 않은 경우 로그인 페이지로 리디렉션
            return new ModelAndView("redirect:/login");
        }
    	groupDTO.setGroupType(groupType);
    	groupDTO.setGroupLeaderId(sessionUserId);
    	
    	 ModelAndView mav = new ModelAndView();
    	 
    	// 이미지 파일이 비어 있지 않은 경우
        if (!groupImageFile.isEmpty()) {
            try {
            	 // 원본 파일 이름과 확장자 분리
                String originalFilename = groupImageFile.getOriginalFilename();
                String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String uniqueFilename = generateUniqueFilename(fileExtension);

                File originalFile = new File(UPLOAD_DIR + uniqueFilename);
                groupImageFile.transferTo(originalFile);

                // 이미지 리사이즈 및 저장
                BufferedImage originalImage = ImageIO.read(originalFile);
                BufferedImage resizedImage = Thumbnails.of(originalImage)
                                                       .size(300, 300)
                                                       .asBufferedImage();
                File resizedFile = new File(UPLOAD_DIR + "resized_" + uniqueFilename);
                ImageIO.write(resizedImage, "jpg", resizedFile);

                // GroupDTO에 이미지 경로 설정
                groupDTO.setGroupImage(resizedFile.getAbsolutePath());
                System.out.println(groupDTO.getGroupImage());
                
            } catch (IOException e) {
                e.printStackTrace();
                mav.addObject("message", "이미지 업로드 중 오류가 발생했습니다.");
                mav.setViewName("groupregister/groupregister");
                return mav;
            }
        }

        // 그룹 등록 로직 및 등록된 그룹 ID 반환
        int groupId = groupService.registerGroup(groupDTO);
        
      
        // 등록한 그룹의 상세 페이지로 리디렉션.
        //mav.setViewName("redirect:/groupdetail/info?groupId=10");// + groupId);
        mav.setViewName("redirect:/groupdetail/info?groupId="+groupId);
        return mav;
    }
    //파일이름생성메서드
    private String generateUniqueFilename(String fileExtension) {
        String uniqueFilename;
        File file;
        do {
            uniqueFilename = UUID.randomUUID().toString() + fileExtension;
            file = new File(UPLOAD_DIR + uniqueFilename);
        } while (file.exists());

        // 파일이 존재할 경우 날짜를 추가하여 다시 생성
        if (file.exists()) {
            String currentDate = new SimpleDateFormat("yyyyMMdd").format(new Date());
            uniqueFilename = UUID.randomUUID().toString() + "_" + currentDate + fileExtension;
        }
        return uniqueFilename;
    }
    
    //지역 정보
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
