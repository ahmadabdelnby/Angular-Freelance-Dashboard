// export const ModalRegistry: {
//   [collectionName: string]: () => Promise<any>
// } = {
//   skills: () => import('../core/modals/skillModal/create-skill/create-skill')
//     .then(m => m.CreateSkill),
//   specialties: () => import('../core/modals/specialityModal/create-speciality/create-speciality')
//     .then(m => m.CreateSpeciality),
//   categories: () => import('../core/modals/categoryModal/create-category/create-category')
//     .then(m => m.CreateCategory),
//   jobs: () => import('../core/modals/jobModal/view-job/view-job')
//     .then(m => m.ViewJob)
// };

export const ModalRegistry: {
  [collectionName: string]: () => Promise<any>
} = {
  skills: () => import('../core/modals2/skillModal/create-skill/create-skill')
    .then(m => m.CreateSkill),
  jobs: () => import('../core/modals2/jobModal/view-job/view-job')
    .then(m => m.ViewJob),
  users: () => import('../core/modals2/userModal/view-user/view-user')
    .then(m => m.ViewUser),
  proposals: () => import('../core/modals2/proposalModal/view-proposal/view-proposal')
    .then(m => m.ViewProposal),
  specialties: () => import('../core/modals2/specialityModal/create-speciality/create-speciality')
    .then(m => m.CreateSpeciality),
  categories: () => import('../core/modals2/categoryModal/create-category/create-category')
    .then(m => m.CreateCategory),
  countries: () => import('../core/modals2/countryModal/create-country/create-country')
    .then(m => m.CreateCountry),
  contracts: () => import('../core/modals2/contractModal/view-contract/view-contract')
    .then(m => m.ViewContract),
  portfolioitems: () => import('../core/modals2/portfolioModal/view-portfolio/view-portfolio')
    .then(m => m.ViewPortfolio),
};