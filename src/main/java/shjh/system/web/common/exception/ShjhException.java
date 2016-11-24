package shjh.system.web.common.exception;

/**
 * Created by shjh on 2016/11/24.
 */
public class ShjhException extends Exception {
    public ShjhException(String message) {
        super(message);
    }

    public ShjhException(String message, Throwable cause) {
        super(message, cause);
    }

    public ShjhException(Throwable cause) {
        super(cause);
    }

    public ShjhException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
