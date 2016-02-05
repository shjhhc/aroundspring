package shjh.springmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import shjh.springmvc.domain.Student;
import shjh.springmvc.service.StudentService;

@RestController
@RequestMapping(value="/student")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@RequestMapping(value="/query" ,method={RequestMethod.POST, RequestMethod.GET})
	public ModelAndView queryStudent(int id){
		ModelAndView view = new ModelAndView();
		Student stu = studentService.queryStudentById(id);
		view.addObject("stu", stu);
		view.setViewName("student/studentshow");
		return view;
	}
}
