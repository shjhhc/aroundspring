package shjh.springmvc.mapper;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import shjh.springmvc.mapper.DataSourceSqlSessionFactory.DataSourceEnvironment;

public final class MapperFactory {
	private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(MapperFactory.class);
	
	/** 
	 * 根据指定的DataSourceEnvironment获取对应的SqlSessionFactory 
	 * @param environment 数据源environment 
     * @return SqlSessionFactory 
     */  
    @SuppressWarnings("unchecked")
	public static <T> T createMapper(Class<? extends Mapper>clazz, DataSourceEnvironment environment) { 
    	SqlSessionFactory sqlSessionFactory = getSqlSessionFactory(environment);
    	SqlSession sqlSession = sqlSessionFactory.openSession();
    	Mapper mapper = sqlSession.getMapper(clazz);
    	return (T)MapperProxy.bind(mapper, sqlSession);
    }
    
    /** 
         * Mapper Proxy  
        * executing mapper method and close sqlsession 
        * @author shjh 
        * @version  
        */ 
    private static class MapperProxy implements InvocationHandler{
    	private Mapper mapper;
    	private SqlSession sqlSession;
    	
    	public MapperProxy(Mapper mapper, SqlSession sqlSession){
    		this.mapper = mapper;
    		this.sqlSession = sqlSession;
    	}
    	
		private static Mapper bind(Mapper mapper, SqlSession sqlSession) {
			return (Mapper) java.lang.reflect.Proxy.newProxyInstance(mapper
					.getClass().getClassLoader(), mapper.getClass()
					.getInterfaces(), new MapperProxy(mapper, sqlSession));
		}
    	
		@Override
		public Object invoke(Object proxy, Method method, Object[] args)
				throws Throwable {
			Object obj = null;
			try {
				obj = method.invoke(mapper, args);
			} catch (Exception e) {
				e.printStackTrace();
				logger.error(e.getMessage(), e);
			}finally{
				sqlSession.close();
			}
			
			return obj;
		}
    	
    }


    private static SqlSessionFactory getSqlSessionFactory(DataSourceEnvironment environment) {
		return DataSourceSqlSessionFactory.getSqlSessionFactory(environment);
	}

}
