import { DEFAULT_VISIBLE_COLUMNS } from "components/Posts/MyPosts/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMyPostsColumnsStore = create(
  persist(
    set => ({
      visibleColumns: DEFAULT_VISIBLE_COLUMNS,

      setVisibleColumns: visibleColumns => set({ visibleColumns }),

      toggleColumn: columnKey =>
        set(({ visibleColumns }) => {
          if (columnKey === "title") {
            return { visibleColumns };
          }

          const isVisible = visibleColumns.includes(columnKey);

          return {
            visibleColumns: isVisible
              ? visibleColumns.filter(key => key !== columnKey)
              : [...visibleColumns, columnKey],
          };
        }),
    }),
    { name: "my-posts-columns-store" }
  )
);

export default useMyPostsColumnsStore;
