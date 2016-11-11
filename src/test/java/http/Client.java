package http;

import shjh.system.web.utils.HttpClientUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by m on 2016/11/10.
 */
public class Client {
    private static String url = "http://localhost:8080";

    public static void main(String[] args) {
        Map<String,String> req_headers = new HashMap();
        req_headers.put("Connection", "keep-alive");
        String str = "shjh";
        String jsonPost = HttpClientUtil.jsonPost(url, req_headers, str);
    }
}
