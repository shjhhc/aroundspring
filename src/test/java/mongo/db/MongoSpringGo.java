package mongo.db;

import java.util.Date;

import mybatis.cache.BaseJunitTest;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.mongodb.WriteResult;

import shjh.springmvc.domain.User;
import shjh.springmvc.mongo.dao.UserRepository;

public class MongoSpringGo extends BaseJunitTest {
	@Autowired
	private UserRepository userRepository;

	@Test
	public void insert() {
		User user = new User();
		user.setUserId(10);
		user.setUserName("mongo");
		user.setAge(23);
		user.setPassword("537298");
		user.setCreateTime(new Date());
		user.setStatus(1);
		userRepository.insert(user);
	}

	@Test
	public void findOne() {
		String username = "mongo";
		User user = userRepository.findOne(username);
		System.out.println(user);
	}
	
	@Test
	public void removeOne(){
		WriteResult result = userRepository.removeOne(1);
		System.out.println(result);
	}

}
