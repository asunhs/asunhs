package org.asunhs.laboratory;

public class MyClass {
	public static void main(String[] args) {
		MyClass my = new MyClass();
		System.out.println("Hello GIT!");
		
		String s = "Hello";
		String b = my.pass2(s);
		
		int i = 3;
		int j = my.pass2(i);
		
		System.out.println(j);
		System.out.println(j);
	}
	
	public <T> T pass(T t) {
		return t;
	}
	
	public <T> T pass2(Object obj) {
		return (T)obj;
	}
}
