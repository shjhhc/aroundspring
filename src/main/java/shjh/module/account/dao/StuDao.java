package shjh.module.account.dao;

import org.springframework.stereotype.Repository;
import shjh.module.account.bean.Stu;

/**
 * Created by m on 2016/10/31.
 */
@Repository
public interface StuDao {
    Stu queryByName(String name);
}
