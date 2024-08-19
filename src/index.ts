import { GraphQLSchema } from 'graphql';
import { PluginFunction, Types } from '@graphql-codegen/plugin-helpers';
import get from 'lodash.get';

export const plugin: PluginFunction<PluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: PluginConfig
): Promise<Types.PluginOutput> => {
  const { url, fetch: dataFetch } = config;

  if (!url || !dataFetch) {
    throw new Error('Plugin configuration is missing "url", "fetch"');
  }

  const results = await Promise.all(
    dataFetch.map(async ({query, path}, index: number) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const queryNameMatch = query.match(/query\s+(\w+)/);
      const queryName = queryNameMatch ? queryNameMatch[1] : `Query${index}`;
      const result = await response.json();

      return [queryName, get(result, path) || null];
    })
  );

  const classContent = results.map(([queryName, result]) => {
    return `export const ${queryName} = ${JSON.stringify(result, null, 2)};`;
  }).join('\n');

  return {
    content: classContent
  };
};

export default { plugin };
