package shjh.springmvc.dao;

import shjh.springmvc.domain.Student;

public interface StudentDao {
	public Student queryStudentById(int id);
	
	public Student queryStudentByName(String name);
}
