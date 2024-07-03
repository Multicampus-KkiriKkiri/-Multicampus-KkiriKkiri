package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
@ComponentScan(basePackages = "dao")
@ComponentScan(basePackages = "dto")
@ComponentScan(basePackages = "controller")
@ComponentScan(basePackages = "service")
@ComponentScan(basePackages = "chat")
public class KkiriKkiriApplication {

	public static void main(String[] args) {
		SpringApplication.run(KkiriKkiriApplication.class, args);
		
		System.out.println("끼리끼리 Application start");
	}

}
