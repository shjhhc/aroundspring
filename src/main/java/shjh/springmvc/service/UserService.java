package shjh.springmvc.service;

import shjh.springmvc.domain.User;

public interface UserService {
	public User findUserByName(String userName);
	
	public void insert(User user);
	
	public void removeById(int id);
}
