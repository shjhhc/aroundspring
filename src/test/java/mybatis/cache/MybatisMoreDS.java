package mybatis.cache;

import shjh.springmvc.dao.mybatis.UserDao;
import shjh.springmvc.domain.User;
import shjh.springmvc.mapper.MapperFactory;
import shjh.springmvc.mapper.DataSourceSqlSessionFactory.DataSourceEnvironment;

public class MybatisMoreDS {
	public static void main(String[] args) {
		UserDao userMapper = MapperFactory.createMapper(UserDao.class, DataSourceEnvironment.home);
		User user = userMapper.queryUserById(0002);
		System.out.println(user.toString());
		User userByName = userMapper.queryUserByName("shjh");
		System.out.println(userByName);
	}
}
