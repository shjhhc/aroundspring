package shjh.springmvc.service;

import java.util.List;

import shjh.springmvc.domain.Student;

public interface StudentService {
	public Student queryStudentById(int id);

	public Student queryStudentByName(String name);

	public List<Student> queryStudents();

	public void saveStuINRedis(final Student stu);

	public Student getStuINRedis(final int id);

	public void saveStuRedis(final Student stu);

	public Student getStuRedis(final int id);
}
