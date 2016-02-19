package shjh.springmvc.service.impl;

import java.util.Hashtable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shjh.springmvc.dao.mybatis.UserDao;
import shjh.springmvc.domain.User;
import shjh.springmvc.framework.core.DataResult;
import shjh.springmvc.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {
	@Autowired
	private UserDao userDao;

	@Override
	public DataResult logon(String userName, String password) {
		DataResult result = new DataResult();
		Hashtable<String, Object> hpFilter = new Hashtable<String, Object>();
		hpFilter.put("userName", userName);
		hpFilter.put("password", password);
		User user = userDao.queryUser(hpFilter);
		if(user == null){
			String message = "user is null!";
			result.setMessage(message);
			result.setSucceed(false);
			return result;
		}
		result.setSucceed(true);
		return result;
	}

	@Override
	public void logoff(String userName) {
		
	}

}
