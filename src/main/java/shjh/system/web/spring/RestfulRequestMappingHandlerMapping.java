package shjh.system.web.spring;

import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by shjh on 2016/11/20.
 */
public class RestfulRequestMappingHandlerMapping extends RequestMappingHandlerMapping {
    private final Map<HandlerMethod, RequestMappingInfo> mappingLookup = new LinkedHashMap<HandlerMethod, RequestMappingInfo>();

    @Override
    protected void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping) {
        HandlerMethod handlerMethod = createHandlerMethod(handler, method);
        mappingLookup.put(handlerMethod, mapping);
        super.registerHandlerMethod(handler, method, mapping);
    }

    @Override
    protected HandlerMethod lookupHandlerMethod(String lookupPath, HttpServletRequest request) throws Exception {
        HandlerMethod handlerMethod = lookupHandlerMethodHere(lookupPath, request);
        if (handlerMethod == null)
            handlerMethod = super.lookupHandlerMethod(lookupPath, request);
        return handlerMethod;
    }

    private HandlerMethod lookupHandlerMethodHere(String lookupPath, HttpServletRequest request) {
        String servicename = request.getHeader("servicename");
        if (!StringUtils.isEmpty(servicename)) {
            List<HandlerMethod> methodList = this.getHandlerMethodsForMappingName(servicename);
            if (methodList.size() > 0){
                HandlerMethod handlerMethod = methodList.get(0);
                RequestMappingInfo requestMappingInfo = mappingLookup.get(handlerMethod);
                handleMatch(requestMappingInfo, lookupPath, request);
                return handlerMethod;
            }
        }
        return null;
    }
}
