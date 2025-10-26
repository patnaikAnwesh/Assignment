package com.example.todo.controller;

import com.example.todo.dto.CreateTodoRequest;
import com.example.todo.dto.UpdateTodoRequest;
import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;

@RestController
@RequestMapping("/todos")
public class TodoController {
    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    // GET /todos
    @GetMapping
    public Collection<Todo> getAll() {
        return service.getAll();
    }

    // POST /todos
    @PostMapping
    public ResponseEntity<Todo> create(@Valid @RequestBody CreateTodoRequest req) {
        Todo todo = service.create(req.getTitle(), req.getCompleted());
        return ResponseEntity.created(URI.create("/todos/" + todo.getId())).body(todo);
    }

    // PUT /todos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody UpdateTodoRequest req) {
        return service.update(id, req.getTitle(), req.getCompleted())
                .map(t -> ResponseEntity.ok((Object) t))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Todo not found")));
    }

    // DELETE /todos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        boolean removed = service.delete(id);
        if (!removed) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Todo not found"));
        }
        return ResponseEntity.noContent().build();
    }
}