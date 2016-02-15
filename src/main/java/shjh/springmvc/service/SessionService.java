package shjh.springmvc.service;

import javax.servlet.http.HttpSession;

public interface SessionService {
	public void saveSessionRedis(final HttpSession session);

	public HttpSession getSessionRedis(final int id);
}
