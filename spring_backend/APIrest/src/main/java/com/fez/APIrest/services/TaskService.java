package com.fez.APIrest.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fez.APIrest.entities.Task;
import com.fez.APIrest.entities.User;
import com.fez.APIrest.repositories.TaskRepository;
import com.fez.APIrest.repositories.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    // Obtener todas las tareas
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Obtener una tarea por ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Crear o actualizar una tarea
    public Task saveTask(Task task) {
        User user = userRepository.findById(task.getUser().getId())
                .orElseThrow(() -> new NoSuchElementException("User not found with id" + task.getUser().getId()));
        task.setUser(user);
        return taskRepository.save(task);
    }

    // Eliminar una tarea por ID
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
