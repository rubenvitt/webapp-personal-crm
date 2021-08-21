import { QueryFunctionContext } from "react-query";
import { apiAxios } from "../axios";

export function fetchConsent(
  context: QueryFunctionContext<[string, "string" | "agb"]>
): Promise<string> {
  const type = context.queryKey[1];
  return apiAxios
    .get<{ text: string }>("/onboarding/consent?type=" + type)
    .then((value) => value.data.text);
}
