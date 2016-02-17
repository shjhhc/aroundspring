package shjh.springmvc.service;

import javax.servlet.http.HttpSession;

import shjh.springmvc.framework.core.DataResult;

public interface LoginService {
	public DataResult logon(String userName, String password);
	
	/**
     * 退出登录
     * @see [类、类#方法、类#成员]
     */
    public void logoff(String userName);
}
