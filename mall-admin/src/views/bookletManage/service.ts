import { reactive, ref } from "vue";
import type { BookletItem } from "./types";
import bookletApi from "../../api/BookletApi";

export default function useBookletService() {
  const tableData = ref<BookletItem[]>([]);
  const tablePageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const getBookletList = async () => {
    const res: any = await bookletApi.getBooklets();
    if (res.code === 200) {
      tableData.value = res.data;
    }
  };
  const createBooklet = async (data: BookletItem) => {
    return bookletApi.addBooklet(data);
  };

  const updateBooklet = async (data: BookletItem) => {
    if (!data.booklet_id) return;
    return bookletApi.updateBooklet(data.booklet_id, data);
  };

  const deleteBooklet = async (id: number) => {
    if (!id) return;
    return bookletApi.deleteBooklet(id);
  };

  return {
    getBookletList,
    createBooklet,
    updateBooklet,
    deleteBooklet,
    tableData,
    tablePageData,
  };
}

export type BookletService = ReturnType<typeof useBookletService>;
