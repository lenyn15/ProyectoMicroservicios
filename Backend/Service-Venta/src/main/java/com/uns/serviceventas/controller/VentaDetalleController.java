package com.uns.serviceventas.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping( path = "/ventadetalle",
                 produces = "application/json" )
@CrossOrigin( origins = "http://localhost:3000" )
public class VentaDetalleController {
}
