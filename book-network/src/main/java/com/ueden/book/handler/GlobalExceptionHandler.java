package com.ueden.book.handler;

import jakarta.mail.MessagingException;
import org.apache.catalina.authenticator.BasicAuthenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException exp){
    return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ExceptionResponse.builder()
                    .businessErrorCode(BusinessErrorCodes.ACCOUNT_LOCKED.getCode())
                    .businessErrorDescription(BusinessErrorCodes.ACCOUNT_LOCKED.getDescription())
                    .error(exp.getMessage())
                    .build());
    }

    @ExceptionHandler(value = DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException exp){
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCodes.ACCOUNT_DISABLED.getCode())
                        .businessErrorDescription(BusinessErrorCodes.ACCOUNT_DISABLED.getDescription())
                        .error(exp.getMessage())
                        .build());
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException exp){
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCodes.BAD_CREDENTIALS.getCode())
                        .businessErrorDescription(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                        .error(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                        .build());
    }

    // e.g.  not able to send email
    @ExceptionHandler(value = MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException exp){
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .error(exp.getMessage())
                        .build());
    }

    // e.g.  user sends invalid data, ... username, password etc.
    // thrown by @Valid annotation on controller
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException exp){
        Set<String> errors = new HashSet<>();
        exp.getBindingResult().getAllErrors()
                .forEach((error) -> errors.add(error.getDefaultMessage()));
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponse.builder()
                        .validationErrors(errors)
                        .build());
    }

    // Cover any other exception case
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp){
        // log the exception
        exp.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .businessErrorDescription("Internal Server Error, contact the administrator")
                        .error(exp.getMessage())
                        .build());
    }
}
