module.exports = (plop) => {
  plop.setGenerator('create-component', {
    description: '创建组件及文档模版',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '创建的组件名',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}/index.tsx',
        templateFile: 'plop-template/component.hbs',
      },
      {
        type: 'add',
        path: 'src/{{name}}/index.scss',
        templateFile: 'plop-template/scss.hbs',
      },
      {
        type: 'add',
        path: 'src/{{name}}/index.md',
        templateFile: 'plop-template/md.hbs',
      },
    ],
  });
};
