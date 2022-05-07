package ca.yashghatti.bas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class BuildingAccessServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BuildingAccessServiceApplication.class, args);
	}

}
