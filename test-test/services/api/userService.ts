import { RO_CONSTANTS } from "@/constants/RolloverConstants";
import { PortfolioPermId, AccessCode, PortfolioTypeId } from "@/types";
import { RolloverPost, downloadBlobPost } from "./requestMethods";

export const GET_ACCESS_CODE = (
  partnerPermId: any,
  apiKey: any
): Promise<string> =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.GET_ACCESS_CODE}`,
    {
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
    }
  );

//rollover changings
export const INTERNAL_PORTFOLIO_INQ = (
  portfolioPermId: PortfolioPermId,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .PORTFOLIO_INQ,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(portfolioPermId),
    },
    HashTag: "",
  });

export const PORTFOLIO_INQ = (
  portfolioPermId: PortfolioPermId,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.EXTERNAL_RQ
        .PORTFOLIO_INQ,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(portfolioPermId),
    },
    HashTag: "",
  });

export const LIST_USERS = (
  portfolioPermId: any,
  PortfolioTypeId: PortfolioTypeId,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .PORTFOLIO_INQ,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(portfolioPermId),
      PortfolioTypeId: PortfolioTypeId,
    },
    HashTag: "",
  });

export const TRANSACTION_INQ_RQ = (
  portfolioPermId: PortfolioPermId,
  startDate: string,
  endDate: string,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.EXTERNAL_RQ
        .TRANSACTION_INQ,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermID: Number(portfolioPermId),
      StartDt: startDate,
      EndDt: endDate,
    },
    HashTag: "",
  });

export const FETCH_TRANSACATION_DETAIL = (
  PortfolioPermId: any,
  TransactionPermId: number,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.EXTERNAL_RQ
        .TRANSACTION_DETAIL,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(PortfolioPermId),
      TransactionPermId: TransactionPermId,
    },
    HashTag: "",
  });

export const PAGE_PERMISSION = (
  siteId: string,
  pageId: string,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.PAGE_PERMISSION}`,
    {
      AccessCode: AccessCode,
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
      SiteId: siteId,
      PageId: pageId,
    }
  );

// Add Plan Advisor
export const INTERNAL_PLAN_ADVISOR_ADD = (
  AccessCode: AccessCode,
  apiData: any,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .ADD_ADVISOR_AGENT,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PartnerPermId: partnerPermId,
      ...apiData,
    },
    HashTag: "",
  });

// Add Paricipant
export const INTERNAL_PARTICIPANT_ADD_REQ = (
  AccessCode: AccessCode,
  apiData: any,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .ADD_PARTICIPANT,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...apiData,
    },
    HashTag: "",
  });

export const GET_USER_LOGIN = (
  userName: string,
  password: string,
  identityToken: null | string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.GET_USER_LOGIN}`,
    {
      UserName: userName,
      Password: password,
      IdentityToken: identityToken,
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
    }
  );

export const PORTFOLIO_ADDRESS_ADD_RQ = (
  data: any,
  accessCode: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.EXTERNAL_RQ
        .ADD_ADDRESS,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...data,
    },
    HashTag: "",
  });

export const PORTFOLIO_CONTACT_MOD_RQ = (
  data: any,
  accessCode: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.EXTERNAL_RQ
        .CONTACT_MOD,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...data,
    },
    HashTag: "",
  });

export const INTERNAL_PARTNER_TODO_INQ_RQ = (
  agentPermId: number,
  rowsPerPage: number,
  pageNumber: number,
  status: number,
  accessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .TODO_LIST,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      AgentPermId: agentPermId,
      RowsOfPage: rowsPerPage,
      PageNumber: pageNumber,
      Status: status,
    },
    HashTag: "",
  });

export const INTERNAL_PARNTER_TODO_COMPLETE_RQ = (
  portfolioPermId: any,
  toDoPermId: number[],
  accessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .COMPLETE_TODO,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(portfolioPermId),
      ToDoPermId: toDoPermId,
    },
    HashTag: "",
  });

export const INTERNAL_PARTNER_TODO_ARCHIVE_RQ = (
  portfolioPermId: any,
  toDoPermId: number[],
  accessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .ARCHIVE_TODO,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(portfolioPermId),
      ToDoPermId: toDoPermId,
    },
    HashTag: "",
  });

export const INTERNAL_PARTICIPANT_UPLOAD_RQ = (
  sheetData: any,
  accessCode: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .UPLOAD_PARTICIPANT,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...sheetData,
    },
    HashTag: "",
  });

export const INTERNAL_UPLOAD_REQUIRED_DOCUMENT_RQ = (
  sheetData: any,
  accessCode: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .UPLOAD_DOCS,
    AccessCode: accessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...sheetData,
    },
    HashTag: "",
  });

// registration
export const INTERNAL_ADMINISTRATOR_ADD_RQ = (
  formData: any,
  accesscode: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .ADD_ADMINISTRATOR,
    AccessCode: accesscode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PartnerPermId: Number(partnerPermId),
      ...formData,
    },
    HashTag: "",
  });

export const INTERNAL_ADVISOR_ADD_RQ = (
  formData: any,
  accesscode: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .ADD_ADVISOR,
    AccessCode: accesscode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...formData,
    },
    HashTag: "",
  });

export const INTERNAL_SPONSOR_ADD_RQ = (
  formData: any,
  accesscode: string | null,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.INTERNAL_RQ
        .ADD_SPONSOR,
    AccessCode: accesscode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...formData,
    },
    HashTag: "",
  });

export const PORTFOLIO_STATUS_MOD_RQ = (
  formData: any,
  accesscode: string | null,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}/`, {
    APIName:
      RO_CONSTANTS.API_CATEGORY_TYPES.EXTERNAL_MANAGEMENT_API.EXTERNAL_RQ
        .STATUS_MOD,
    AccessCode: accesscode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      ...formData,
    },
    HashTag: "",
  });

