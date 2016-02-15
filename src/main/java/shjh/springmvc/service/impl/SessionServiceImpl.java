package shjh.springmvc.service.impl;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shjh.springmvc.dao.StudentDao;
import shjh.springmvc.service.SessionService;

@Service
public class SessionServiceImpl implements SessionService {
	@Autowired
	private StudentDao studentDao;

	@Override
	public void saveSessionRedis(HttpSession session) {
		studentDao.saveStuRedis(session);
	}

	@Override
	public HttpSession getSessionRedis(int id) {
		return (HttpSession) studentDao.getStuRedis(id);
	}

}
