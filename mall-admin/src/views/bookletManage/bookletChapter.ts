import { reactive, ref } from "vue";
import type { BookletItem } from "./types";
import bookletApi from "../../api/BookletChapterApi";

export default function useBookletChapterService() {
  const ChapterData = ref<BookletItem[]>([]);
  const tablePageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const getBookletsChapter = async () => {
    const res: any = await bookletApi.getBookletsChapter();
    if (res.code === 200) {
      ChapterData.value = res.data;
    }
  };
  const addBookletChapter = async (data: BookletItem) => {
    return bookletApi.addBookletChapter(data);
  };

  const updateBookletChapter = async (data: BookletItem) => {
    if (!data.booklet_id) return;
    return bookletApi.updateBookletChapter(data.booklet_id, data);
  };

  const deleteBookletChapter = async (id: number) => {
    if (!id) return;
    return bookletApi.deleteBookletChapter(id);
  };

  return {
    getBookletsChapter,
    addBookletChapter,
    updateBookletChapter,
    deleteBookletChapter,
    ChapterData,
    tablePageData,
  };
}

export type BookletService = ReturnType<typeof useBookletChapterService>;
