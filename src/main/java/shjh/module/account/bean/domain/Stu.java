package shjh.module.account.bean.domain;

import shjh.system.web.common.bean.BaseReq;

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

    public Stu setName(String name) {
        this.name = name;
        return this;
    }

    public Integer getAge() {
        return age;
    }

    public Stu setAge(Integer age) {
        this.age = age;
        return this;
    }

    public String getOccupation() {
        return occupation;
    }

    public Stu setOccupation(String occupation) {
        this.occupation = occupation;
        return this;
    }
}
