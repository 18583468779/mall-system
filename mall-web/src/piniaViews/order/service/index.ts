import { storeToRefs } from "pinia";
import orderStore from "../../../piniaStore/order";
import userStore from "../../../piniaStore/userInfo";
import ShopCart from "../../books/service/shopCart";
import { Orderinfo } from "../../../piniaStore/order/state";
import router from "../../../router";
import { computed, onMounted, ref } from "vue";
import dayjs from "dayjs";

interface GoodsItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

class OrderService {
  static store = orderStore();
  static userStore = userStore();
  static storeRef = storeToRefs(OrderService.store);
  static paymentMethod = ref<"alipay" | "wechat">("alipay");
  static swiperContainer = ref<HTMLElement>();
  static currentPage = ref(1);
  static showPrevButton = ref(false);
  static showNextButton = ref(true);
  // 模拟数据
  static goodsList = ref<GoodsItem[]>([
    {
      id: 1,
      name: "JavaScript高级程序设计（第4版）",
      image: "https://picsum.photos/200/300",
      price: 79.0,
      quantity: 1,
      total: 79.0,
    },
    {
      id: 2,
      name: "Vue 3 实战项目开发指南",
      image: "https://picsum.photos/200/301",
      price: 89.0,
      quantity: 2,
      total: 178.0,
    },
    {
      id: 3,
      name: "JavaScript高级程序设计（第4版）",
      image: "https://picsum.photos/200/300",
      price: 79.0,
      quantity: 1,
      total: 79.0,
    },
    // 添加更多测试数据...
  ]);
  // 提交订单
  static async submitOrder() {
    const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const { getShopCartListIsSelected } = ShopCart.storeRefs;
    const orderDetail: Orderinfo = {
      ordertime: currentTime, //订单时间
      customerid: OrderService.userStore.storeLoginUser.userid, //顾客id,就是当前登录开
      orderstatus: 1, //订单状态
      orderDetailList: getShopCartListIsSelected.value,
    };
    const res: any = await OrderService.store.submitOrder(orderDetail);
    if (res && res.code == 200) {
      ShopCart.clearShopCartList(true); // 清空选中的购物车
      router.push({ name: "orderSort" });
    }
  }
  static init() {
    onMounted(() => {
      OrderService.handleScroll();
    });
  }
  static goBack() {
    router.go(-1);
  }
  static goToAddressList = () => {
    console.log("跳转到地址列表");
  };
  // 改变支付方式
  static changePaymentMethod = (method: "alipay" | "wechat") => {
    OrderService.paymentMethod.value = method;
  };
  // 计算总页数
  static totalPages = computed(() => {
    if (!OrderService.swiperContainer.value) return 0;
    const containerWidth = OrderService.swiperContainer.value.offsetWidth;
    const itemWidth = 2.6; // rem单位
    return Math.ceil(
      OrderService.goodsList.value.length /
        Math.floor(containerWidth / (itemWidth * 100))
    );
  });

  // 滚动处理
  static handleScroll = () => {
    if (!OrderService.swiperContainer.value) return;

    const { scrollLeft, scrollWidth, clientWidth } =
      OrderService.swiperContainer.value;
    OrderService.showPrevButton.value = scrollLeft > 0;
    OrderService.showNextButton.value = scrollLeft + clientWidth < scrollWidth;

    // 计算当前页码
    OrderService.currentPage.value = Math.round(scrollLeft / clientWidth) + 1;
  };

  // 滚动控制
  static scrollTo = (direction: "prev" | "next") => {
    if (!OrderService.swiperContainer.value) return;

    const scrollAmount = OrderService.swiperContainer.value.clientWidth * 0.8;
    const newScrollLeft =
      direction === "next"
        ? OrderService.swiperContainer.value.scrollLeft + scrollAmount
        : OrderService.swiperContainer.value.scrollLeft - scrollAmount;

    OrderService.swiperContainer.value.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };
}

export default OrderService;
