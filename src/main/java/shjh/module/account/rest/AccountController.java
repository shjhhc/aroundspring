package shjh.module.account.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shjh.module.account.bean.domain.Stu;
import shjh.module.account.dao.StuDao;
import shjh.module.account.service.StuService;

import javax.lang.model.element.Name;
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

    @RequestMapping(value = "/", name = "AccountController")
    public void queryStuByName(HttpServletResponse response) throws IOException {
        System.out.println("succeed");
        response.getWriter().write("hello shjh");
//        return stuDao.queryByName(name);
    }

    @RequestMapping(value = "/stu", name = "AccountController.queryStu")
    public Stu queryStu(@RequestBody Stu req) {
        Stu stu = stuService.queryByName(req.getName());
        stu = stuService.queryStuByName(stu.getName());
        return stu;
    }

    @RequestMapping(value = "/stu/{name}", name = "AccountController.queryByName")
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

    @RequestMapping(value = "restful/{name}", name = "restful", method = RequestMethod.GET)
    public String restful(@PathVariable String name){
        return name;
    }

    @RequestMapping(value = "norestful", method = RequestMethod.GET)
    public String norestful(@RequestParam String name){
        return name;
    }
}
