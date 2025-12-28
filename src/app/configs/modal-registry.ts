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
  jobs: () => import('../core/modals2/jobModal/create-job/create-job')
    .then(m => m.CreateJob),
  users: () => import('../core/modals2/userModal/create-user/create-user')
    .then(m => m.CreateUser),
  proposals: () => import('../core/modals2/proposalModal/create-proposal/create-proposal')
    .then(m => m.CreateProposal),
  specialties: () => import('../core/modals2/specialityModal/create-speciality/create-speciality')
    .then(m => m.CreateSpeciality),
  categories: () => import('../core/modals2/categoryModal/create-category/create-category')
    .then(m => m.CreateCategory),
  countries: () => import('../core/modals2/countryModal/create-country/create-country')
    .then(m => m.CreateCountry),
  contracts: () => import('../core/modals2/contractModal/create-contract/create-contract')
    .then(m => m.CreateContract),
  contract: () => import('../core/modals2/contractModal/create-contract/create-contract')
    .then(m => m.CreateContract),
  portfolio: () => import('../core/modals2/portfolioModal/view-portfolio/view-portfolio')
    .then(m => m.ViewPortfolio),
  portfolioitems: () => import('../core/modals2/portfolioModal/view-portfolio/view-portfolio')
    .then(m => m.ViewPortfolio),
};
// View Modal Registry for displaying data (read-only modals)
export const ViewModalRegistry: {
  [collectionName: string]: () => Promise<any>
} = {
  users: () => import('../core/modals2/userModal/view-user/view-user')
    .then(m => m.ViewUser),
  contracts: () => import('../core/modals2/contractModal/view-contract/view-contract')
    .then(m => m.ViewContract),
  contract: () => import('../core/modals2/contractModal/view-contract/view-contract')
    .then(m => m.ViewContract),
  jobs: () => import('../core/modals2/jobModal/view-job/view-job')
    .then(m => m.ViewJob),
  proposals: () => import('../core/modals2/proposalModal/view-proposal/view-proposal')
    .then(m => m.ViewProposal),
  portfolio: () => import('../core/modals2/portfolioModal/view-portfolio/view-portfolio')
    .then(m => m.ViewPortfolio),
  portfolioitems: () => import('../core/modals2/portfolioModal/view-portfolio/view-portfolio')
    .then(m => m.ViewPortfolio),
  conversations: () => import('../core/modals2/conversationModal/view-conversation/view-conversation')
    .then(m => m.ViewConversation),
  payment: () => import('../core/modals2/view-payment/view-payment')
    .then(m => m.ViewPayment),
};
