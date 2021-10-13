package com.example.monagence.services;

import com.example.monagence.entity.Property;

import java.util.List;

public interface PropertyService {
    List<Property> findAll();

    Property findById(int id);

    int create(Property property);

    void update(int id, Property property);

    void deleteById(int id);
}
