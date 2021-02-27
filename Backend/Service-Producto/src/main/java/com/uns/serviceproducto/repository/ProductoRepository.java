package com.uns.serviceproducto.repository;

import com.uns.serviceproducto.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
	
	@Query( "SELECT p FROM Producto p WHERE p.categoria.id = ?1" )
	List<Producto> porCategoria( Integer categoriaId );
}
