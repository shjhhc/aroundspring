package shjh.system.web.spring;

import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import shjh.module.account.bean.domain.Stu;
import shjh.system.web.common.bean.BaseReq;

import java.io.IOException;
import java.lang.reflect.Type;

/**
 * Created by shjh on 2016/11/8.
 */
public class ShjhHttpMessageConverter extends FastJsonHttpMessageConverter {
//    @Override
//    protected Object readInternal(Class<? extends Object> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
//        Object internal = super.readInternal(clazz, inputMessage);
//        if (internal instanceof BaseReq){
//            ((BaseReq) internal).setId(14);
//        }
//        return internal;
//    }

    @Override
    protected void writeInternal(Object obj, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        if (obj instanceof Stu){
            Stu stu = (Stu)obj;
            stu.setOccupation("updated");
            obj = stu;
        }
        super.writeInternal(obj, outputMessage);
    }

    @Override
    public Object read(Type type, Class<?> contextClass, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        Object read = super.read(type, contextClass, inputMessage);
        if (read instanceof BaseReq){
            ((BaseReq) read).setId(14);
        }
        return read;
    }
}
