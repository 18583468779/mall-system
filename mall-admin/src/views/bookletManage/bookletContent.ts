import { reactive, ref } from "vue";
import type { BookletItem, BookletListParams } from "./types";
import bookletApi from "../../api/BookletContentApi";

export default function useBookletContentService() {
  const contentData = ref<BookletItem[]>([]);
  const tablePageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const getBookletContent = async (params: BookletListParams = {}) => {
    const res: any = await bookletApi.getBookletContent();
    if (res.code === 200) {
      contentData.value = res.data;
    }
  };
  const addBookletContent = async (data: BookletItem) => {
    return bookletApi.addBookletContent(data);
  };

  const updateBookletContent = async (data: BookletItem) => {
    if (!data.booklet_id) return;
    return bookletApi.updateBookletContent(data.booklet_id, data);
  };

  const deleteBookletContent = async (id: number) => {
    if (!id) return;
    return bookletApi.deleteBookletContent(id);
  };

  return {
    getBookletContent,
    addBookletContent,
    updateBookletContent,
    deleteBookletContent,
    contentData,
    tablePageData,
  };
}

export type BookletService = ReturnType<typeof useBookletContentService>;
