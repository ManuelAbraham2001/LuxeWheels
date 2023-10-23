package com.LuxeWheels.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    public GlobalExceptionHandler() {
    }

    @ExceptionHandler({UsuarioNotFoundException.class})
    private ResponseEntity<?> usuarioNotFound(UsuarioNotFoundException e, WebRequest request) {
        return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({RolNotFoundException.class})
    private ResponseEntity<?> rolNotFound(RolNotFoundException e, WebRequest request) {
        return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
