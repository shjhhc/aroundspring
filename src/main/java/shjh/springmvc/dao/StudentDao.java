package shjh.springmvc.dao;

import java.util.List;

import shjh.springmvc.domain.Student;

public interface StudentDao {
	public Student queryStudentById(int id);
	
	public Student queryStudentByName(String name);
	
	public int insertStudent(Student stu);
	
	public List<Student> queryStudents();
	
	public void saveStuRedis(final Student stu);
	
	public Student getStuRedis(final int id);
}
