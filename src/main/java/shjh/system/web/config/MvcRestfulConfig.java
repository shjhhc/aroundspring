package shjh.system.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import shjh.system.web.spring.RestfulRequestMappingHandlerMapping;

/**
* Created by shjh on 2016/11/19.
*/
@Configuration
public class MvcRestfulConfig extends WebMvcConfigurationSupport {

    @Override
    protected RequestMappingHandlerMapping createRequestMappingHandlerMapping() {
        RestfulRequestMappingHandlerMapping restfulRequestMappingHandlerMapping = new RestfulRequestMappingHandlerMapping();
        return restfulRequestMappingHandlerMapping;
    }
}
