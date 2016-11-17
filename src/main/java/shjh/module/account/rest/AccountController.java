package shjh.module.account.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shjh.module.account.bean.domain.Stu;
import shjh.module.account.dao.StuDao;
import shjh.module.account.service.StuService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by m on 2016/10/31.
 */
@RestController
public class AccountController {
//    @Autowired
    private StuDao stuDao;
    @Autowired
    private StuService stuService;

    @RequestMapping("/")
    public void queryStuByName(HttpServletResponse response) throws IOException {
        System.out.println("succeed");
        response.getWriter().write("hello shjh");
//        return stuDao.queryByName(name);
    }

    @RequestMapping(value = "/stu", name = "AccountController.queryStu")
    public Stu queryStu(@RequestBody String name) {
        Stu stu = stuService.queryByName(name);
//        stu = stuService.queryStuByName(name);
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
