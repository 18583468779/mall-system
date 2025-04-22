// composables/useDevice.ts
import { ref, onMounted, onUnmounted } from "vue";

const useDevice = () => {
  const isMobile = ref(false);

  // 设备检测逻辑
  const checkDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileAgent = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    const isMobileView = window.innerWidth <= 768;

    isMobile.value = isMobileAgent || isMobileView;
  };

  // 防抖处理
  const debounce = (fn: Function, delay: number) => {
    let timer: any = null;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(), delay);
    };
  };

  onMounted(() => {
    checkDevice();
    window.addEventListener("resize", debounce(checkDevice, 200));
  });

  onUnmounted(() => {
    window.removeEventListener("resize", debounce(checkDevice, 200));
  });

  return { isMobile };
};

export default useDevice;
