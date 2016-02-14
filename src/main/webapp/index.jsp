<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div class="stu">
	<table class="stu_table" cellspacing="0" cellpadding="0">
		<thread>
			<tr class="col_name">
				<td style="width: 150px">name</td>
				<td style="width: 150px">age</td>
				<td style="width: 150px">occupation</td>
			</tr>
		</thread>
		<tbody class="order_list">
			<c:forEach items="${stulist}" var="stu">
				<tr class="order_bd">
					<td style="width: 150px">${stu.name}</td>
					<td style="width: 150px">${stu.age}</td>
					<td style="width: 150px">${stu.occupation}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</div>
</body>
</html>