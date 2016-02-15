package shjh.springmvc.utils;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.SerializationUtils;
import org.springframework.stereotype.Component;

@Component
public class RedisManager {
	@Autowired
	private RedisTemplate<Serializable, Serializable> redisTemplate;
	
	public void saveRedis(Object obj){
//		SerializationUtils.
		redisTemplate.opsForList();
	}
}
