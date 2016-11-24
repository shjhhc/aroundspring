package shjh.system.web.common.bean;

import java.io.Serializable;

/**
 * Created by m on 2016/11/14.
 */
public class BaseReq implements Serializable {
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
