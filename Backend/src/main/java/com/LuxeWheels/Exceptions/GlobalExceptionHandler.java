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
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({RolNotFoundException.class})
    private ResponseEntity<?> rolNotFound(RolNotFoundException e, WebRequest request) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({UsuarioAlreadyExistException.class})
    private ResponseEntity<?> usuarioAlreadyExist(UsuarioAlreadyExistException e, WebRequest request) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({UsuarioAlreadyAdmin.class})
    private ResponseEntity<?> usuarioAlreadyAdmin(UsuarioAlreadyAdmin e, WebRequest request) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({ConflictDatesException.class})
    private ResponseEntity<?> conflictDates(ConflictDatesException e, WebRequest request) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({PatenteAlreadyExistException.class})
    private ResponseEntity<?> conflictDates(PatenteAlreadyExistException e, WebRequest request) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }
}
