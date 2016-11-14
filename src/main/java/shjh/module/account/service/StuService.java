package shjh.module.account.service;

import shjh.module.account.bean.domain.Stu;

/**
 * Created by m on 2016/11/1.
 */
public interface StuService {
    Stu queryStuByName(String name);
}
