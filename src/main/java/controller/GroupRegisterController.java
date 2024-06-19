package controller;

/*
 * 모임 등록 컨트롤러
 */
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/groupregister")
public class GroupRegisterController {

    @GetMapping
    public ModelAndView helloboot() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("model", "스프링부트를 시작합니다.");
        mv.setViewName("groupregister/groupregister");
        return mv;
    }
}
