
# graphql-codegen-static-data

[![npm version](https://badge.fury.io/js/graphql-codegen-static-data.svg)](https://badge.fury.io/js/graphql-codegen-static-data)

A plugin for [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) that generates static data by executing GraphQL queries against your API and saving the results as static files. This is useful for projects that require pre-fetched data to improve performance or work in offline mode.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)

## Introduction

`graphql-codegen-static-data` allows you to generate static data by executing GraphQL queries against your API and saving the results to files. This is especially useful for static sites or applications that need pre-fetched data.

## Installation

Install the plugin using npm:

```bash
npm install --save-dev graphql-codegen-static-data
```

Or using Yarn:

```bash
yarn add --dev graphql-codegen-static-data
```

## Usage

Add the plugin to your GraphQL Codegen configuration and set it up to execute the required queries:

```yaml
generates:
  ./src/graphql/generatedStatic.ts:
    plugins:
      - 'graphql-codegen-static-data'
    config:
      url: 'http://localhost:3000/graphql'
      fetch:
        - path: 'data.posts'
          query: |
            query Posts {
              posts {
                id
                title
                content
              }
            }
```

## Configuration

The plugin supports the following configuration options:

- **url**: The URL of your GraphQL API where the queries will be sent.
- **fetch**: An array of objects containing settings for each query:
  - **path**: The JSON path to the data in the response you want to save. The `lodash.get` syntax is used to access this data.
  - **query**: The GraphQL query to be executed.

### Configuration Details

#### url

The URL of your GraphQL API. For example: `https://api.example.com/graphql`.

#### fetch

An array of objects, each containing:

- **path**: The path to the data in the response that you want to extract and save. This is a JSON path using `lodash.get` syntax. For example: `data.posts`.
- **query**: The GraphQL query as a string.

#### Example

```yaml
generates:
  ./src/graphql/generatedStatic.ts:
    plugins:
      - 'graphql-codegen-static-data'
    config:
      url: 'http://localhost:3000/graphql'
      fetch:
        - path: 'data.posts'
          query: |
            query GetPosts {
              posts {
                id
                title
                content
              }
            }
        - path: 'data.users'
          query: |
            query GetUsers {
              users {
                id
                username
              }
            }
```

In this example, the plugin will execute two queries against your GraphQL API:

1. **GetPosts**: The result of the query will be saved from the path `data.posts` in the response. These data will be available in the generated file at that path.
2. **GetUsers**: Similarly, data from `data.users` will be saved.

## Examples

### Generating Static Data for Posts

```yaml
generates:
  ./src/graphql/postsData.ts:
    plugins:
      - 'graphql-codegen-static-data'
    config:
      url: 'https://api.example.com/graphql'
      fetch:
        - path: 'data.posts'
          query: |
            query GetPosts {
              posts {
                id
                title
                content
                author {
                  id
                  name
                }
              }
            }
```

In this example, data from `data.posts` in the response will be extracted and saved in the generated file.

### Generating Static Data for Comments

```yaml
generates:
  ./src/graphql/commentsData.ts:
    plugins:
      - 'graphql-codegen-static-data'
    config:
      url: 'https://api.example.com/graphql'
      fetch:
        - path: 'data.comments'
          query: |
            query GetComments {
              comments {
                id
                text
                postId
              }
            }
```

Data from `data.comments` will be extracted and saved.

## Notes

- **lodash.get**: The plugin uses the `get` function from the `lodash` library to access the desired data in the response. This allows you to easily specify the path to the data in nested structures.

- **JSON Path**: The path syntax is the same as in `lodash.get`. For example, `data.posts[0].title` retrieves the title of the first post.

## Contributing

Contributions are welcome! Please read the [contribution guidelines](CONTRIBUTING.md) before getting started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
