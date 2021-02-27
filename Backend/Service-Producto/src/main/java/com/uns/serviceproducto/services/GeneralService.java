package com.uns.serviceproducto.services;

import java.util.List;

public interface GeneralService<Entity, Id> {
	
	List<Entity> listAll();
	
	Entity findByID( Id id );
	
	Entity addNew( Entity entity );
	
	Entity update( Entity entity );
	
	void delete( Id id );
}
