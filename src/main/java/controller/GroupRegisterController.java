package controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
/*
 * 모임 등록 컨트롤러
 */
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


// groupregister/register
@Controller
@RequestMapping("/groupregister")
public class GroupRegisterController {

	

    // GroupService 빈을 자동으로 주입
    @Autowired
    private GroupService groupService;
    
    
    
    private static final String UPLOAD_DIR = "/path/to/upload/directory/";
    
    
    // GET 요청을 처리하여 그룹 등록 페이지를 반환
    @GetMapping("/register")
    public String showGroupRegisterPage() {
        return "groupregister/groupregister"; // 등록 페이지의 뷰 이름 반환
    }

    // POST 요청을 처리하여 그룹 등록을 처리
	
	@PostMapping("/register")
	public String registerGroup(@ModelAttribute GroupDTO groupDTO, @RequestParam("groupImage") MultipartFile groupImageFile) {
	    if (!groupImageFile.isEmpty()) {
	        try {
	            // 원본 이미지 파일을 읽어들임
	            InputStream inputStream = groupImageFile.getInputStream();
	            // 리사이즈된 이미지 파일 생성
	            BufferedImage resizedImage = Thumbnails.of(inputStream)
	                    .size(300, 300)
	                    .asBufferedImage();
	            // 저장 경로 설정 (업로드할경로)
	            String uploadDir = "/path/to/upload/directory/";
	            File outputfile = new File(uploadDir + "resized_" + groupImageFile.getOriginalFilename());
	            // 디렉토리가 존재하지 않으면 생성
	            outputfile.getParentFile().mkdirs();
	            ImageIO.write(resizedImage, "jpg", outputfile);
	            // 경로를 DB에 저장
	            groupDTO.setGroupImage(outputfile.getAbsolutePath());
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	    // 그룹 등록 로직
	    groupService.registerGroup(groupDTO);
	    return "redirect:/group/list";
	}
    // 특정 지역의 구/군 정보를 JSON 형태로 반환
    @GetMapping("/regions/{regionId}")
    @ResponseBody
    public List<DistrictDTO> getDistrictsByRegionId(@PathVariable int regionId) {
        return groupService.getDistrictsByRegionId(regionId); // 서비스에서 특정 지역의 구/군 정보를 가져옴
    }
   

    // 모든 지역 정보를 JSON 형태로 반환
    @GetMapping("/regions")
    @ResponseBody
    public List<RegionDTO> getAllRegions() {
        return groupService.getAllRegions(); // 서비스에서 모든 지역 정보를 가져옴
    }
	/*
    @GetMapping
    public ModelAndView helloboot() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("model", "스프링부트를 시작합니다.");
        mv.setViewName("groupregister/groupregister");
        return mv;
    }
    */
}
