package com.fez.APIrest.controllers;

import com.fez.APIrest.entities.Task;
import com.fez.APIrest.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService; // Injection service

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks(); // Calling service
    }

    // Get task by id
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id); // Calling service
        if (task.isPresent()) {
            return new ResponseEntity<>(task.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task); // Calling service
    }

    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> task = taskService.getTaskById(id); // Calling service
        if (task.isPresent()) {
            Task updateTask = task.get();
            updateTask.setTitle(taskDetails.getTitle());
            updateTask.setDescription(taskDetails.getDescription());
            updateTask.setCompleted(taskDetails.isCompleted());
            updateTask.setExpirationDate(taskDetails.getExpirationDate());
            return new ResponseEntity<>(taskService.saveTask(updateTask), HttpStatus.OK); // Calling service
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskService.getTaskById(id).isPresent()) { // Calling service
            taskService.deleteTask(id); // Calling service
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
