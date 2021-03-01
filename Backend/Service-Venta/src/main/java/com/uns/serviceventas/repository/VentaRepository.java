package com.uns.serviceventas.repository;

import com.uns.serviceventas.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository extends JpaRepository<Venta, Integer> {
}
