import { useState } from "react";

import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";

const usePostsListing = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const { mutateAsync: createCategory } = useCreateCategory();
  const { data: posts, isLoading } = useFetchPosts(
    selectedCategoryIds.length ? { category_ids: selectedCategoryIds } : {}
  );

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    await createCategory({ name: newCategoryName.trim() });
    setNewCategoryName("");
    setIsCategoryModalOpen(false);
  };

  const handleBookClick = () => {
    setIsCategoriesOpen(false);
    setSelectedCategoryIds([]);
  };

  return {
    handleBookClick,
    handleCreateCategory,
    isCategoriesOpen,
    isCategoryModalOpen,
    isLoading,
    newCategoryName,
    posts,
    selectedCategoryIds,
    setIsCategoriesOpen,
    setIsCategoryModalOpen,
    setNewCategoryName,
    setSelectedCategoryIds,
  };
};

export default usePostsListing;
