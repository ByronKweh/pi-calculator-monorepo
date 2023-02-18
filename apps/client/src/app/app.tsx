import { applyDecorators } from "@nestjs/common";
import { useEffect } from "react";
import { getPiAndCircumference } from "../apiWebHooks/getPiAndCircumference";
import { incrementPiValue } from "../apiWebHooks/incrementPiValue";
import styles from "./app.module.scss";

import { ReactComponent as Logo } from "./logo.svg";
import star from "./star.svg";

export function App() {
  const { isLoading, isError, data, refetch } = getPiAndCircumference();

  // useEffect(() => {
  //   if (isLoading) {
  //     return <>Loading...</>;
  //   }

  //   if (isError) {
  //     return <>An Error has occured, please refresh</>;
  //   }
  // }, [])

  useEffect(() => {
    console.log(data, "data");
  }, [data]);

  const piButtonClicked = () => {
    incrementPiValue();
    refetch();
  };

  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to Naluri!</h1>
      </header>
      <main>
        <h2>
          {" "}
          Current Pi Value:{" "}
          <span className={styles.longText}>{data?.pi_value}</span>
        </h2>
        <h2>
          Circumference :{" "}
          <span className={styles.longText}>{data?.circumference}</span>
        </h2>
        <h2>
          {" "}
          <button onClick={piButtonClicked}>Increment pi value</button>
        </h2>
      </main>
    </div>
  );
}

export default App;
