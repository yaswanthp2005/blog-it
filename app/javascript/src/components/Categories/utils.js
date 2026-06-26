const filterCategoriesBySearchTerm = (categories, searchTerm) =>
  categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

const toggleCategorySelection = (selectedCategoryIds, categoryId) => {
  if (selectedCategoryIds.includes(categoryId)) {
    return selectedCategoryIds.filter(id => id !== categoryId);
  }

  return [...selectedCategoryIds, categoryId];
};

export { filterCategoriesBySearchTerm, toggleCategorySelection };
