package shjh.springmvc.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class User implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -127347298663854388L;
	
	private int userId;
	private String userName;
	private String password;
	private int age;
	private Date createTime;
	private int status;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String toString() {
		return "{userId:"
				+ userId
				+ ",userName:"
				+ userName
				+ ",password:"
				+ password
				+ ",age:"
				+ age
				+ ",createTime:"
				+ new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(createTime) 
				+ ",status:" + status + "}";
	}

}
