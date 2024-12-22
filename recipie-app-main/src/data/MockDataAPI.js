import { Text } from 'react-native';
import React, { Component } from 'react';
import { recipes, categories, ingredients } from './dataArrays';

export function getCategoryById(categoryId) {
  return categories.find(data => data.id === categoryId);
}

export function getIngredientName(ingredientID) {
  const ingredient = ingredients.find(data => data.ingredientId === ingredientID);
  return ingredient ? ingredient.name : null;
}

export function getIngredientUrl(ingredientID) {
  const ingredient = ingredients.find(data => data.ingredientId === ingredientID);
  return ingredient ? ingredient.photo_url : null;
}

export function getCategoryName(categoryId) {
  const category = categories.find(data => data.id === categoryId);
  return category ? category.name : null;
}

export function getRecipes(categoryId) {
  return recipes.filter(data => data.categoryId === categoryId);
}

export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.forEach(data => {
    data.ingredients.forEach(index => {
      if (index[0] === ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}

export function getNumberOfRecipes(categoryId) {
  return recipes.filter(data => data.categoryId === categoryId).length;
}

export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.forEach(index => {
    const ingredient = ingredients.find(data => data.ingredientId === index[0]);
    if (ingredient) {
      ingredientsArray.push([ingredient, index[1]]);
    }
  });
  return ingredientsArray;
}

// Functions for search
export function getRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const recipesArray = [];
  ingredients.forEach(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipesByIngredient(data.ingredientId);
      recipes.forEach(item => {
        if (!recipesArray.includes(item)) {
          recipesArray.push(item);
        }
      });
    }
  });
  return recipesArray;
}

export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.forEach(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipes(data.id);
      recipes.forEach(item => {
        recipesArray.push(item);
      });
    }
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  return recipes.filter(data => data.title.toUpperCase().includes(nameUpper));
}
