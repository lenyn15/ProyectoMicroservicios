package com.uns.servicecliente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ServiceClienteApplication {
	
	public static void main( String[] args ) {
		SpringApplication.run( ServiceClienteApplication.class,
		                       args );
	}
	
}
