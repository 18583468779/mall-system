import { computed, onUnmounted, ref } from "vue";

// 倒计时逻辑
export const useCountdown = (init = 60) => {
  const count = ref(0);
  let timer: NodeJS.Timeout | null = null;

  // 开始倒计时
  const startCountdown = () => {
    count.value = init;
    timer = setInterval(() => {
      count.value--;
      if (count.value <= 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  return { count, startCountdown, isCounting: computed(() => count.value > 0) };
};
