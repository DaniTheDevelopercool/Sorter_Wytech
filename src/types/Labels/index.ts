export type Label = {
  ID: string;
  MAC: string;
  GROUP: string | null;
  DESCRIPTION: string;
  IMAGE_FILE: string;
  POLL_INTERVAL: number;
  POLL_TIMEOUT: number;
  SCAN_INTERVAL: number;
  CHANNEL: number;
  SCAN_CHANNELS: string;
  BATTERY_STATUS: string;
  BATTERY_VOLTAGE: number;
  VARIANT: string;
  VERSION: string;
  SUB_VERSION: string | null;
  IMAGE_ID: number;
  IMAGE_ID_LOCAL: number;
  BACKLIGHT: string | null;
  DISPLAY_OPTIONS: string;
  LED_OPTIONS: string;
  NFC_OPTIONS: string;
  LED_FLASH_COUNT: number | null;
  LQI: number;
  LQI_RX: number;
  LAST_POLL: string;
  LAST_INFO: string;
  LAST_IMAGE: string;
  BASE_STATION: string;
  STATUS: string;
  IMAGE_STATUS: string;
  FIRMWARE_STATUS: string;
  BOOT_COUNT: number;
  TEMPERATURE: number;
  LANID: string;
  WIDTH: number;
  HEIGHT: number;
  IMG_FORMAT: number;
};
