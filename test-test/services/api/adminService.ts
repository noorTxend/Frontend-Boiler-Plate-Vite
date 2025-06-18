import { routesObject } from "@/constants/constant";
import { GetRequest } from "./adminRequestMethods";

export const PARTNERS_DETAIL = (subDomainName: string) =>
  GetRequest(`${routesObject.PARTNER}/${subDomainName}`);

export const COMPONENT_LIST = (pageId: string, whiteLabelPartnerId: any) =>
  GetRequest(`${routesObject.Widgets}/${pageId}/${whiteLabelPartnerId}`);

export const GET_WIDGET_LABELS = (componentId: string, widgetType: string) =>
  GetRequest(`${routesObject.Widgets}/type/${componentId}/${widgetType}`);

export const MODAL_LIST = (modalId: string) =>
  GetRequest(`${routesObject.Widgets}/modal/list/${modalId}`);

export const MODAL_INPUTS_LIST = (modalId: string) =>
  GetRequest(`${routesObject.Widgets}/modal/input/${modalId}`);

export const COMPONENT_ACCESS_LIST = (componentId: string) =>
  GetRequest(`${routesObject.Widgets}/access/${componentId}`);
