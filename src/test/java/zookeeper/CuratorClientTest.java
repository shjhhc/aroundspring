package zookeeper;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.junit.Before;
import org.junit.Test;

/**
 * Created by m on 2016/11/25.
 */
public class CuratorClientTest {
    private static final String ZK_ADDRESS = "172.16.2.177:2181";
    private static final String ZK_PATH = "/zktest";

    private CuratorFramework client;

    @Before
    public void before(){
        // 1.Connect to zk
        client = CuratorFrameworkFactory.builder()
                .connectString(ZK_ADDRESS)
                .sessionTimeoutMs(5000)
                .connectionTimeoutMs(3000)
                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                .build();
//        client = CuratorFrameworkFactory.newClient(ZK_ADDRESS, new RetryNTimes(10, 5000));
        client.start();
    }

    @Test
    public void create() throws Exception {
        System.out.println("zk client start successfully!");

        // 2.Client API test
        // 2.1 Create node
        String data1 = "hello";
        print("create", ZK_PATH, data1);
        client.create()
                .creatingParentsIfNeeded()
                .forPath(ZK_PATH, data1.getBytes());
    }

    @Test
    public void getdata() throws Exception {
        // 2.2 Get node and data
        print("ls", "/");
        print(client.getChildren().forPath("/"));
        print("get", ZK_PATH);
        print(client.getData().forPath(ZK_PATH));
    }

    @Test
    public void modifydata() throws Exception {
        // 2.3 Modify data
        String data2 = "world";
        print("set", ZK_PATH, data2);
        client.setData().forPath(ZK_PATH, data2.getBytes());
        print("get", ZK_PATH);
        print(client.getData().forPath(ZK_PATH));
    }

    @Test
    public void remove() throws Exception {
        // 2.4 Remove node
        print("delete", ZK_PATH);
        print(client.delete().forPath(ZK_PATH));
        print("ls", "/");
        print(client.getChildren().forPath("/"));
    }

    private void print(String... cmds) {
        StringBuffer sb = new StringBuffer("$ ");
        for (String cmd : cmds){
            sb.append(cmd).append(" ");
        }
        System.out.println(sb.toString());
    }

    private static void print(Object result) {
        System.out.println(
                result instanceof byte[]
                        ? new String((byte[]) result)
                        : result);
    }
}
