package shjh.module.account.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shjh.module.account.bean.Stu;
import shjh.module.account.dao.StuDao;

/**
 * Created by m on 2016/10/31.
 */
@RestController
public class AccountController {
//    @Autowired
    private StuDao stuDao;

    @RequestMapping("/")
    public void queryStuByName(String name){
        System.out.println("succeed");

//        return stuDao.queryByName(name);
    }

    @RequestMapping("/stu")
    public Stu queryStu(String name){
        System.out.println("succeed");
        Stu stu = new Stu();
        stu.setAge(23);
        stu.setId(11);
        stu.setName("stu");
        stu.setOccupation("sjsjsi");
//        return stuDao.queryByName(name);
        return stu;
    }
}
