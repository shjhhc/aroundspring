package shjh.springmvc.dao;

import java.util.Hashtable;

import shjh.springmvc.domain.User;

public interface UserDao {
	public void saveUser(User user);
	
	public User queryUserById(int userId);
	
	public User queryUserByName(String userName);
	
	public User queryUser(Hashtable<String, Object> hpFiter);
}
