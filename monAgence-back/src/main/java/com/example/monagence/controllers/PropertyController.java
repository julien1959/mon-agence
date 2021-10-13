package com.example.monagence.controllers;

import com.example.monagence.entity.Property;
import com.example.monagence.exceptions.ResourceNotFoundException;
import com.example.monagence.services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/properties")
@CrossOrigin("http://localhost:4200")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public List<Property> findAll() {
        return propertyService.findAll();
    }

    @GetMapping("/{id}")
    public Property findById(@PathVariable("id") int id) {
        Property reponse = propertyService.findById(id);
        if (reponse == null) {
            throw new ResourceNotFoundException();
        }
        return reponse;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public int create(@RequestBody Property property) {
        return propertyService.create(property);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable("id") int id, @RequestBody Property property) {
        if (propertyService.findById(id) == null) {
            throw new ResourceNotFoundException();
        } else {
            propertyService.update(id, property);
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") int id) {
        if (propertyService.findById(id) == null) {
            throw new ResourceNotFoundException();
        } else {
            propertyService.deleteById(id);
        }
    }

}
