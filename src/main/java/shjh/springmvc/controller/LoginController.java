package shjh.springmvc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import shjh.springmvc.domain.User;
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
    @RequestMapping(value = "/logon", method={RequestMethod.POST, RequestMethod.GET})
    public void logon(HttpServletRequest request){
    	int userId = (int) request.getAttribute("userId");
    	String userName = (String) request.getAttribute("userName");
    	String password = (String) request.getAttribute("password");
    	HttpSession session = request.getSession();
    	loginService.logon(userName, password);
    }
    
    /**
     * 用户登出
     */
    @RequestMapping(value="/logoff", method={RequestMethod.POST, RequestMethod.GET})
    public void logoff(HttpServletRequest request){
    	HttpSession session = request.getSession();
    	User loginUser = (User) session.getAttribute("user");
    	String userName = null;
    	if(loginUser != null){
    		userName = loginUser.getUserName();
    	}
    	loginService.logoff(userName);
    }
}
