package mybatis.cache;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MybatisCache {
	public static void main(String[] args) throws IOException {
		String config = "META-INF/mybatis/mybatis-config.xml";
		InputStream is = Resources.getResourceAsStream(config);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		System.out.println(sqlSession.selectOne("queryUserById", 0001));
		// 同一个session的相同sql查询,将会使用一级缓存 
		System.out.println(sqlSession.selectOne("queryUserById", 0001));
		// 参数改变,需要重新查询
		System.out.println(sqlSession.selectOne("queryUserById", 0002));
		// 清空缓存后需要重新查询
		sqlSession.clearCache();
		System.out.println(sqlSession.selectOne("queryUserById", 0001));
		// session close以后,仍然使用同一个db connection
		sqlSession.close();
		sqlSession = sqlSessionFactory.openSession();
		System.out.println(sqlSession.selectOne("queryUserById", 0001));
	}
}
