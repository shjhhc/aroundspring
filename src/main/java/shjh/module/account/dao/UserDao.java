package shjh.module.account.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import shjh.module.account.bean.domain.User;

/**
 * Created by m on 2016/11/7.
 */
@Repository
public interface UserDao {
    @Select(value = "select username,password,enabled from users where username = #{username}")
    User loadUserByUsername(@Param("username") String username);

    @Insert(value = "insert into users (username, password, enabled, create_date) value(#{username},#{password},#{enabled},#{createDate})")
    void saveUser(User user);
}
