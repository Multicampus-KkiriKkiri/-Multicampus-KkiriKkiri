package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import dto.UserDTO;
import service.UserService;

@Controller
public class UserController {
	
	@Autowired
	private UserService userService;	

    // 로그인 처리
	@ResponseBody
    @PostMapping("/main")
    public String login(@ModelAttribute("user") UserDTO user, Model model) {
    	//System.out.println(user.getUserEmail() + user.getUserPw());
        UserDTO loginUser = userService.logInUser(user.getUserEmail(), user.getUserPw());
        
        if (loginUser != null) {
            model.addAttribute("loginUser", loginUser);
            return "success"; 
        } else {
            model.addAttribute("error", "아이디 혹은 비밀번호가 다릅니다.");
            return "fail"; 
        }
    }
	
	//로그인 완료된 화면
	@GetMapping("/mainLogin")
    public String loginForm(Model model) {
        model.addAttribute("user", new UserDTO()); 
        return "/mainpage/mainLogin"; 
    }
	
	//회원가입
	@GetMapping("/signup")
    public String signupForm() {
        return "/mainpage/main";
    }

	@ResponseBody
    @PostMapping("/")
    public String signup(@RequestParam String userEmail, @RequestParam String userPw, Model model) {
        UserDTO user = new UserDTO();
        user.setUserEmail(userEmail);
        user.setUserPw(userPw);
        
        if (userService.signUp(user)) {
        	model.addAttribute("userEmail", userEmail);
        	model.addAttribute("userPw", userPw);
            return "success"; 
        } else {
            return "fail";  
        }
    }
	
	
	
	
	
	
	
	
	
	
}

