import axios from "axios";
import { useQuery } from "react-query";
import { client } from "../util/client";
import { get_pi_and_circumference_url } from "../util/Constants";

interface PiAndCicumferenceDTO {
  pi_value: string;
  circumference: string;
}

export const getPiAndCircumference = () =>
  useQuery<PiAndCicumferenceDTO, Error>(
    "getPiAndCircumference",
    async (): Promise<PiAndCicumferenceDTO> => {
      const { data } = await client.get<PiAndCicumferenceDTO>(
        get_pi_and_circumference_url
      );

      return data;
    }
  );
