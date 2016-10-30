package shjh.system.web.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;

/**
 * Created by shjh on 2016/10/30.
 */
@Configuration
@PropertySource("classpath:/META-INF/config.properties")
public class DataSourceConfig {
    @Value("${jdbc.driverClassName}")
    private String driverClassName;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Bean(destroyMethod = "close")
    public DataSource dataSource(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    /**
     * 必须加上static
     * 或者@PropertySource
     */
    /*public static PropertyPlaceholderConfigurer loadProperties(){
        PropertyPlaceholderConfigurer configurer = new PropertyPlaceholderConfigurer();
        ClassPathResource resource = new ClassPathResource("config.properties");
        configurer.setLocations(resource);
        return configurer;
    }*/
}
