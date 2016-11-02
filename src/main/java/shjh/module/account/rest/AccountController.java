package shjh.module.account.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shjh.module.account.bean.Stu;
import shjh.module.account.dao.StuDao;

/**
 * Created by m on 2016/10/31.
 */
@RestController
public class AccountController {
    @Autowired
    private StuDao stuDao;

    @RequestMapping("/")
    public Stu queryStuByName(String name){
        return stuDao.queryByName(name);
    }
}
