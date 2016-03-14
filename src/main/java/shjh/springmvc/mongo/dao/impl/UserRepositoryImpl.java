package shjh.springmvc.mongo.dao.impl;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import shjh.springmvc.domain.User;
import shjh.springmvc.mongo.dao.UserRepository;

import com.mongodb.WriteResult;

@Repository
public class UserRepositoryImpl implements UserRepository {
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public void insert(User user) {
		mongoTemplate.insert(user);
	}

	@Override
	public User findOne(String id) {
		return mongoTemplate.findOne(new Query(Criteria.where("userName").is(id)), User.class);
	}

	@Override
	public List<User> findAll() {
		return mongoTemplate.findAll(User.class);
	}

	@Override
	public List<User> findByRegex(String regex) {
		Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
		Criteria criteria = new Criteria("name").regex(pattern.toString());
		return mongoTemplate.find(new Query(criteria), User.class);
	}

	@Override
	public WriteResult removeOne(int id) {
		return mongoTemplate.remove(new Query(Criteria.where("userId").is(id)), User.class);
	}

	@Override
	public void removeAll() {
		List<User> list = this.findAll();
		for(User user : list){
			mongoTemplate.remove(user);
		}
	}

	@Override
	public void findAndModify(String id) {
		mongoTemplate.updateFirst(new Query(Criteria.where("id").is(id)), new Update().inc("age", 30), User.class);
	}

}
