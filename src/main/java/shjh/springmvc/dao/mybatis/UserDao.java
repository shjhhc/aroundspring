package shjh.springmvc.dao.mybatis;

import java.util.Hashtable;

import org.springframework.stereotype.Repository;

import shjh.springmvc.domain.User;
import shjh.springmvc.mapper.Mapper;

@Repository
public interface UserDao extends Mapper {
	public void saveUser(User user);
	
	public User queryUserById(Integer userId);
	
	public User queryUserByName(String userName);
	
	public User queryUser(Hashtable<String, Object> hpFiter);
}
