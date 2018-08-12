import Vue from 'vue';

export const EVENT_ADD_CUSTOMER = 'add-customer';
export const EVENT_TOGGLE_REG_MENU = 'toggle-reg-menu';
export const EVENT_TOGGLE_EDIT_WORK_HOURS = 'toggle-edit-work-hours';
export const EVENT_SELECTED_CMP = 'selected-cmp';
export const EVENT_OPEN_EDITOR_WORKING_HOURS = 'edit-working-hours'
export const EVENT_OPEN_TOOL_BAR = 'open-tool-bar'
export const EVENT_UPDATE_USER = 'update-user'
export const EVENT_ADDRESS_CHANGE = 'address-change'
export const EVENT_CHANGE_MODE_PAGE = 'change-mode-page'
export const EVENT_TOGGLE_HEADER_PAGE = 'toggle-header-page'
export const EVENT_TOGGLE_SHARE_MENU = 'open-share-menu'
export const EVENT_SHOW_TOOL_TIP_TEXT = 'show-tool-tip-text'

export const eventBus = new Vue();