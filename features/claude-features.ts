import config from '../config/claude-config.json';

export const isClaudeSonnetEnabled = (): boolean => {
  return config.claude3_5.enabled && config.claude3_5.availableToAllClients;
};

export const getClaudeVersion = (): string => {
  return config.claude3_5.modelVersion;
};
