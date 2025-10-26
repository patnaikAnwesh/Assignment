package com.example.todo.repository;

import com.example.todo.model.Todo;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryTodoRepository implements TodoRepository {
    private final Map<String, Todo> store = new ConcurrentHashMap<>();

    @Override
    public Collection<Todo> findAll() {
        return store.values();
    }

    @Override
    public Optional<Todo> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Todo save(Todo todo) {
        store.put(todo.getId(), todo);
        return todo;
    }

    @Override
    public void deleteById(String id) {
        store.remove(id);
    }
}