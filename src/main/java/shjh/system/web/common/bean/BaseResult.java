package shjh.system.web.common.bean;

/**
 * Created by shjh on 2016/11/24.
 */
public class BaseResult {
    private Integer retCode;
    private String msg;

    public BaseResult(Integer retCode) {
        this.retCode = retCode;
    }

    public BaseResult() {
        this.retCode = 1;
    }

    public Integer getRetCode() {
        return retCode;
    }

    public void setRetCode(Integer retCode) {
        this.retCode = retCode;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
