export type Country = {
  name: string;
  code: string;
};

export type SearchType = {
  city: string;
  countryCode: Country["code"];
};

export type AlertType = {
  message: string;
  type: "success" | "error" | "none";
};
