package shjh.springmvc.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Hashtable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import shjh.springmvc.dao.UserDao;
import shjh.springmvc.domain.User;

public class UserDaoImpl implements UserDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public void saveUser(User user) {
		String sql = "insert into user values(?, ?, ?, ?, ?)";
		jdbcTemplate.update(
				sql,
				new Object[] { user.getUserId(), user.getUserName(), user.getAge(), user.getCreateTime(), user.getStatus() });
	}

	@Override
	public User queryUserById(int userId) {
		String sql = "select * from user where user_id = ?";
		return jdbcTemplate.queryForObject(sql, new Object[] { userId },
				userRowMap);
	}

	@Override
	public User queryUserByName(String userName) {
		String sql = "select * from user where user_name = ?";
		return jdbcTemplate.queryForObject(sql, new Object[] { userName },
				userRowMap);
	}

	protected RowMapper<User> userRowMap = new RowMapper<User>() {

		@Override
		public User mapRow(ResultSet arg0, int arg1) throws SQLException {
			User user = new User();
			user.setUserId(arg0.getInt("user_Id"));
			user.setUserName(arg0.getString("user_name"));
			user.setAge(arg0.getInt("age"));
			user.setCreateTime(arg0.getDate("create_date"));
			user.setStatus(arg0.getInt("status"));
			return user;
		}
	};

	@Override
	public User queryUser(Hashtable<String, Object> hpFiter) {
		return null;
	}

}
