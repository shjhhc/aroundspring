package shjh.module.account.bean.domain;

import shjh.module.account.bean.req.BaseReq;

/**
 * Created by m on 2016/10/31.
 */
public class Stu extends BaseReq {
    private String name;
    private Integer age;
    private String occupation;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }
}
