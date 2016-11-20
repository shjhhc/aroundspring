package shjh.system.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shjh on 2016/10/30.
 */
@Configuration
@ComponentScan(basePackages = {"shjh.module", "shjh.system"},
        excludeFilters = {@ComponentScan.Filter(value = RestController.class)})
//@Import({
//        DataSourceConfig.class,
//        SpringCacheConfig.class
//})
public class ApplicationConfig {

    /**
     * �������static
     * ����@PropertySource
     */
    @Bean
    public PropertySourcesPlaceholderConfigurer loadProperties() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
