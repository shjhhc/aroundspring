package mybatis.cache;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author yujie
 * @ClassName BaseDaoTest
 * @Description
 * @Version 1.0
 * @Date 2015-06-09
 */
@RunWith(SpringJUnit4ClassRunner.class)
//@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
@Transactional
@ContextConfiguration(value = "classpath:META-INF/spring/applicationContext.xml")
public class BaseJunitTest /*extends AbstractTransactionalJUnit4SpringContextTests */{

    @BeforeClass
    public static void  beforeTest(){
    }

    @AfterClass
    public static void afterTest(){
    }

    @Test
    public void init(){

    }
}
