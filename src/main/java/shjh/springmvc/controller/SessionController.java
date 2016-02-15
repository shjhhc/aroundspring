package shjh.springmvc.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import shjh.springmvc.service.SessionService;

@RestController
@RequestMapping(value="/session")
public class SessionController {
	@Autowired
	private SessionService sessionService;
	
	@RequestMapping(value="/save", method={RequestMethod.POST, RequestMethod.GET})
	public void saveSessionRedis(HttpSession session){
		sessionService.saveSessionRedis(session);
		System.out.println(session.getId());
	}
	
	@RequestMapping(value="/get/{id}", method={RequestMethod.POST, RequestMethod.GET})
	public HttpSession getSessionRedis(int id){
		HttpSession session = sessionService.getSessionRedis(id);
		System.out.println(session.getId());
		return session;
	}
}
