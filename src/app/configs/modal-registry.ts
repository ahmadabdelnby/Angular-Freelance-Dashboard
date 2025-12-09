export const ModalRegistry: {
  [collectionName: string]: () => Promise<any>
} = {
  skills: () => import('../core/modals/skillModal/create-skill/create-skill')
    .then(m => m.CreateSkill),
};