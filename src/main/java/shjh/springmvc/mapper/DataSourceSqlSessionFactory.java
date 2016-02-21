package shjh.springmvc.mapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class DataSourceSqlSessionFactory {
	private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory
			.getLogger(DataSourceSqlSessionFactory.class);

	private static final String CONFIGURATION_PATH = "META-INF/mybatis/mybatis-config.xml";
	private static final Map<DataSourceEnvironment, SqlSessionFactory> SQLSESSION_FACTORYS = new HashMap<DataSourceEnvironment, SqlSessionFactory>();

	public static SqlSessionFactory getSqlSessionFactory(
			DataSourceEnvironment environment) {
		SqlSessionFactory sqlSessionFactory = SQLSESSION_FACTORYS.get(environment);
		if (sqlSessionFactory == null) {
			InputStream is = null;
			try {
				is = Resources.getResourceAsStream(CONFIGURATION_PATH);
				sqlSessionFactory = new SqlSessionFactoryBuilder().build(is, environment.name());
				logger.info("Get {} SqlSessionFactory successfully.",environment.name());
			} catch (IOException e) {
				logger.warn("Get {} SqlSessionFactory error.", environment.name());  
	            logger.error(e.getMessage(), e);  
			}finally{
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		SQLSESSION_FACTORYS.put(environment, sqlSessionFactory);
		return sqlSessionFactory;
	}

	/**
	 * 配置到Configuration.xml文件中的数据源的environment的枚举描述
	 * 
	 * @author shjh
	 * @version
	 */
	public static enum DataSourceEnvironment {
		home, company;
	}
}
