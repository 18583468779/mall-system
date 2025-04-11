import { ref } from "vue";

/**
 * @description: 封装一个对话框的hooks
 * @param {*}
 * @return {*}
 */

export default function useVisiblehooks() {
  const dialogFormVisible = ref(false);
  const formRef = ref<any>();
  const onOpen = () => {
    dialogFormVisible.value = true;
  };
  const onOk = () => {
    dialogFormVisible.value = false;
  };
  const onCancel = () => {
    dialogFormVisible.value = false;
  };
  return { dialogFormVisible, onOpen, onOk, onCancel, formRef };
}
