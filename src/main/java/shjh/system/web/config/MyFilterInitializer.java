package shjh.system.web.config;

import org.springframework.web.WebApplicationInitializer;
import shjh.system.web.filter.SessionFilter;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

/**
 * Created by m on 2016/11/7.
 */
public class MyFilterInitializer implements WebApplicationInitializer {
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        FilterRegistration.Dynamic sessionFilter = servletContext.addFilter("sessionFilter", SessionFilter.class);
        sessionFilter.addMappingForUrlPatterns(null, false, "/");
    }
}
