package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Service
public class TodoService {
    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public Collection<Todo> getAll() {
        return repo.findAll();
    }

    public Todo create(String title, Boolean completed) {
        String id = UUID.randomUUID().toString();
        boolean done = completed != null ? completed : false;
        Todo t = new Todo(id, title, done, Instant.now());
        return repo.save(t);
    }

    public Optional<Todo> update(String id, String title, Boolean completed) {
        Optional<Todo> existing = repo.findById(id);
        if (!existing.isPresent()) return Optional.empty();
        Todo t = existing.get();
        if (title != null) t.setTitle(title);
        if (completed != null) t.setCompleted(completed);
        repo.save(t);
        return Optional.of(t);
    }

    public boolean delete(String id) {
        Optional<Todo> existing = repo.findById(id);
        if (!existing.isPresent()) return false;
        repo.deleteById(id);
        return true;
    }
}