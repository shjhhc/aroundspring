package shjh.springmvc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shjh.springmvc.domain.User;
import shjh.springmvc.mongo.dao.UserRepository;
import shjh.springmvc.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public User findUserByName(String userName) {
		return userRepository.findOne(userName);
	}

	@Override
	public void insert(User user) {
		userRepository.insert(user);
	}

	@Override
	public void removeById(int id) {
		userRepository.removeOne(id);
	}
	
}
