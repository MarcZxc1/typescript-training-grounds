interface AppConfig {
  apiKey: string;
  port: number;
  DB: string;
  environment: "development" | "production" | "staging";
}

let currentConfig: AppConfig = {
  apiKey: "DEFAULT KEY",
  port: 3000,
  DB: "localhost5432",
  environment: "development",
};

// console.log(currentConfig);

function updateConfig(newFields: Partial<AppConfig>): AppConfig {
  console.log("Updating configuration path: ", newFields);
  currentConfig = {
    ...currentConfig,
    ...newFields,
  };
  return currentConfig;
}

updateConfig({ port: 5000 });
updateConfig({ apiKey: "hellnah" });
updateConfig({ DB: "localhost8080", environment: "production" });
