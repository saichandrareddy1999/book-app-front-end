package com.stackroute.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.stackroute.model.Book;


@Repository
@Transactional
public class BookRepository {

	@Autowired
	private SessionFactory sessionFactory;
	
	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Book> findAllCMatch(){
		
		return getSession().createQuery("from Book").list();
	}
	
	public Book findById(String id) {
		
		Book movie = getSession().find(Book.class, id);
		return movie;
	}
	
	public Boolean addNew(Book cmatch) {
		
		
		if(findById(cmatch.getId()) == null) {
			getSession().save(cmatch);
			return true;
		}
		
		return false;
		
	}
}

//select
//
