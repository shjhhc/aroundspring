package shjh.module.account.service.impl;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import shjh.module.account.bean.domain.Stu;
import shjh.module.account.service.StuService;

/**
 * Created by m on 2016/11/1.
 */
@Service
public class StuServiceImpl implements StuService {
    @Cacheable(value = "StuServiceImpl.queryStuByName", key = "#p0")
    public Stu queryStuByName(String name){
        Stu stu = new Stu();
        stu.setAge(23);
        stu.setId(11);
        stu.setName(name);
        stu.setOccupation("queryStuByName");
        return stu;
    }

    @Cacheable(value = "queryByName", key = "#p0")
    public Stu queryByName(@RequestBody String name){
        Stu stu = new Stu();
        stu.setAge(23);
        stu.setId(11);
        stu.setName(name);
        stu.setOccupation("queryByName");
        return stu;
    }

    public static void main(String[] args) {

    }
}
