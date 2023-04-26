export type IpStackError = {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
};

export type IpStackSuccess = {
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
};

export type IpStackResponse = IpStackSuccess | IpStackError;

export function isIpStackSuccess(
  response: IpStackResponse,
): response is IpStackSuccess {
  return 'ip' in response;
}

export function isIpStackError(
  response: IpStackResponse,
): response is IpStackError {
  return 'success' in response && 'error' in response;
}
