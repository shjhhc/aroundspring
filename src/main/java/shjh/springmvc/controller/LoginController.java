package shjh.springmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shjh.springmvc.service.LoginService;

@RestController
public class LoginController {
	@Autowired
	private LoginService loginService;
	
	/**
     * 跳转到用户登录页面
     * @return
     * @see [类、类#方法、类#成员]
     */
    @RequestMapping(value = "/login")
    public String login()
    {
        return "login";
    }
    
    /**
     * 用户登录验证处理
     * @return
     * @see [类、类#方法、类#成员]
     */
    @RequestMapping(value = "/logon")
    public void logon(){
    	loginService.logon();
    }
}
