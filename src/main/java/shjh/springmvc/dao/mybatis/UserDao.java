package shjh.springmvc.dao.mybatis;

import java.util.Hashtable;

import org.springframework.stereotype.Repository;

import shjh.springmvc.domain.User;

@Repository
public interface UserDao {
	public void saveUser(User user);
	
	public User queryUserById(int userId);
	
	public User queryUserByName(String userName);
	
	public User queryUser(Hashtable<String, Object> hpFiter);
}
