const { mkdir, mkfile, getChildren, isFile, getName, getMeta } = require('@hexlet/immutable-fs-trees');
const _ = require('lodash');

const tree = mkdir('/', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ]),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ]),
]);

const changeOwner = (tree, owner) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));
  newMeta.owner = owner;

  if (isFile(tree)) {
    // Возвращаем обновленный файл
    return mkfile(name, newMeta);
  }

  const children = getChildren(tree);
  // Ключевая строчка
  // Вызываем рекурсивное обновление каждого ребенка
  const newChildren = children.map((child) => changeOwner(child, owner));
  // Возвращаем обновленную директорию
  const newTree = mkdir(name, newChildren, newMeta);
  return newTree;
};

const tree2 = changeOwner(tree, 'nobody');

console.log(JSON.stringify(tree2, null, ' '));