export const CHECK_USER_NAME = (
  username: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.CHECK_USER_NAME}`,
    {
      Username: username,
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
    }
  );

export const USER_REQUEST_RESET_PASSWORD = (
  username: string,
  EmailAddress: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.USER_RESET_PW_RQ}`,
    {
      Username: username,
      EmailAddress: EmailAddress,
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
    }
  );

export const USER_RESET_PASSWORD = (
  username: string,
  newpassword: string,
  authcode: string,
  referencevalue: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.USER_RESET_PW}`,
    {
      Username: username,
      NewPassword: newpassword,
      AuthCode: authcode,
      ReferenceValue: referencevalue,
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
    }
  );
export const VALIDATE_TFA_CODE = (
  authcode: string,
  referencevalue: string,
  saveidentity: boolean,
  useripaddress: string,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(
    `${RO_CONSTANTS.API_CATEGORY.ACCESS_CODE}/${RO_CONSTANTS.API_CATEGORY_TYPES.ACCESS_CODE_API.VALIDATE_TFA_CODE}`,
    {
      PartnerPermId: Number(partnerPermId),
      AccessKey: String(apiKey),
      AuthCode: authcode,
      ReferenceValue: referencevalue,
      SaveIdentity: saveidentity,
      UserIPAddress: useripaddress,
    }
  );
export const GET_DOC_LIST = (
  portfolioPermId: any,
  Required: boolean,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}`, {
    APIName: RO_CONSTANTS.API_CATEGORY_TYPES.PORTFOLIO_MGT.GET_DOCS,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: portfolioPermId,
      Required,
    },
    HashTag: "",
  });

export const DOWNLOAD_DOCS = (
  portfolioPermId: any,
  DocumentPermId: any,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  downloadBlobPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}`, {
    APIName: RO_CONSTANTS.API_CATEGORY_TYPES.PORTFOLIO_MGT.DOWNLOAD_DOCS,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: portfolioPermId,
      DocumentPermId: DocumentPermId,
    },
    HashTag: "",
  });

export const GET_PORTFOLIO_DOC = (
  portfolioPermId: any,
  Required: boolean,
  AccessCode: AccessCode,
  partnerPermId: any,
  apiKey: any
) =>
  RolloverPost(`${RO_CONSTANTS.API_CATEGORY.EXTERNAL_MANAGEMENT}`, {
    APIName: RO_CONSTANTS.API_CATEGORY_TYPES.PORTFOLIO_MGT.GET_DOCS,
    AccessCode: AccessCode,
    PartnerPermId: Number(partnerPermId),
    AccessKey: String(apiKey),
    Encrypted: {
      PortfolioPermId: Number(portfolioPermId),
      Required,
    },
    HashTag: "",
  });
