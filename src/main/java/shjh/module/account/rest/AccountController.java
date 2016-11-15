package shjh.module.account.rest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shjh.module.account.bean.domain.Stu;
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

    @RequestMapping(value = "/stu", name = "AccountController.queryStu")
    public Stu queryStu(String name){
        System.out.println("succeed");
        Stu stu = new Stu();
        stu.setAge(23);
        stu.setId(11);
        stu.setName(name);
        stu.setOccupation("sjsjsi");
//        return stuDao.queryByName(name);
        return stu;
    }

    @RequestMapping("/stu/{name}")
    public Stu queryByName(@PathVariable("name") String name){
        System.out.println("succeed");
        Stu stu = new Stu();
        stu.setAge(23);
        stu.setId(11);
        stu.setName(name);
        stu.setOccupation("sjsjsi");
//        return stuDao.queryByName(name);
        return stu;
    }
}
