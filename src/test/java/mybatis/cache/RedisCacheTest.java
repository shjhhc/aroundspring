package mybatis.cache;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import shjh.springmvc.dao.StudentDao;
import shjh.springmvc.domain.Student;


public class RedisCacheTest extends BaseJunitTest {
	@Autowired
	private StudentDao studentDao;
	
	@Test
	public void redisCacheTest(){
		Student stu = studentDao.queryStudentById(3);
		studentDao.saveStuRedis(stu);
		Student sture = (Student) studentDao.getStuRedis(2);
		System.out.println(sture);
	}
}
