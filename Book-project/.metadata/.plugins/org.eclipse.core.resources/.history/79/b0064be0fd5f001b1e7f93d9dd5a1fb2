package com.stackroute.repository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import com.stackroute.config.MovieWebAppContext;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {MovieWebAppContext.class})
@WebAppConfiguration
public class UserRespositoryIntegrationTest {
	
	@Autowired
	private UserRepository userRepo;
	
	@Test
	public void findAllCMatchesShouldReturnAllCMatches() {
		System.out.println(userRepo.findAllUsers());
	}

}
