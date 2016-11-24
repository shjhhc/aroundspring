package shjh.system.web.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.WebRequest;
import shjh.module.account.bean.domain.Stu;
import shjh.system.web.common.bean.BaseResult;

/**
 * Created by shjh on 2016/11/24.
 */
@ControllerAdvice
public class SysExceptionAdvice {
//    @InitBinder
//    public void initBinder(WebDataBinder binder, WebRequest request){
//        System.out.println("initBinder");
//        System.out.println("============应用到所有@RequestMapping注解方法，在其执行之前初始化数据绑定器");
//    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ShjhException.class)
    @ResponseBody
    public BaseResult exceptionDeal(ShjhException exception, NativeWebRequest request){
        System.out.println("exception");
        BaseResult result = new BaseResult(0);
        result.setMsg(exception.getMessage());
        return result;
    }

    @ModelAttribute
    public Stu modelInit(){
        System.out.println("============应用到所有@RequestMapping注解方法，在其执行之前把返回值放入Model");
        return new Stu().setName("shjh").setAge(17).setOccupation("modelInit");
    }
}
