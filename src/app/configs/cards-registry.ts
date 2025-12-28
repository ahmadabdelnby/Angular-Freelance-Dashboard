// export const componentRegistry: {
//   [collectionName: string]: () => Promise<any>
// } = {
// proposals: () => import('../core/cards/proposal-card/proposal-card')
//   .then(m => m.ProposalCard),
// specialties: () => import('../core/cards/speciality-card/speciality-card')
//   .then(m => m.SpecialityCard),
// categories: () => import('../core/cards/category-card/category-card')
//   .then(m => m.CategoryCard),
// jobs: () => import('../core/cards/job-card/job-card')
//   .then(m => m.JobCard),
// users: () => import('../core/cards/user-card/user-card')
//   .then(m => m.UserCard),
// portfolioitems: () => import('../core/cards/portfolio-card/portfolio-card')
//   .then(m => m.PortfolioCard),
// contracts: () => import('../core/cards/contract-card/contract-card')
//   .then(m => m.ContractCard),
// skills: () => import('../core/cards/skill-card/skill-card')
//   .then(m => m.SkillCard),
//};


export const componentRegistry: {
  [collectionName: string]: () => Promise<any>
} = {
  // proposals: () => import('../core/cards2/proposal-card/proposal-card')
  //   .then(m => m.ProposalCard),
  specialties: () => import('../core/cards2/speciality-card/speciality-card')
    .then(m => m.SpecialityCard),
  categories: () => import('../core/cards2/category-card/category-card')
    .then(m => m.CategoryCard),
  jobs: () => import('../core/cards2/job-card/job-card')
    .then(m => m.JobCard),
  users: () => import('../core/cards2/user-card/user-card')
    .then(m => m.UserCard),
  proposals: () => import('../core/cards2/proposal-card/proposal-card')
    .then(m => m.ProposalCard),
  portfolio: () => import('../core/cards2/portfolio-card/portfolio-card')
    .then(m => m.PortfolioCard),
  portfolioitems: () => import('../core/cards2/portfolio-card/portfolio-card')
    .then(m => m.PortfolioCard),
  contracts: () => import('../core/cards2/contract-card/contract-card')
    .then(m => m.ContractCard),
  contract: () => import('../core/cards2/contract-card/contract-card')
    .then(m => m.ContractCard),
  skills: () => import('../core/cards2/skill-card/skill-card')
    .then(m => m.SkillCard),
  countries: () => import('../core/cards2/country-card/country-card')
    .then(m => m.CountryCard),
  conversations: () => import('../core/cards2/conversationCard/conversation-card')
    .then(m => m.ConversationCard),
  payment: () => import('../core/cards2/payment-card/payment-card')
    .then(m => m.PaymentCard)
};
