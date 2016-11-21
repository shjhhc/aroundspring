package shjh.module.account.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by shjh on 2016/11/21.
 */
@Controller
public class JspController {
    @RequestMapping("/hello")
    public String hello(){
        System.out.println("hello");
        return "/index";
    }
}
