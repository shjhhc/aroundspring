package shjh.springmvc.dao;

import shjh.springmvc.domain.User;

public interface UserDao {
	public void saveUser(User user);
	
	public User queryUserById(int userId);
	
	public User queryUserByName(String userName);
}
