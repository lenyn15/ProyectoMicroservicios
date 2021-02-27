package com.uns.servicecliente.repository;

import com.uns.servicecliente.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
	
	Optional<Cliente> findByCodigo( String codigo );
	
	@Query( "SELECT c FROM Cliente c WHERE c.tipo.id = ?1" )
	List<Cliente> Clientes( Integer tipoID );
}
