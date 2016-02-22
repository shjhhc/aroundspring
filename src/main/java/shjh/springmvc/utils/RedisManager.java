package shjh.springmvc.utils;

import java.io.Serializable;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.SerializationUtils;

@Component
public class RedisManager {
	@Autowired
	private RedisTemplate<Serializable, Serializable> redisTemplate;
	
	/**
     * 根据key，查询db索引区的数据
     * @param key 数据key
     * @return 字节数据，需要反序列化后使用
     * @throws Exception
     */
	public byte[] getValueByKey(byte[] key){
		return (byte[]) getValueByKey(key);
	}
	
	public Object getValueByKey(Object key){
		return redisTemplate.opsForValue().get(key);
	}
	
	/**
     * 根据key，删除db索引区的数据
     * @param key
     * @throws Exception
     */
	public void deleteByKey(byte[] key){
		deleteByKety(key);
	}
	
	public void deleteByKety(Serializable key){
		redisTemplate.opsForValue().getOperations().delete(key);
	}
	
	/**
     * 根据key，存储db索引区的数据
     * @param key
     * @param value
     * @param expireTime 过期时间
     * @throws Exception
     */
	public void saveValueByKey(byte[] key, byte[] value, int expireTime){
		saveValueByKey(key, value, expireTime);
	}
	
	public void saveValueByKey(Serializable key, Serializable value, int expireTime){
		if(expireTime>0){
			redisTemplate.opsForValue().set(key, value, expireTime, TimeUnit.SECONDS);
		}else{
			redisTemplate.opsForValue().set(key, value);
		}
	}
	
	/**
     *永久有效
     * @param key
     * @param value
     * @throws Exception
     */
	public void saveValueByKey(byte[] key, byte[] value){
		saveValueByKey(key, value);
	}
	
	public void saveValueByKey(Serializable key, Serializable value){
		saveValueByKey(key, value, -1);
	}
	
	/**
     * 获取数据记录数

     * @return
     */
	public Long dbSize(){
		return redisTemplate.getConnectionFactory().getConnection().dbSize();
	}
	
	/**
     * 根据【字符串】pattern，获取 db dbIndex 区域的所有key
     * @param pattern 注意此处是正则字符串
     * @return
     */
	public Set<byte[]> keys(String pattern){
		return redisTemplate.getConnectionFactory().getConnection().keys(pattern.getBytes());
	}
	
	/**
     * 获取Hash列表
     * @param id
     * @param key
     * @return
     */
	public Object getValueByHash(final Object id, final Object key){
		return redisTemplate.execute(new RedisCallback<Object>() {

			@Override
			public Object doInRedis(RedisConnection connection) throws DataAccessException {
				return SerializationUtils.deserialize(connection.hGet(rawKey(id), rawKey(key)));
			}
		});
	}
	
	/**
     *同时将多个 field-value (域-值)对设置到哈希表 key 中。
     * @param id
     * @param key
     * @param value
	 * @return 
     */
	public void saveValueByHash(final Object id, final Object key,
			final Object Value) {
		redisTemplate.execute(new RedisCallback<Object>() {

			@Override
			public Object doInRedis(RedisConnection connection)
					throws DataAccessException {
				return connection.hSet(rawKey(id), rawKey(key), rawKey(Value));
			}
		});
	}
	
	/**
     *Hash表删除
     * @param id
     * @param key
     */
	public Object removeValueByHash(final Object id, final Object key){
		return redisTemplate.execute(new RedisCallback<Object>() {

			@Override
			public Object doInRedis(RedisConnection connection) throws DataAccessException {
				return connection.hDel(rawKey(id), rawKey(key));
			}
		});
	}
	
	/**
     * 存储在键的散列的所有字段和值
     * @param id
     * @return
     */
	public int getSizeByHash(final Object id){
		return 0;
	}
	
	private byte[] rawKey(Object key) {
		Assert.notNull(key, "non null key required");
		if(key instanceof byte[]){
			return (byte[])key;
		}
		return org.springframework.util.SerializationUtils.serialize(key);
	}
}
