import { storageService } from "../../services";
import { STORAGE_KEYS } from "../consts/app-keys.const";

export const useAuthority = () => {
  const userId = storageService.getItem(STORAGE_KEYS.USER_ID);

  return {
    userId,
  };
};
