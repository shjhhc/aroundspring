package shjh.springmvc.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import shjh.springmvc.dao.StudentDao;
import shjh.springmvc.domain.Student;

@Repository
public class StudentDaoImpl implements StudentDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

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
		String sql = "select * from student where name = ?";
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

}
