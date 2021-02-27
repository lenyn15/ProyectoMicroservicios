package com.uns.serviceproducto.repository;

import com.uns.serviceproducto.entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
	
	Optional<Marca> findByNombre( String nombre );
}
