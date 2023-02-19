import {
  BadGatewayException,
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from "@nestjs/common";
import BigNumber from "bignumber.js";
import { Cache } from "cache-manager";

export interface PiValueWithSunCircumference {
  pi_value: string;
  circumference: string;
}

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getData(): Promise<PiValueWithSunCircumference> {
    return {
      pi_value: await this.getPiValue(),
      circumference: await this.getSunCircumference(),
    };
  }

  async calculatePi(): Promise<string> {
    const pi_value = (await this.getPiValue()) as string;
    const count_to = pi_value.length - 1;

    let i = BigInt(1);
    let x = BigInt(3) * this.bigIntPow(BigInt(10), count_to + 20);
    let pi = x;
    while (x > 0n) {
      x = (x * i) / ((i + 1n) * 4n);
      pi += x / (i + 2n);
      i += 2n;
    }

    const result = (BigInt(pi) / this.bigIntPow(BigInt(10), 20)).toString();
    await this.setPiValue(result);
    return this.getPiValue();
  }

  bigIntPow(base: bigint, exponent: number): bigint {
    let result = BigInt(1);
    for (let i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  }

  async getPiValue(): Promise<string> {
    const cached_value = (await this.cacheManager.get("pi_value")) as string;

    if (!cached_value) {
      // await this.calculatePi();
      console.log(cached_value);
      return "3";
    }

    const pi_string = cached_value.charAt(0) + "." + cached_value.slice(1);
    return pi_string;
  }

  async setPiValue(target: string) {
    await this.cacheManager.set("pi_value", target);
    await this.recalculateSunCircumference();
  }

  async recalculateSunCircumference() {
    const pi_value = await this.getPiValue();
    const sun_radius = "696340.0";
    // const sun_circumference = 2 * sun_radius * parseFloat(pi_value);
    const sun_circumference = await this.longMultiply(
      await this.longMultiply("2.0", sun_radius),
      pi_value
    );

    await this.cacheManager.set("sun_circumference", sun_circumference);

    return sun_circumference;
  }

  async getSunCircumference() {
    const sun_circumference = (await this.cacheManager.get(
      "sun_circumference"
    )) as string;

    if (!sun_circumference) {
      return await this.recalculateSunCircumference();
    }

    return sun_circumference;
  }

  longMultiply(num1: string, num2: string): string {
    const bigNum1 = new BigNumber(num1);
    const bigNum2 = new BigNumber(num2);
    const product = bigNum1.times(bigNum2);
    return product.toString();
  }
}
