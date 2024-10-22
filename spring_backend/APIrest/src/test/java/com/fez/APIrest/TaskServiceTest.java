package com.fez.APIrest;

import com.fez.APIrest.entities.Task;
import com.fez.APIrest.repositories.TaskRepository;
import com.fez.APIrest.services.TaskService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1L, "Test Task", "Description", false, null, null));
        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> result = taskService.getAllTasks();

        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    public void testGetTaskById() {
        Task task = new Task(1L, "Test Task", "Description", false, null, null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Optional<Task> result = taskService.getTaskById(1L);

        assertTrue(result.isPresent());
        assertEquals("Test Task", result.get().getTitle());
    }

    @Test
    public void testSaveTask() {
        Task task = new Task(1L, "New Task", "New Description", false, null, null);
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.saveTask(task);

        assertEquals("New Task", result.getTitle());
        assertEquals("New Description", result.getDescription());
    }

    @Test
    public void testDeleteTask() {
        Long taskId = 1L;
        doNothing().when(taskRepository).deleteById(taskId);
        
        assertDoesNotThrow(() -> taskService.deleteTask(taskId));
        verify(taskRepository, times(1)).deleteById(taskId);
    }
}
