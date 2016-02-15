package shjh.springmvc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shjh.springmvc.dao.StudentDao;
import shjh.springmvc.domain.Student;
import shjh.springmvc.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	private StudentDao studentDao;

	@Override
	public Student queryStudentById(int id) {
		return studentDao.queryStudentById(id);
	}

	@Override
	public Student queryStudentByName(String name) {
		return studentDao.queryStudentByName(name);
	}

	@Override
	public List<Student> queryStudents() {
		return studentDao.queryStudents();
	}

	@Override
	public void saveStuRedis(Student stu) {
		studentDao.saveStuRedis(stu);
	}

	@Override
	public Student getStuRedis(int id) {
		return (Student) studentDao.getStuRedis(id);
	}

	@Override
	public void saveStuINRedis(Student stu) {
		studentDao.saveStuINRedis(stu);
	}

	@Override
	public Student getStuINRedis(int id) {
		return studentDao.getStuINRedis(id);
	}

}
