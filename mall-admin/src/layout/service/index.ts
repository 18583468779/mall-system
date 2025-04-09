import { storeToRefs } from "pinia";
import useMenuStore from "../../store/useMenuStore";

class LayoutService {
  static menuStore = useMenuStore();
  static menuStoreRefs = storeToRefs(this.menuStore);
  static setMenuCollapse() {
    // 设置菜单是否折叠
    LayoutService.menuStore.setMenuCollapse();
  }
}

export default LayoutService;
