module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'Path',
        filter: value => value.replace(/\/$/, ''),
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{name}}/{{name}}.tsx',
        templateFile: 'plop/templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop/templates/Component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{name}}/{{name}}.stories.tsx',
        templateFile: 'plop/templates/Component/Component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{name}}/index.ts',
        templateFile: 'plop/templates/Component/index.ts.hbs',
      },
    ],
  })
  plop.setGenerator('entity', {
    description: 'Create an entity',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your entity name?',
      },
      {
        type: 'input',
        name: 'pluralName',
        message: 'What is your entity plural name? (Во множественном числе)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/entities/{{name}}/lib/constants.ts',
        templateFile: 'plop/templates/Entity/lib/constants.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/lib/index.ts',
        templateFile: 'plop/templates/Entity/lib/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/lib/types.ts',
        templateFile: 'plop/templates/Entity/lib/types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/create-{{name}}-query.ts',
        templateFile: 'plop/templates/Entity/model/create-entity-query.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/mutate-{{name}}-query.ts',
        templateFile: 'plop/templates/Entity/model/mutate-entity-query.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/get-{{name}}-by-id-query.ts',
        templateFile: 'plop/templates/Entity/model/get-entity-by-id-query.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/get-{{name}}-by-slug-query.ts',
        templateFile: 'plop/templates/Entity/model/get-entity-by-slug-query.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/{{name}}-collection-query.ts',
        templateFile: 'plop/templates/Entity/model/entity-collection-query.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/index.ts',
        templateFile: 'plop/templates/Entity/model/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/model/requests.ts',
        templateFile: 'plop/templates/Entity/model/requests.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}/index.ts',
        templateFile: 'plop/templates/Entity/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/app/mocks-server/routes/{{name}}.ts',
        templateFile: 'plop/templates/Entity/route.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/app/mocks-server/routes/index.ts',
        pattern: '',
        template: 'export * from "./{{name}}"',
      },
      'Вам необходимо добавить импорт и handler в src/app/mocks-server/handlers.ts',
    ],
  })
  plop.setGenerator('rxdb-collection', {
    description: 'Create a RxDB Collection',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message: 'Path',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your collection name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{name}}-collection.ts',
        templateFile: 'plop/templates/RxDBCollection.ts.hbs',
      },
    ],
  })
}
