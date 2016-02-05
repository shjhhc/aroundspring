package shjh.springmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import shjh.springmvc.service.StudentService;

@RestController
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	
}
