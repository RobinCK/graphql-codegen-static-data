interface PluginConfig {
  url: string;
  fetch: {
    path: string;
    query: string;
  }[];
}
