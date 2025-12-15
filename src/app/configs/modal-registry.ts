export const ModalRegistry: {
  [collectionName: string]: () => Promise<any>
} = {
  skills: () => import('../core/modals/skillModal/create-skill/create-skill')
    .then(m => m.CreateSkill),
  specialties: () => import('../core/modals/specialityModal/create-speciality/create-speciality')
    .then(m => m.CreateSpeciality),
  categories: () => import('../core/modals/categoryModal/create-category/create-category')
    .then(m => m.CreateCategory)
};