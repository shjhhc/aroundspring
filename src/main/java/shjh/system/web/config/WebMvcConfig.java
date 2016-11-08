package shjh.system.web.config;

import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import shjh.system.web.spring.ShjhHttpMessageConverter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shjh on 2016/10/30.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "shjh.module", useDefaultFilters = false,
        includeFilters = @ComponentScan.Filter(value = RestController.class))
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    @Bean
    public InternalResourceViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/jsp/");
        viewResolver.setSuffix(".jsp");
        viewResolver.setExposeContextBeansAsAttributes(true);
        return viewResolver;
    }

//    @Override
//    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
//        configurer.defaultContentType(MediaType.APPLICATION_JSON);
//    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        ShjhHttpMessageConverter messageConverter = new ShjhHttpMessageConverter();
        List<MediaType> mediaTypes = new ArrayList<>();
        mediaTypes.add(MediaType.APPLICATION_JSON);
        mediaTypes.add(MediaType.TEXT_HTML);
        messageConverter.setSupportedMediaTypes(mediaTypes);
        converters.add(messageConverter);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        super.addInterceptors(registry);
    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.viewResolver(internalResourceViewResolver());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    /**
     *  �������ֽ�����
     * @return
     */
//    @Bean(name="multipartResolver")
//    public CommonsMultipartResolver commonsMultipartResolver(){
//        CommonsMultipartResolver common = new CommonsMultipartResolver();
//        common.setMaxUploadSize(10 * 1024 * 1024);//10M
//        return common;
//    }
}
