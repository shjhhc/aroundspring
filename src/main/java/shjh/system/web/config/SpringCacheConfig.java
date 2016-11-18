package shjh.system.web.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import redis.clients.jedis.JedisPoolConfig;

import java.lang.reflect.Method;

/**
 * Created by shjh on 2016/11/17.
 */
@Configuration
@EnableCaching(proxyTargetClass = true)
public class SpringCacheConfig extends CachingConfigurerSupport {
    @Value("${poolConfig.maxIdle}")
    private Integer maxIdle;
    @Value("${poolConfig.maxWaitMillis}")
    private Integer maxWaitMillis;
    @Value("${factory.hostName}")
    private String hostName;
    @Value("${factory.port}")
    private Integer port;
    @Value("${expireTime}")
    private Integer expireTime;

    @Bean
    public CacheManager cacheManager(RedisTemplate redisTemplate) {
        RedisCacheManager manager = new RedisCacheManager(redisTemplate);
        manager.setDefaultExpiration(expireTime);
        return manager;
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(factory);
        return redisTemplate;
    }

    @Bean
    public JedisConnectionFactory redisConnectionFactory() {
        JedisConnectionFactory factory = new JedisConnectionFactory();
        factory.setHostName(hostName);
        factory.setPort(port);
        factory.setPoolConfig(jedisPoolConfig());
        return factory;
    }

    @Bean
    public JedisPoolConfig jedisPoolConfig() {
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxIdle(maxIdle);
        poolConfig.setMaxWaitMillis(maxWaitMillis);
        poolConfig.setTestOnBorrow(true);
        return poolConfig;
    }

    /**
     * @return 自定义策略生成的key
     * @description 自定义的缓存key的生成策略</br>
     * 若想使用这个key</br>
     * 只需要讲注解上keyGenerator的值设置为customKeyGenerator即可</br>
     */
    @Bean(name = "myKeyGenerator")
    public KeyGenerator customKeyGenerator() {
        return new KeyGenerator() {
            @Override
            public Object generate(Object o, Method method, Object... objects) {
                StringBuilder sb = new StringBuilder();
                sb.append(o.getClass().getName());
                sb.append(".");
                sb.append(method.getName());
                sb.append("(");
                for (Object obj : objects) {
                    sb.append(obj.toString());
                    sb.append(",");
                }
                sb.append(")");
                System.out.println("keyGenerator=" + sb.toString());
                return sb.toString();
            }
        };
    }

}
