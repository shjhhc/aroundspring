package shjh.module.account.service.impl;

import org.springframework.stereotype.Service;
import shjh.module.account.bean.domain.Stu;
import shjh.module.account.service.StuService;

/**
 * Created by m on 2016/11/1.
 */
@Service
public class StuServiceImpl implements StuService {
    public Stu queryStuByName(String name){
        Stu stu = new Stu();
        stu.setAge(23);
        stu.setId(11);
        stu.setName(name);
        stu.setOccupation("sjsjsi");
        return stu;
    }

    public static void main(String[] args) {

    }
}
