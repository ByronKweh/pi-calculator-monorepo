import axios from "axios";
import { useQuery } from "react-query";
import { client } from "../util/client";
import { increment_pi_digit_url } from "../util/Constants";

export const incrementPiValue = () => {
  client.post<void>(increment_pi_digit_url);
};
