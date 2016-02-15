package shjh.springmvc.dao;

import java.util.List;

import shjh.springmvc.domain.Student;

public interface StudentDao {
	public Student queryStudentById(int id);
	
	public Student queryStudentByName(String name);
	
	public int insertStudent(Student stu);
	
	public List<Student> queryStudents();
	
	public void saveStuINRedis(final Student stu);
	
	public Student getStuINRedis(final int id);
	
	public void saveStuRedis(final Object stu);
	
	public Object getStuRedis(final int id);

}
