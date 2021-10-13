package com.example.monagence.services.impl;

import com.example.monagence.entity.Property;
import com.example.monagence.repository.PropertyRepository;
import com.example.monagence.services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public List<Property> findAll() {
        List<Property> list = new ArrayList<>();
        propertyRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Property findById(int id) {
        if (propertyRepository.findById(id).isPresent()) {
            return propertyRepository.findById(id).get();
        } else {
            return null;
        }
    }

    @Override
    public int create(Property property) {
        return propertyRepository.save(property).getId();
    }

    @Override
    public void update(int id, Property property) {
        property.setId(id);
        propertyRepository.save(property);
    }

    @Override
    public void deleteById(int id) {
        propertyRepository.deleteById(id);
    }
}
