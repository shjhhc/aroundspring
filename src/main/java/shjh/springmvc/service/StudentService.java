package shjh.springmvc.service;

import java.util.List;

import shjh.springmvc.domain.Student;

public interface StudentService {
	public Student queryStudentById(int id);
	
	public Student queryStudentByName(String name);
	
	public List<Student> queryStudents();
}
