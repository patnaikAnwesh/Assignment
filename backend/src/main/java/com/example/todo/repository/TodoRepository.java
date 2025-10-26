package com.example.todo.repository;

import com.example.todo.model.Todo;

import java.util.Collection;
import java.util.Optional;

public interface TodoRepository {
    Collection<Todo> findAll();
    Optional<Todo> findById(String id);
    Todo save(Todo todo);
    void deleteById(String id);
}