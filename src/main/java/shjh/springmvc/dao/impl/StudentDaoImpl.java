package shjh.springmvc.dao.impl;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.SerializationUtils;

import shjh.springmvc.dao.StudentDao;
import shjh.springmvc.domain.Student;

@Repository
public class StudentDaoImpl implements StudentDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private RedisTemplate<Serializable, Serializable> redisTemplate;

	@Override
	public Student queryStudentById(int id) {
		Student stu = new Student();
		stu.setId(id);
		stu.setName("shjh");
		stu.setAge(25);
		stu.setOccupation("coding");
		return stu;
	}

	@Override
	public Student queryStudentByName(String name) {
		String sql = "select * from stu where name = ?";
		return jdbcTemplate.queryForObject(sql, new Object[]{ name }, stuRowMap);
	}
	
	protected RowMapper<Student> stuRowMap = new RowMapper<Student>() {

		@Override
		public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
			Student stu = new Student();
			stu.setId(rs.getInt("id"));
			stu.setName(rs.getString("name"));
			stu.setAge(rs.getInt("age"));
			stu.setOccupation(rs.getString("occupation"));
			return stu;
		}
	};

	@Override
	public int insertStudent(Student stu) {
		return 0;
	}

	@Override
	public List<Student> queryStudents() {
		String sql = "select * from stu";
		return jdbcTemplate.query(sql, stuRowMap);
	}

	@Override
	public void saveStuINRedis(final Student stu) {
		redisTemplate.execute(new RedisCallback<Object>() {

			@Override
			public Object doInRedis(RedisConnection connection) throws DataAccessException {
				connection.set(redisTemplate.getStringSerializer().serialize(("stu.uuid." + stu.getId())), 
						redisTemplate.getStringSerializer().serialize(stu.getName()));
				return null;
			}
		});
	}

	@Override
	public Student getStuINRedis(final int id) {
		redisTemplate.execute(new RedisCallback<Student>() {

			@Override
			public Student doInRedis(RedisConnection connection)
					throws DataAccessException {
				byte[] key = redisTemplate.getStringSerializer().serialize("stu.uuid." + id);
				if(connection.exists(key)){
					byte[] value = connection.get(key);
					String name = redisTemplate.getStringSerializer().deserialize(value);
					Student stu = new Student();
					stu.setId(id);
					stu.setName(name);
					stu.setAge(18);
					stu.setOccupation("INcoding");
					return stu;
				}
				return null;
			}
		});
		return null;
	}
	
	@Override
	public void saveStuRedis(final Object obj) {
		ValueOperations<Serializable, Serializable> valueOps = redisTemplate.opsForValue();
		if(obj instanceof Student){
			Student stu = (Student)obj;
			valueOps.set("student.uuid." + stu.getId(), stu);
		}else if(obj instanceof HttpSession){
			HttpSession session = (HttpSession)obj;
			byte[] sessionByte = SerializationUtils.serialize(session);
			valueOps.set("session.uuid." + session.getId(), sessionByte);
		}
	}
	
	@Override
	public Object getStuRedis(final int id) {
		ValueOperations<Serializable, Serializable> valueOps = redisTemplate.opsForValue();
		Object obj = valueOps.get("student.uuid." + id);
		if(obj instanceof Student){
			return (Student)obj;
		}else if(obj instanceof HttpSession){
			return (HttpSession)obj;
		}
		return obj;
	}

}
