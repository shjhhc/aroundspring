package shjh.springmvc.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@RequestMapping(value="/query/id={id}", method={RequestMethod.POST, RequestMethod.GET})
	public ModelAndView queryStudent(@PathVariable("id") int id){
		ModelAndView view = new ModelAndView();
		List<Student> stulist = new ArrayList<>();
		Student stu = studentService.queryStudentById(id);
		stulist.add(stu);
		view.addObject("stulist", stulist);
		view.setViewName("student/studentshow");
		return view;
	}
	
	@RequestMapping(value="/query/name={name}", method={RequestMethod.POST, RequestMethod.GET})
	public String queryStudentByName(@PathVariable String name, Model model){
		List<Student> stulist = new ArrayList<>();
		Student stu = studentService.queryStudentByName(name);
		stulist.add(stu);
		model.addAttribute("stulist", stulist);
		return "student/studentshow";
	}
	
	@RequestMapping(value="/queryall", method={RequestMethod.POST, RequestMethod.GET})
	public String queryStudents(Model model){
		List<Student> stulist = studentService.queryStudents();
		model.addAttribute("stulist", stulist);
		return "student/studentshow";
	}
	
}
